import './header.scss';
import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

export default class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="header">
                <div className="wrap clearfix">
                    <div className="logo"></div>
                    <div className="handle">
                        <Link to={{ pathname: '/main'}} activeClassName="active">首页</Link>
                        <Link to={{ pathname: '/tradePlatform'}} activeClassName="active">交易平台</Link>
                        <Link to={{ pathname: '/helpCenter'}} activeClassName="active">安全中心</Link>
                        <Link to={{ pathname: '/onlineService'}} activeClassName="active">在线客服</Link>
                        <Link to={{ pathname: '/myOrder'}} activeClassName="active">我的订单</Link>
                        <div className=" handleBtn registration">免费注册</div>
                        <div className="handleBtn login">登录</div>
                    </div>
                </div>
            </div>
        );
    }
}