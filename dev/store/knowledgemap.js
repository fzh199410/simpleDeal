import { getLocal, setLocal } from 'utils/storage';
import createReducer from 'utils/createReducer';

// 定义方法名称，取个名称，action 内使用一个字符串类型的 type 字段来表示将要执行的动作

const initialState = {
    // 探寻时选择的人
    tanxunPerson: {
        person1: null,
        person2: null
    },
    // 历史图谱列表
    nets: [],

    presentNet: null,

    personProfile: null
};

const store = createReducer(initialState, {
    'SET_PERSON': function(state, person) {
        state.tanxunPerson = person;
        return state;
    },
    'SET_PROFILE': function(state, profile) {
        state.personProfile = profile;
        return state;
    },
    'SET_NET': function (state, net) {
        state.presentNet = net;
        if(!state.nets.includes(net)) {
            state.nets.push(net);
        }
        return state;
    }
});
// 默认暴露reducer
export default store.reducer;

// 这个就是 action Creator
export function setPerson(person) {
    return store.createAction('SET_PERSON', person);
}

export function setProfile(profile) {
    return store.createAction('SET_PROFILE', profile);
}

export function setNet(net) {
    return store.createAction('SET_NET', net);
}
