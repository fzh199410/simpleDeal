import React, {Component} from 'react';
import {Input, Image, Tip} from 'ui/index';
import './login.scss';
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const phoneReg = /^1[0-9]{10}$/;
import {connect} from 'react-redux';
const passwordLimit = [6, 12];
import User from 'service/user';
import {login} from 'store/simpleDeal';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVerify: true,
            imageTime: new Date().getTime(),
            account: '',
            password: '',
            verify: '',
            formError : {
                account: '',
                password: '',
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
        let {formError} = this.state;
        let value = e.target.value;
        switch (type) {
            case 'account' :
                 if(emailReg.test(value)) {
                     formError.account = '';
                 }
                 break;
            case 'password' :
                if(value.length >= passwordLimit[0] || value.length <= passwordLimit[1]) {
                    formError.password = '';
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
     * 登陆
     */
    login() {
        let {account, password, verify, formError} = this.state;
        this.setState({
            formError : {
                account: '',
                password: '',
                verify: ''
            }
        });
        let _this = this;
        //
        if(!emailReg.test(account)) {
            formError.account = '邮箱格式错误';
        }
        if(!account) {
            formError.account = '请输入用户名';
        }
        if(password.length < passwordLimit[0] || password.length > passwordLimit[1]) {
            formError.password = '密码长度为6-12';
        }
        if(!verify) {
            formError.verify = '请输入验证码';
        }
        if(formError.account || formError.password || formError.verify) {
            this.setState({
                formError
            });
            return false;
        }else {
            User.login({
               email: account,
               password
            }).then((data) => {
                if(data.code === 200) {
                    if(data.message === '邮箱或密码错误') {
                        formError.account = '邮箱或密码错误';
                    }else if(data.message === '用户未激活，请先验证邮箱') {
                        formError.account = '用户未激活，请先验证邮箱';
                        this.props.showModal(this.state.account);
                    }else if(data.message === '登录成功') {
                        Tip.success('登陆成功');
                        this.props.login(data.content);
                    }
                    _this.setState({
                       formError
                    });
                }
            });
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
            <div className="login-frame" style={this.props.style}>
                <div className="input-area">
                    <label>账号: </label>
                    <div className="input-box">
                        <Input onBlur={this.handleBlur.bind(this, 'account')} value={this.state.account} onChange={this.inputChange.bind(this, 'account')} placeholder="请输入邮箱"/>
                        {formError.account ? <p className="error">{formError.account}</p> : null}
                    </div>
                </div>
                <div className="input-area">
                    <label>密码: </label>
                    <div className="input-box">
                        <Input onBlur={this.handleBlur.bind(this, 'password')} value={this.state.password} onChange={this.inputChange.bind(this, 'password')} type="password" placeholder="请输入6-12位密码"/>
                        {formError.account ? <p className="error">{formError.password}</p> : null}
                    </div>
                </div>
                <div className="input-area">
                    <label>验证码: </label>
                    <div className="input-box">
                        <Input onBlur={this.handleBlur.bind(this, 'verify')} value={this.state.verify} onChange={this.inputChange.bind(this, 'verify')}/>
                        <span className="verify" onClick={this.refreshCode.bind(this)}>
                            {this.state.showVerify ? <Image src={'api/common/verifyCode/generate.do' + '?t=' + this.state.imageTime} /> : null}
                        </span>
                        {formError.verify ? <p className="error">{formError.verify}</p> : null}
                    </div>
                </div>
                <div className="input-area">
                    <label></label>
                    <div className="input-box">
                        <button className="btn" onClick={this.login.bind(this)}>登录</button>
                    </div>

                </div>
                <p className="forget-password">忘记密码?</p>
            </div>
        );
    }
}

export default connect(function(state) {
    return {}; // 不需要获取什么state里的数据
}, { login })(Login);
