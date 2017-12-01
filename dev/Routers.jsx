'use strict';
import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'; // 路由


// App为入口
import App from './components/App';


import Main from 'common/main/Main';
// 首页
import Home from 'views/home/Home';
// 帮助中心
import HelpCenter from 'views/helpCenter/HelpCenter';
import NotFound from 'common/notFound/NotFound';
import SystemError from 'common/systemError/SystemError';
import UiPage from 'views/UiPage/Uipage';

class Routers extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path="" component={App}>
                    <Route path="/" component={Main}>
                        <Route path="main" component={Home} />
                        <Route path="helpCenter" component={HelpCenter}/>
                        <Route path="test" component={UiPage}/>
                        <Route path="systemError" component={SystemError}/>
                        <Route path="*" component={NotFound}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default Routers;

// function onEnter(nextState, replace) {
//     $('body').scrollTop(0);
//     if(!this.notNeedLogin && !isLogin() && !isOnLoginPage(nextState.location.pathname)) {
//         toLogin();
//         return;
//     }
//     if(!canAccess(this.white, this.black)) {
//         replace('/accessDenied');
//         return;
//     }
// }
//
// function onLeave() {
//     return;
// }
