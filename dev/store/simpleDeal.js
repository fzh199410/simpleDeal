import { getLocal, setLocal } from 'utils/storage';
import createReducer from 'utils/createReducer';
import {setSession, getSession} from 'utils/storage';
// 定义方法名称，取个名称，action 内使用一个字符串类型的 type 字段来表示将要执行的动作

const initialState = {
    // // 探寻时选择的人
    // user: {
    //     balance
    //         :
    //         24.18,
    //     email
    //         :
    //         "352282612@qq.com",
    //     gmtCreate
    //         :
    //         "2017-11-12 16:04:36",
    //     id
    //         :
    //         1,
    //     lastLogin
    //         :
    //         "2017-12-08 00:37:05",
    //     name
    //         :
    //         "wish",
    //     password
    //         :
    //         "E10ADC3949BA59ABBE56E057F20F883E",
    //     phone
    //         :
    //         "18782934759",
    //     recommendUserId
    //         :
    //         null,
    //     status
    //         :
    //         0
    // }
    user: null,
    trade: null
};

const store = createReducer(initialState, {
    'GET_SESSION_USER': function (state) {
        if(state.user) { return state; }
        let ss = getSession('user');
        if(ss) {
            state.user = ss;
        }
        return state;
    },
    'USER_LOGIN': function(state, user) {
        state.user = user;
        setSession('user', user);
        return state;
    },
    'USER_LOGINOUT': function (state) {
        state.user = null;
        setSession('user', null);
        return state;
    },
    'SET_TRADE_INFO': function (state, trade) {
        state.trade = trade;
        return state;
    }
});
// 默认暴露reducer
export default store.reducer;

export function getUserFromSession() {
    return store.createAction('GET_SESSION_USER');
}

// 登陆
export function login(user) {
    return store.createAction('USER_LOGIN', user);
}

// 登出
export function loginOut(user) {
    return store.createAction('USER_LOGINOUT');
}

export function setTradeInfo(trade) {
    return store.createAction('SET_TRADE_INFO', trade);
}