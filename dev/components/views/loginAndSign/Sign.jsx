import React, {Component} from 'react';
import {Input} from 'ui/index';

export default class Sign extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="sign-frame" style={this.props.style}>
                <div className="input-area">
                    <label>姓名: </label>
                    <Input placeholder="请输入姓名"/>
                </div>
                <div className="input-area">
                    <label>手机: </label>
                    <Input placeholder="请输入手机"/>
                </div>
                <div className="input-area">
                    <label>邮箱: </label>
                    <Input placeholder="请输入邮箱"/>
                </div>
                <div className="input-area">
                    <label>登录密码: </label>
                    <Input placeholder="请输入登录密码"/>
                </div>
                <div className="input-area">
                    <label>确认密码: </label>
                    <Input placeholder="请再次确认密码"/>
                </div>
                <div className="input-area">
                    <label>验证码: </label>
                    <Input/>
                    <span>4563</span>
                </div>
                <div className="input-area">
                    <label></label>
                    <button>立即注册</button>
                </div>

            </div>
        );
    }
}