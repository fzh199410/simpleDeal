import React, {Component} from 'react';
import {Input, Image, Tip} from 'ui/index';
import './sign.scss';
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const phoneReg = /^1[0-9]{10}$/;
const passwordLimit = [6, 12];
import User from 'service/user';

export default class Sign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVerify: true,
            imageTime: new Date().getTime(),
            name: '',
            phone: '',
            email: '',
            password: '',
            passwordT: '',
            verify: '',
            emailVerify: '',
            formError : {
                phone: '',
                email: '',
                password: '',
                passwordT: '',
                verify: ''
            }
        };
    }

    /**
     * 输入框改变
     * @param type
     * @param e
     */
    inputChange(type, e) {
        this.setState({
            [type]: e.target.value.trim()
        });
    }

    /**
     * 处理blur
     * @param type
     * @param e
     */
    handleBlur(type, e) {
        let {formError, password} = this.state;
        let value = e.target.value;
        switch (type) {
            case 'name' :
                if(name) {
                    formError.name = '';
                }
                break;
            case 'phone' :
                if(phoneReg.test(value)) {
                    formError.phone = '';
                }
                break;
            case 'email' :
                if(emailReg.test(value)) {
                    formError.email = '';
                }
                break;
            case 'password' :
                if(value.length >= passwordLimit[0] || value.length <= passwordLimit[1]) {
                    formError.password = '';
                }
                break;
            case 'passwordT' :
                if(password === value) {
                    formError.passwordT = '';
                }
                break;
            case 'verify' :
                if(value) {
                    formError.verify = '';
                }
                break;
        }
        this.setState({
            formError
        });
    }

    /**
     * 注册
     */
    sign() {
        let {name, phone, email, password, passwordT, verify, formError} = this.state;
        let _this = this;

        if(!name) {
            formError.name = '请输入姓名';
        }
        if(!phoneReg.test(phone)) {
            formError.phone = '手机号格式错误';
        }
        if(!emailReg.test(email)) {
            formError.email = '邮箱格式错误';
        }
        if(password.length < passwordLimit[0] || password.length > passwordLimit[1]) {
            formError.password = '密码长度为6-12';
        }
        if(password !== passwordT) {
            formError.passwordT = '两次密码输入不同';
        }
        if(!verify) {
            formError.verify = '请输入验证码';
        }
        if(formError.name || formError.password || formError.verify || formError.phone || formError.email || formError.passwordT) {
            this.setState({
                formError
            });
            return false;
        }else {
            User.sign({
                name,
                phone,
                email,
                password,
                verifyCode: verify
            }).then((data) => {
                if(data.code === 200 && data.message === '注册成功'){
                    Tip.success('注册成功,请进入邮箱验证!');
                    // _this.props.backToLogin();
                    this.props.showModal(this.state.email);
                }else {
                    // todo
                    if(data.message === '验证码错误') {
                        formError.verify = '验证码错误';
                    }
                    if(data.message === '注册失败，该邮箱已注册') {
                        formError.email = '注册失败，该邮箱已注册';
                    }
                    this.setState({
                        formError
                    });
                }
            })
        }

    }

    /**
     * 刷新验证码
     * @param e
     */
    refreshCode(e) {
        e.stopPropagation();
        this.setState({
            showVerify: false
        }, () => {
            setTimeout(() => {
                this.setState({
                    imageTime: new Date().getTime(),
                    showVerify: true
                });
            }, 0);
        });

    }

    render() {
        let {formError} = this.state;
        return (
            <div className="sign-frame" style={this.props.style}>
                <div className="input-area">
                    <label>姓名: </label>
                    <div className="input-box">
                        <Input onBlur={this.handleBlur.bind(this, 'name')} value={this.state.name} onChange={this.inputChange.bind(this, 'name')} placeholder="请输入真实姓名"/>
                        {formError.name ? <p className="error">{formError.name}</p> : null}
                    </div>
                </div>
                <div className="input-area">
                    <label>手机: </label>
                    <div className="input-box">
                        <Input onBlur={this.handleBlur.bind(this, 'phone')} value={this.state.phone} onChange={this.inputChange.bind(this, 'phone')} placeholder="请输入手机"/>
                        {formError.phone ? <p className="error">{formError.phone}</p> : null}
                    </div>
                </div>
                <div className="input-area">
                    <label>邮箱: </label>
                    <div className="input-box">
                        <Input onBlur={this.handleBlur.bind(this, 'email')} value={this.state.email} onChange={this.inputChange.bind(this, 'email')} placeholder="请输入邮箱"/>
                        {formError.email ? <p className="error">{formError.email}</p> : null}
                    </div>
                </div>
                <div className="input-area">
                    <label>登录密码: </label>
                    <div className="input-box">
                        <Input type={'password'} onBlur={this.handleBlur.bind(this, 'password')} value={this.state.password} onChange={this.inputChange.bind(this, 'password')} placeholder="请输入登录密码"/>
                        {formError.password ? <p className="error">{formError.password}</p> : null}
                    </div>
                </div>
                <div className="input-area">
                    <label>确认密码: </label>
                    <div className="input-box">
                        <Input type={'password'}  onBlur={this.handleBlur.bind(this, 'passwordT')} value={this.state.passwordT} onChange={this.inputChange.bind(this, 'passwordT')} placeholder="请再次确认密码"/>
                        {formError.passwordT ? <p className="error">{formError.passwordT}</p> : null}
                    </div>
                </div>
                <div className="input-area">
                    <label>验证码: </label>
                    <div className="input-box">
                        <Input onBlur={this.handleBlur.bind(this, 'verify')} value={this.state.verify} onChange={this.inputChange.bind(this, 'verify')} />
                        <span className="verify" onClick={this.refreshCode.bind(this)}>
                            {this.state.showVerify ? <Image src={'api/common/verifyCode/generate.do' + '?t=' + this.state.imageTime} /> : null}
                        </span>
                        {formError.verify ? <p className="error">{formError.verify}</p> : null}
                    </div>
                </div>
                <div className="input-area">
                    <label></label>
                    <div className="input-box">
                        <button className="btn" onClick={this.sign.bind(this)}>立即注册</button>
                    </div>
                </div>
            </div>
        );
    }
}