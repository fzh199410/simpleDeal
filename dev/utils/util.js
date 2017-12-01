
// 内部函数, 用于判断对象类型
function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj) {
    return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj) {
    return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj) {
    return _getClass(obj).toLowerCase() === 'number' && !isNaN(obj);
}

export function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    // document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    document.cookie = name + '=' + encodeURI(value);
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(name + '=');
        if (c_start !== -1) {
            c_start = c_start + name.length + 1;
            var c_end = document.cookie.indexOf(';', c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}

export function clearCookie(){
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date( 0).toUTCString();
        }
    }
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj) {
    var empty = false;

    if (obj === null || obj === undefined) {    // null and undefined
        empty = true;
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
        empty = true;
    } else if (isObject(obj)) {
        var hasProp = false;
        for (let prop in obj) {
            if (prop) {
                hasProp = true;
                break;
            }
        }
        if (!hasProp) {
            empty = true;
        }
    }
    return empty;
}
/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj) {
    return !isEmpty(obj);
}

/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中有空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str) {
    if (isEmpty(str)) {
        return true;
    } else if (isString(str) && str.trim().length === 0) {
        return true;
    }
    return false;
}

/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj) {
    return !isBlank(obj);
}

/**
 * @desc 生成一个随机id
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * @desc 根据对象和传入的对象value属性的值, 查询value对应的name值
 * @param {object} obj 需遍历的对象
 * @param {string} value 需搜索的value属性的值
 * @demo USER = {
 *           A: {
 *               name: '普通会员',
 *               value: 0
 *           },
 *           B: {
 *               name: 'VIP会员',
 *               value: 1
 *           }
 *       }
 */
export function searchNameByVal(obj, value) {
    if (isEmpty(obj) || isEmpty(value)) {
        return '';
    }

    for (let prop in obj) {
        if (obj[prop].value === value) {
            return obj[prop].name;
        }
    }
}

export function signKeyWords(str, words = [], color = '#00AFE3'){
    if(words.length < 1) {return str;}

    var map = {}, reg, items;
    var regStr = `(${words.join('|')})`;

    words.forEach(function (e) {
        e !== '' && (map[e] = true);
    });
    reg = new RegExp(regStr, 'g');

    items = str.replace(reg, '#$1#').split(/#+/);

    var result = [];

    for(var i = 0; i < items.length; i++){
        if(items[i] === '') {continue;}
        if(map[items[i]]){
            result.push(`<strong style="color: ${color};">${items[i]}</strong>`);
        }else {
            result.push(`<span>${items[i]}</span>`);
        }
    }

    return result.join('');
}
/**
 * @desc 通过URL搜索对象获取url参数, 如www.xxx.com?a=1&b=2, getURLParam('a') return 1
 */
export function getURLParam(name){
    if(isBlank(name)){
        return;
    }
    // var urlQuery = getURLQuery();
    var urlQuery = getQueryParams();
    return urlQuery[name];
}
export function dateFormat(formatDate) {
    return formatDate.replace(/(.{4})(.{2})/, '$1-$2-');
}
/*
* 获取 url 参数，因为 this.props.location.query 不能得到带有 # 的参数，所以添加此方法
* */
export function getQueryParams() {
    let obj = {}, name, value;
    let str = location.href;
    let num = str.indexOf('?');
    str = str.substr(num + 1);
    const arr = str.split('&');
    for(let i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=');
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            obj[name] = value;
        }
    }
    return obj;
}
/**
 * 检查元素是否在数组中
 * @param arr
 * @param obj
 * @returns {boolean}
 */
export function contains(arr, obj) {
    let i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * 生成随机整数
 * @param min
 * @param max
 * @constructor
 */
export function random(min, max){
    min = min || -90;
    max = max || 90;
    return min + Math.floor(Math.random() * (max - min));
}

/**
 * 指定位置插入字符串
 * @param str
 * @param flg
 * @param sn
 * @returns {string}
 */
export function insert_flg(str, flg, sn){
    let newstr = '';
    for(let i =  0; i < str.length; i += sn){
        let tmp = str.substring(i, i + sn);
        newstr += tmp + flg;
    }
    return newstr;
}

export function crousel(boxId, needPagination, defaultPagination, paginationEvent, needOption, crossIn, hoverDelay, _callback) {
    // 填充数据
    var box = $(boxId);
    var oImgs = box.find('.sequence-item');
    var j = 0;
    var current = 0;
    var nextcurrent;
    var times = null;
    var total = oImgs.length;
    var hoverTimer = null;
    $(oImgs[0]).show();
    // 分页
    if (needPagination && oImgs.length > 1) {
        var optionBox = box.find('.pagination');
        if (defaultPagination) {

            var optionsStr = '';
            for (var i = 0; i < oImgs.length; i++) {
                optionsStr += '<li class="item"><em class="icon-home_lunbo1"></em><em class="icon-home_lunbo2"></em></li>';
            }
            optionBox.append(optionsStr);
        }
        var oAc = optionBox.find('li');
        $(oAc[0]).addClass('active');
        // 圆点点击事件
        $(oAc).each(function(index, obj) {
            if (paginationEvent === 'click') {
                $(obj).click(function() {
                    j = index;
                    fSwitch('next', j);
                });
            } else {
                $(obj).mouseenter(function() {
                    if(hoverDelay) {
                        if(hoverTimer) {
                            clearTimeout(hoverTimer);
                        }
                        
                        hoverTimer = setTimeout(function() {
                            j = index;
                            fSwitch('next', j);
                        }, 200);
                    } else {
                        j = index;
                        fSwitch('next', j);
                    }
                });
            }
        });
    }
    // 上一页下一页
    if (needOption) {
        var oPrev = box.find('.prev');
        var oNext = box.find('.next');
        if(oImgs.length <= 1) {
            oPrev.hide();
            oNext.hide();
        } else {
            oPrev.click(function() {
                j--;
                fSwitch('pre', j);
            });
            oNext.click(function() {
                j++;
                j = j > total - 1 ? 0 : j;
                fSwitch('next', j);
            });
        }
    }
    // 鼠标移入移除暂停动画
    if(oImgs.length > 1) {
        $(box).on('mouseenter', function(e) {
            if (times) {
                clearInterval(times);
            }
        }).on('mouseleave', function(e) {
            autoPlay();
        });
        autoPlay();
    }
    // 幻灯片播放
    function autoPlay() {
        times = setInterval(function() {
            j++;
            fSwitch('next', j);
        }, 4000);
    }
    // 淡入淡出切换效果
    function fSwitch(dir, num) {
        if (dir === 'pre') {
            num = num < 0 ? total - 1 : num;
        } else if (dir === 'next') {
            num = num > total - 1 ? 0 : num;
        }
        var easing = crossIn ? 'linear' : 'easeInQuart';

        $(oImgs[current]).stop(true, true);
        $(oImgs[num]).stop(true, true);
        $(oImgs[current]).fadeOut(300, easing, function() {
            if(!crossIn) {
                $(oImgs[num]).fadeIn({
                duration: 300,
                easing: easing
            });
            }
            if (needPagination) {
                if(!crossIn) {
                    $(oAc).removeClass('active').eq(num).addClass('active');
                }
            }
            current = num;
            j = num;
            if (_callback !== undefined) {
                _callback(oImgs, num);
            }
        });
        if(crossIn) {
            $(oImgs[num]).fadeIn({
                duration: 300,
                easing: 'linear'
            });
            if (needPagination) {
                $(oAc).removeClass('active').eq(num).addClass('active');
            }
        }
    }
}