import React, {Component} from 'react';
import './index.scss';
import Login from './login/Login';
import Sign from './sign/Sign';
import {Modal, Tip} from 'ui/index';
import EmailAddress from 'const/emailAddress';

export default class LoginAndSign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'login',
            showModal: 'none',
            emailAddress: ''
        };
    }

    switch(type) {
        this.setState({
            show: type
        });
    }
    backToLogin() {
        this.setState({
            show: 'login'
        });
    }
    showModal(email) {
        let domains = Object.keys(EmailAddress), url = '';
        let domain = domains.find((item) => {
            return email.includes(item);
        });
        if(domain) {
            url = EmailAddress[domain];
        }
        this.setState({
            showModal: 'block',
            emailAddress: url
        })
    }

    hideModal() {
        this.setState({
            showModal: 'none'
        });
    }

    goEmail() {
        let {emailAddress} = this.state;
        if(emailAddress) {
            window.open(emailAddress);
        }else {
            Tip.warning('未找到邮箱地址');
        }
    }

    render() {
        let {show, showModal} = this.state;
        return (
          <div className="login-sign-frame" style={this.props.style}>
              <ul>
                  <li className={this.state.show === 'login' ? 'active' : ''} onClick={this.switch.bind(this, 'login')}>
                      登录
                  </li>
                  <li className={this.state.show === 'sign' ? 'active' : ''} onClick={this.switch.bind(this, 'sign')}>
                      注册
                  </li>
              </ul>
              {
                  show === 'login'
                    ?
                      <Login showModal={this.showModal.bind(this)}/>
                    :
                      <Sign showModal={this.showModal.bind(this)} backToLogin={this.backToLogin.bind(this)}/>
              }
              {
                  <Modal modalShow={showModal} title="验证激活邮箱" sure={this.hideModal.bind(this)} cancel={this.hideModal.bind(this)}>
                      <div className="sign-frame">
                          <div className="input-area">
                              <p ><em style={{color: '#71b257', fontSize: '20px', verticalAlign: 'middle'}} className="iconfont icon-success"></em>验证邮件已发送</p>
                              <p >验证邮件已发送到您的邮箱,请点击邮箱中的链接完成激活!</p>
                              <div className="input-box">
                                  <button className="btn" style={{height: '50px', lineHeight: '50px'}} onClick={this.goEmail.bind(this)}>立即进入邮箱</button>
                              </div>
                          </div>
                      </div>
                  </Modal>
              }
          </div>
        );
    }
}