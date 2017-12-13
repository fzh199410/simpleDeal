import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk'; // 中间键，diapatch异步实现

// reducers
// 图谱内使用的 keyVal 信息

import simpleDeal from './simpleDeal';

// 使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    simpleDeal,
    routing: routerReducer // 整合路由 
});

// 注册store
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
export default store;