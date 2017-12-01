import qs from 'qs';
import axios from 'axios';
import { Tip } from 'mtui/index';
import LoadingModal from 'ui/loadingModal/LoadingModal';
import {browserHistory} from 'react-router';

import { isString, isArray, isBlank, isEmpty, isNotEmpty, isNotBlank } from './util';
import { setSession, getSession, clearLocal } from './storage';
const logger = Logger('ajax.js');
/**
 * 对axios 的全局interceptor设置
 * 增加了配置项
 * @param {boolean} noGlobalErrorTip 是否自动处理接口报错情况, 默认false，自动处理
 * @param {boolean} noSystemErrorTip 是否屏蔽系统自动显示，服务器、网络错误等消息提示.默认false，显示
 * @param {boolean} loading 是否显示全局loading效果, 默认false
 * @param {boolean} notCheckLogin 是否自动检测登陆了系统
 * @param {boolean} originalData 是否返回原本服务器数据，默认false 即默认都解包了数据
 */

(function(){
    let loadingCount = 0;
    let requestCount = 0;
    axios.interceptors.request.use(function (config) {
        requestCount += 1;
        if(config.loading) {
            loadingCount += 1;
            loadingCount === 1 && LoadingModal.show('loading');
        }
        return config;
    });

    axios.interceptors.response.use(function(response){
        requestReturned(response.config);
        return response;
    }, function(err){
        requestReturned(err.config);
        return Promise.reject(err);
    });

    function requestReturned(config) {
        if(!config) {
            return;
        }
        requestCount -= 1;
        if(config.loading) {
            loadingCount -= 1;
        }
        if(loadingCount === 0) {
            LoadingModal.hide();
        }
    }
})();

axios.interceptors.request.use(function (config) {
    config.headers.common['Accept'] = 'application/json';
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    return config;
});

axios.interceptors.response.use(function (response) {
    let data = response.data;
    let config = response.config;
    if (isString(data)) {
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.warn(e);
            return Promise.reject(response);
        }
    }
    if(data.code === 401 && !config.notCheckLogin) {
        const msg = '您未登陆系统或登陆已失效';
        Tip.error(msg);
        browserHistory.push('/login');
        return Promise.reject(response);
    }

    // 处理业务错误
    if(data.code !== 200) {
        config.noGlobalErrorTip || Tip.error(data.message || '业务逻辑处理异常');
        return Promise.reject(response);
    }
    
    if(config.originalData) {
        return data;
    }

    return data.data;
}, function(error) {
    // 不自动显示错误
    logger.error(error);
    if(!error) {
        logger.error('未知异常错误');
        return Promise.reject(error);
    }
    const response = error.response ? error.response : error;
    if(response.config.noSystemErrorTip) {
        return Promise.reject(error);
    }
    if(response.code === 'ECONNABORTED') {
        Tip.error('服务器超时');
    } else if(response.status >= 500) {
        let errorMsg = '';
        switch (response.status) {
            case 500: errorMsg = '服务器内部错误,错误码500';
                break;
            case 501: errorMsg = '服务器不理解或不支持,错误码501';
                break;
            case 502: errorMsg = '网关错误,错误码502';
                break;
            case 503: errorMsg = '服务不可用,错误码503';
                break;
            case 504: errorMsg = '请求超时,错误码504';
                break;
            default: errorMsg = '服务器内部错误';
        }
        Tip.error(errorMsg);
    } else if(response.status >= 400) {
        Tip.error('请求的地址无法访问（未登录、无权限或不存在）');
    }
    return Promise.reject(response);
});

export const HttpMethod = {
    GET: 'get',
    POST: 'post'
};

/**
 * @desc 使用axios第三方库访问后台服务器, 返回封装过后的Promise对象.
 * @param {string} url 请求的接口地址, 格式: "/xxx..."
 * @param {string} domain 跨域请求的域名地址, 如: www.baidu.com
 * @param {string} type HTTP请求方式, 默认GET.
 * @param {object} data 请求的数据, object对象格式
 * @param {function} onUpload 上传文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} onDownload 下载文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} cancel 取消请求的回调函数, 接收cancel参数, 当执行cancel()参数时请求被取消.
 * @param {number} timeout 配置请求超时时间, 为毫秒数, 默认从配置文件读取.
 * @param {boolean} cache 是否开启缓存, 开启后同样的请求(url相同, 参数相同), 第二次请求时会直接返回缓存数据, 不会请求后台数据, 默认false.
 * @return {object} - 返回一个promise的实例对象
 */
export function AJAX({ url = null,
    domain = null,
    type = HttpMethod.GET,
    dataToString = false,
    data = null,
    onUpload = null,
    onDownload = null,
    cancel = null,
    timeout = 120 * 1e3,
    cache = false,
    loading = false
}) {

    var getData;
    var postData;
    var cancelToken;
    var crossDomain = false;

    if (isEmpty(url)) {
        return Promise.resolve();
    }

    // data
    for(let key in data){
        if(isEmpty(data[key])){
            delete data[key];
        }
    }
    if (type === HttpMethod.POST) {
        postData = data;
        if (dataToString) {
            postData = qs.stringify(data, { allowDots: true });
        }
    } else {
        getData = data;
    }

    // 是否跨域
    if (isNotEmpty(domain)) {   // 跨域访问
        crossDomain = true;
    }
    // 取消请求的回调函数
    if (isNotEmpty(cancel)) {
        cancelToken = new axios.CancelToken(cancel);
    }

    // 是否缓存
    if (cache) {
        url += '?t=' + new Date().getTime();
    }

    return axios({
        method: type,
        baseURL: domain, // 跨域请求地址，域名 xxx.com
        url: url,
        timeout: timeout,
        params: getData,
        data: postData,
        withCredentials: crossDomain,
        onUploadProgress: onUpload,
        onDownloadProgress: onDownload,
        cancelToken: cancelToken,
        loading: loading,
        originalData: true // 直接获取服务器端返回来的原数据，不解包 code 那一层
    });
}
