'use strict';
import 'enviroment/global';
import './style.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { syncHistoryWithStore } from 'react-router-redux'; // 路由使用redux管理
import { browserHistory} from 'react-router'; //  路由

//  /路由
import Routers from './Routers';
// 获取合并后的 reducer
import store from './store/index';
// 保持历史同步
const history = syncHistoryWithStore(browserHistory, store);
// 路由
render(
    <Provider store={store}>
        <Routers history={history} />
    </Provider>,
    document.getElementById('App')
);