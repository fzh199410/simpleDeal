'use strict';
import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'; // 路由
import {connect} from 'react-redux';
import {getUserFromSession} from 'store/simpleDeal';
import {Tip} from 'ui/index';
import {getSession} from 'utils/storage';

// App为入口
import App from './components/App';


import Main from 'common/main/Main';
// 首页
import Home from 'views/home/Home';
// 帮助中心
import HelpCenter from 'views/helpCenter/HelpCenter';

import TradePlatformContainer from 'views/tradePlatform/TradePlatformContainer'
// 交易中心
import TradePlatform from 'views/tradePlatform/TradePlatform';
// 买家创建极速
import BuyerCreateFast from 'views/tradePlatform/buyerCreateFast/BuyerCreateFast';
// 买家创建安全
import BuyerCreateSafe from 'views/tradePlatform/buyerCreateSafe/BuyerCreateSafe';
// 卖家创建极速
import SellerCreateFast from 'views/tradePlatform/sellerCreateFast/SellerCreateFast';
//卖家创建安全
import SellerCreateSafe from 'views/tradePlatform/sellerCreateSafe/SellerCreateSafe';
// 查询 => 卖家页面
import ToSell from 'views/tradePlatform/searchByOrderId/ToSell';
// 查询 => 买家页面
import ToBuy from 'views/tradePlatform/searchByOrderId/ToBuy';
// 用户 container
import UserContainer from 'views/user/UserContainer';
// 用户中心
import UserCenter from 'views/user/userCenter/UserCenter';
// 用户激活
import ActiveUser from 'views/user/activeUser/ActiveUser';

import NotFound from 'common/notFound/NotFound';
import SystemError from 'common/systemError/SystemError';
import UiPage from 'views/UiPage/Uipage';

let user = null;
let refreshState = null;

class Routers extends Component {
    constructor(props) {
        super(props);
        user = getSession('user');
        refreshState = props.getUserFromSession;
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Route path="" component={App}>
                    <Route path="/" component={Main}>
                        <Route onEnter={onEnter} path="main" component={Home} />
                        <Route onEnter={onEnter} path="helpCenter" component={HelpCenter}/>
                        <Route onEnter={onEnter} path="tradePlatform" component={TradePlatformContainer}>
                            <IndexRoute onEnter={onEnter} component={TradePlatform} />
                            <Route onEnter={onEnter} path="buyerCreateFast" component={BuyerCreateFast}/>
                            <Route onEnter={onEnter} path="buyerCreateSafe" component={BuyerCreateSafe}/>
                            <Route onEnter={onEnter} path="sellerCreateFast" component={SellerCreateFast}/>
                            <Route onEnter={onEnter} path="sellerCreateSafe" component={SellerCreateSafe}/>
                            <Route onEnter={onEnter} path="tradeForBuyer" component={ToBuy}/>
                            <Route onEnter={onEnter} path="tradeForSeller" component={ToSell}/>
                        </Route>
                        <Route onEnter={onEnter} path="user" component={UserContainer}>
                            <IndexRoute onEnter={onEnter} component={UserCenter} />
                            <Route onEnter={onEnter} path="active" component={ActiveUser}/>
                        </Route>
                        <Route onEnter={onEnter} path="test" component={UiPage}/>
                        <Route onEnter={onEnter} path="systemError" component={SystemError}/>
                        <Route onEnter={onEnter} path="*" component={NotFound}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default connect(function(state) {
    return {
        user: state.simpleDeal.user
    };
}, {getUserFromSession})(Routers);


function onEnter(nextState, replace) {
    refreshState();
    user = getSession('user');
    $("html,body").animate({"scrollTop":0});
    if(!user && !canAccess(nextState.location.pathname)) {
        replace('/main');
        Tip.success('请登陆');
        return;
    }
}

function canAccess(nextPath) {
    if(nextPath === '/helpCenter' || nextPath === '/user/active'){
        return true;
    }
    return window.location.href.includes('main');
}

// function onLeave() {
//     return;
// }
