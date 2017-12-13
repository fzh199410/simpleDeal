import './header.scss';
import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import User from 'service/user';
import {loginOut} from 'store/simpleDeal';
import {getTop, getLeft} from 'utils/util';
import emitter from 'utils/emitter';

class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tipInfo: {
                show: false,
                left: 0,
                top: 0
            }
        };
        this.updateUser = this.updateUser.bind(this);
    }
    updateUser() {
        this.props.loginOut();
    }
    componentDidMount() {
        emitter.on('UPDATE_USER_INFO', this.updateUser);
    }
    componentWillUnmount() {
        emitter.removeListener('UPDATE_USER_INFO', this.updateUser);
    }
    loginOut() {
        User.loginOut().then(
            () => {
                browserHistory.push('/main');
                this.props.loginOut();
            }
        )
    }
    showTip(e) {
        let {tipInfo} = this.state;
        tipInfo.show = !tipInfo.show;
        tipInfo.left = getLeft(e.target) - 120;
        tipInfo.top = getTop(e.target) + 60;
        this.setState({
            tipInfo
        });
    }
    showLogin() {
        browserHistory.push('/main');
    }
    gotoUser() {
        browserHistory.push('/user');
    }
    render() {
        let {tipInfo} = this.state;
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
                        {
                            this.props.user ?
                                <div className=" handleBtn registration">赚推荐金</div> : <div className=" handleBtn registration">免费注册</div>
                        }
                        {
                            this.props.user
                                ?
                                <span className="user-name">您好: <em onClick={this.gotoUser.bind(this)}>{this.props.user.name}</em><em className={`iconfont icon-xiala-copy ${tipInfo.show ? 'reverse' : ''}`} onClick={this.showTip.bind(this)}> </em> <em onClick={this.loginOut.bind(this)}>安全注销</em></span>
                            :
                                <div className="handleBtn login" onClick={this.showLogin.bind(this)}>登录</div>
                        }
                        {
                            tipInfo.show
                                ?
                                <div className="tool-tip" style={{left: tipInfo.left, top: tipInfo.top}}>
                                    <p>余额: {this.props.user.balance}</p>
                                    <div><div className=" handleBtn registration" style={{marginRight: 0}}>充值</div> <div className=" handleBtn registration" style={{marginRight: 0}}>提现</div></div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    function (state) {
        return {user: state.simpleDeal.user};
    }, {loginOut}
)(Header)