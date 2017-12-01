/**
 * 扩展js原型对象，增加一些功能函数
 * 列表：
 * Date.prototype.format
 * Promise.prototype.done
 * Promise.prototype.finally
 * String.prototype.padLeft
 * String.prototype.padRight
 */
Date.prototype.format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, this.getMonth() > 8 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth());

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
};

Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => {
                throw reason;
            }, 0);
        });
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback(value)).then(() => value),
        reason => P.resolve(callback(reason)).then(() => {
            throw reason;
        })
    );
};

function pad(side, num, ch) {
    var exp = `${side === 'left' ? '' : '^'}.{${num}}${side === 'right' ? '' : '$'}`,
        re = new RegExp(exp), pad = '';
    do {
        pad += ch;
    } while(pad.length < num);
  
    return re.exec( (side === 'left') ? (pad + this) : (this + pad) )[0];
}

if (!String.prototype.padRight) {
    String.prototype.padRight = function (num, ch) { return pad.call(this, 'right', num, ch); };
}

if (!String.prototype.padLeft) {
    String.prototype.padLeft = function (num, ch) { return pad.call(this, 'left', num, ch); };
}