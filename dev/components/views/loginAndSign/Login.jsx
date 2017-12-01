import React, {Component} from 'react';
import {Input} from 'ui/index';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="login-frame" style={this.props.style}>
                <div className="input-area">
                    <label>账号: </label>
                    <Input placeholder="请输入邮箱或手机号"/>
                </div>
                <div className="input-area">
                    <label>密码: </label>
                    <Input placeholder="请输入6-12位密码"/>
                </div>
                <div className="input-area">
                    <label>验证码: </label>
                    <Input />
                    <span>4563</span>
                </div>
                <div className="input-area">
                    <label></label>
                    <button>登录</button>
                </div>
                <p>忘记密码?</p>
            </div>
        );
    }
}