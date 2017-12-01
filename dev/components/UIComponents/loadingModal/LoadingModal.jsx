'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {LoadingBox} from 'mtui/index';

let LoadingModal = {};
let id = 'mt-div-loading';
let body = document.documentElement || document.body;

let modalCount = 0;

LoadingModal.show = function(info, type, bg){
    if(!document.getElementById(id)) {
        hideScroll();
        var div = document.createElement('div');
        div.setAttribute('class', 'mt-div');
        div.setAttribute('id', id);
        document.body.appendChild(div);
        ReactDOM.render(<LoadingBox bg={bg || true} type={type || 'loading3'} info={info || ''} />, div);
    }
    modalCount += 1;
};

LoadingModal.hide = function(reset = false) {
    if(reset) {
        modalCount = 0;
    } else {
        modalCount -= 1;
    }
    if(modalCount > 0) {
        return;
    }
    let self = document.getElementById(id);
    showScroll();
    if(self){
        if(MT_IE9){
            self.removeNode(true);
        }else{
            self.remove();
        }
    }
};

// 主页
export default LoadingModal;

function showScroll( mark ) {
    body.style.paddingRight = '';
    body.style.overflow = 'auto';
}

function hideScroll( mark ) {
     // 显示后，禁用滚动条
    if(MT_MS === 'IE'){
        body.style.paddingRight = '17px';
    }else{
        body.style.paddingRight = '5px';
    }
    body.style.overflow = 'hidden';
}