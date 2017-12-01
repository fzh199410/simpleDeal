import {setSession, getSession, remove} from 'utils/storage';
import { COMMON, CERT } from 'enviroment/config';
import { browserHistory } from 'react-router';
import { Tip } from 'mtui/index';
import LoadingModal from 'ui/loadingModal/LoadingModal';

const logger = Logger('service/activeUser');
let redirectUrl = '';
const storageKey = 'userInfo';
const defaultUserInfo = {
    username: '',
    isLogin: false,
    permissions: '',
    certUser: null,
    dName: '',
    dCode: '',
    sid: '',
    // 是否需要使用数字证书登录(可浏览器参数配置)
    need_cert_sign: location.search.indexOf('notneedcert') < 0
};
const storageUserInfo = getSession(storageKey);
const userInfo = Object.assign({}, defaultUserInfo, storageUserInfo);

// 如果加载系统时就是登陆的状态，获取用户权限列表以及，需要自动使用USB-KEY 登陆
if(isLogin() && !isOnLoginPage()) {
    userInfo.need_cert_sign ? autoSignLogin().then(function() {
        startCheckUSBKEY();
        refreshPermissions();
    }) : refreshPermissions();
}
if(isOnLoginPage()) {
    clearUserInfo();
}

function refreshPermissions() {
    loadPermissions().then(permissions => {
        userInfo.permissions = permissions;
        setSession(storageKey, userInfo);
    });
}

// 用户登陆接口
function login(username, password) {
    return axios.post(`${COMMON}/auth/user/login`, {
        loginId: username,
        psd: password
    }, {
        notCheckLogin: true
    }).then(loginUser => {
        loginUser.sid = loginUser.sid.toUpperCase();
        if(userInfo.need_cert_sign && loginUser.sid !== userInfo.certUser.sfzh) {
            throw '数字证书身份与平台登录账户验证失败';
        }
        // 加载新的用户权限列表信息
        return loadPermissions().then((permissions) => {
            logger.log('获取权限列表成功');
            startCheckUSBKEY(); // 开始检测USB-KEY是否持续保持插入

            // 更新登录信息
            userInfo.isLogin = true;
            userInfo.username = loginUser.fullName;
            userInfo.dName = loginUser.dName;
            userInfo.dCode = loginUser.dCode;
            userInfo.sid = loginUser.sid;
            userInfo.permissions = permissions;
            // 登录后就清空一下回跳页面
            const redirect = redirectUrl;
            redirectUrl = '';
            setSession(storageKey, userInfo);
            return {
                redirect,
                data: loginUser
            };
        });
    }).catch(err => {
        logger.log(err);
        throw typeof err === 'string' ? err : err.response && response.data && response.data.message || err.message;
    });
}
// 到登录页面
function toLogin(redirect) {
    redirectUrl = redirect;
    browserHistory.push('/login');
}
// 退出系统
function logout() {
    clearUserInfo();
    toLogin();
}
// 清除本地登陆信息
function clearUserInfo() {
    remove(storageKey);
    Object.assign(userInfo, defaultUserInfo);
}

function isLogin() {
    return userInfo.isLogin;
}
// 是否正在登录页
function isOnLoginPage(pathname = location.pathname) {
    return pathname.indexOf('/login') !== -1;
}
// 获取用户权限列表
function getPermissions() {
    return userInfo.permissions;
}

// 加载用户权限列表
function loadPermissions(refresh) {
    return axios.get(`${COMMON}/auth/user/getMenus`).then(function(data) {
        return data.map(r => r.mCode).join(',');
    });
}

/**
 * 以下是数字签名的封装
 */
const ACTIVEX_PLUGIN = '<object id="JITDSignOcx" clsid="{707C7D52-85A8-4584-8954-573EFCE77488}" type="application/x-itst-activex" width="0" height="0" style="height: 0px; width: 0px;"></object>';
const BROSWER_PLUGIN = '<embed id="JITDSignOcx2" type="application/x-jit-sign-vctk-s-plugin-boc" width="0" height="0">';

if(!userInfo.need_cert_sign) {
    logger.warn('未使用数字证书登录系统');
}
const DSign_Subject = 'CN=SCCA, L=00, L=00, S=51, C=CN';
if(userInfo.need_cert_sign) {
    // 插入USB-KEY 插件的dom
    $(document.body).append(BROSWER_PLUGIN);
    $(document.body).append(ACTIVEX_PLUGIN);
}

// 对原文进行签名加密
function signText(original) {
    return activexPluginSign(original);
}

function activexPluginSign(authContent) {
    const JITDSignOcx = $('#JITDSignOcx')[0];
    if(authContent === ''){
        return Promise.reject('认证原文不能为空!');
    }
    // 执行本地EXE NPAPI 插件验证逻辑
    if(!JITDSignOcx.hasOwnProperty('SetCertChooseType')){
        return embedExeSign(authContent);
    }
    return doJitAction(JITDSignOcx, function() {
        // 控制证书为一个时，不弹出证书选择框
        JITDSignOcx.SetCertChooseType(1);
        JITDSignOcx.SetCert('SC', '', '', '', DSign_Subject, '');
    }).then(function() {
        return doJitAction(JITDSignOcx, function() {
            return JITDSignOcx.DetachSignStr('', authContent);
        });
    });
}

function embedExeSign(authContent) {
    const JITDSignOcx = $('#JITDSignOcx2')[0];
    var InitParam = '<?xml version="1.0" encoding="gb2312"?><authinfo><liblist><lib type="CSP" version="1.0" dllname="" ><algid val="SHA1" sm2_hashalg="sm3"/></lib><lib type="SKF" version="1.1" dllname="SERfR01DQUlTLmRsbA==" ><algid val="SHA1" sm2_hashalg="sm3"/></lib><lib type="SKF" version="1.1" dllname="U2h1dHRsZUNzcDExXzMwMDBHTS5kbGw=" ><algid val="SHA1" sm2_hashalg="sm3"/></lib><lib type="SKF" version="1.1" dllname="U0tGQVBJLmRsbA==" ><algid val="SHA1" sm2_hashalg="sm3"/></lib></liblist></authinfo>';

    if(!JITDSignOcx.hasOwnProperty('Initialize')){
        return Promise.reject('未检测到证书插件，请参考"操作手册"正确安装后重试！');
    }
    return doJitAction(JITDSignOcx, function() {
        JITDSignOcx.Initialize(InitParam);
    }).then(function() {
        return doJitAction(JITDSignOcx, function(){
            // 控制证书为一个时，不弹出证书选择框
            JITDSignOcx.SetCertChooseType(1);
            JITDSignOcx.SetCert('SC', '', '', '', DSign_Subject, '');
        });
    }).then(function() {
        return doJitAction(JITDSignOcx, function(){
            // 获取认证签名信息
            return JITDSignOcx.DetachSignStr('', authContent);
        });
    });
}
// 证书登陆
function certLogin(original, signed, token) {
    return vertifySign(original, signed, token).then(data => {
        data.sfzh = data.sfzh.toUpperCase();
        setSession('certUser', data);
        userInfo.certUser = data;
        return data;
    });
}
// 校验签名密文
function vertifySign(original, signed, token) {
    const url = CERT + '/vertify';
    return axios.post(url, {
        original,
        signed,
        _csrf: token
    }, {
        originalData: true
    }).then(data => {
        if(data.code === 200) {
            return data.data;
        }
        return Promise.reject(data.message || '证书校验失败');
    });
}
// 获取数字证书认证原文
function getOriginalText() {
    const url = CERT + '/original';
    return axios.get(url, {
        loading: true,
        originalData: true
    }).then(({data, token, code, message}) => {
        if(code === 200) {
            return {
                original: data,
                token
            };
        }
        return Promise.reject(message || '');
    });
}

function doJitAction(jitObj, action) {
    let data = action();
    const message = getError(jitObj);
    if(message) {
        return Promise.reject(message);
    }
    return Promise.resolve(data);
}

function getError (jitObj) {
    if(jitObj.GetErrorCode() !== 0){
        let code = jitObj.GetErrorCode();
        let message = jitObj.GetErrorMessage(jitObj.GetErrorCode());
        let tipMessage = '错误码：' + code + '　错误信息：' + message;
        try {
            jitObj.Finalize && jitObj.Finalize();
        }catch(e) {
            logger.error(e);
        }
        return tipMessage;
    }
    return '';
}

/**
 * 数字证书全程检测
 */
let delay = 600e3; // 检测间隔时间
let TEST_TEXT = 'testusbkeyplugined';
let CHECK_FLAG = false;
/**
 * 开始检测USB-KEY持续插入
 */
function startCheckUSBKEY() {
    if(!userInfo.need_cert_sign) {
        return;
    }
    CHECK_FLAG = true;
    check();
    function check() {
        setTimeout(function() {
            CHECK_FLAG && checkUSBKEY().then(check).catch(function(msg) {
                Tip.error(msg);
                toLogin(); // 直接去登陆
            });
        }, delay);
    }
}
function stopCheckUSBKEY() {
    CHECK_FLAG = false;
}

function checkUSBKEY() {
    logger.log('检测USB-KEY插入情况');
    return signText(TEST_TEXT).catch(err => {
        logger.log(err);
        throw '您拔出了USB-KEY 或 USB-KEY出现异常，请重新登陆';
    });
}

let certPluginReadyState = false;

function certPluginReady() {
    if(certPluginReadyState) {
        return Promise.resolve();
    }
    return new Promise(function(resolve, reject) {
        const delay = 1000;
        let checkCount = 1;
        check();

        function check() {
            const JITDSignOcx = $('#JITDSignOcx')[0];
            const JITDSignOcx2 = $('#JITDSignOcx2')[0];
            if((JITDSignOcx && JITDSignOcx.hasOwnProperty('SetCertChooseType')) || (JITDSignOcx2 && JITDSignOcx2.hasOwnProperty('Initialize'))) {
                certPluginReadyState = true;
                resolve();
                return;
            }
            checkCount += 1;
            // 检测十次都没有检测到证书插件则，检测失败
            if(checkCount > 10) {
                reject();
                return;
            }
            setTimeout(check, delay);
        }
    });
}

// 自动使用数字证书登陆
function autoSignLogin() {
    LoadingModal.show('自动登陆系统中...');
    return certPluginReady().then(function(){
        return getOriginalText().then(data => {
            return signText(data.original).then(signed => {
                if(!signed) {
                    toLogin();
                    console.error('未插入USB-KEY或其它原因导致签名数据为空');
                    return Promise.reject('message_handled');
                }
                return [data.original, signed, data.token];
            }).catch(function(err) {
                toLogin();
                console.error(err);
                return Promise.reject('message_handled');
            });
        }).then(function([original, signed, token]) {
            return vertifySign(original, signed, token);
        }).then(data => {
            let certUser = userInfo.certUser;
            if(certUser.name !== data.name || certUser.sfzh !== data.sfzh.toUpperCase()) {
                toLogin();
                console.error('当前USB-KEY与上次登陆的USB-KEY登陆用户不同，请重新登陆');
                return Promise.reject('message_handled');
            }
            LoadingModal.hide();
            return;
        });
    }, function() {
        console.error('证书插件加载失败，没有完成自动登陆');
        return Promise.reject('message_handled');
    }).catch(function(err) {
        if(err !== 'message_handled') {
            console.error(err);
            Tip.error('登陆加载完毕，但网络不稳定.');
        }
        LoadingModal.hide();
        return Promise.reject();
    });
}

export {certPluginReady, autoSignLogin, checkUSBKEY, stopCheckUSBKEY, startCheckUSBKEY, getOriginalText, vertifySign, certLogin, signText};
export {isOnLoginPage, getPermissions, loadPermissions, isLogin, login, toLogin, logout, userInfo};
