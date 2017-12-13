import './footer.scss';
import React, { Component } from 'react';

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.suggestInput = null;
        this.state = {
        };
    }

    render() {
        return (
            <div className="footer">
                <div className="links">
                    <a href="javascript:void(null)">交易平台</a>
                    <a href="javascript:void(null)">关于我们</a>
                    <a href="javascript:void(null)">安全中心</a>
                    <a href="javascript:void(null)">在线客服</a>
                </div>
                <p>©2010-2017 www.suyin.com 极简(中国)交易平台</p>
                <img width={150} src={require('assets/images/交流群.png')} alt=""/>
            </div>
        );
    }
}

