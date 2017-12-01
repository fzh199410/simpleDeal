import React, {Component} from 'react';
import './tip.scss';

let Tip = {};

function renderTip({type, msg, time, cb}) {
    let id = 'T-tip' + new Date().getTime();
    let tipType = 'T-tip-' + type + ' animated fadeInDown';

    let tipContainer = document.getElementById('T-div-tips');
    if(!tipContainer) {
        let box = document.createElement('div');
        box.setAttribute('id', 'T-div-tips');
        box.innerHTML = `<div class="${tipType}" id="${id}">
                    <div class="mt-tips-inline">
                        <i class="${'iconfont icon-' + type}"> ${msg}</i>
                    </div>
                </div>`;
       document.body.appendChild(box);
    }else {
        let tip = document.createElement('div');
        tip.setAttribute('class', tipType);
        tip.setAttribute('id', id);
        tip.innerHTML = `<div class="mt-tips-inline">
                <i class="${'iconfont icon-' + type}"> ${msg}</i>
            </div>`
        tipContainer.appendChild(tip);
    }

    setTimeout(function () {
        let self = document.getElementById(id);
        self.className.replace(' fadeInDown', '');
        self.className += ' fadeOutUp';
        self.style.height = 0;
        self.style.maiginTop = 0;
        setTimeout(function () {
            self.remove();
            if(cb) {
                cb(self);
            }
        }, 800)
    }, time || 2000)

}

Tip.warning = function (msg, time, cb) {
    renderTip({type: 'warning', msg: msg, time: time, cb: cb})
};

Tip.error = function (msg, time, cb) {
    renderTip({type: 'error', msg: msg, time: time, cb: cb})
};

Tip.success = function (msg, time, cb) {
    renderTip({type: 'success', msg: msg, time: time, cb: cb})
};

export default Tip;