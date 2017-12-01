
/**
 * actionPair 
 * {
 *  "WHAT": function(state, payload) {
 *  }
 * }
 * 
 */
export default function createReducer(defaultState, actionPair) {
    let actionList = Object.keys(actionPair);
    return {
        reducer,
        createAction
    };
    
    function reducer(state = defaultState, action) {
        let actionHandler = actionPair[action.type] || defaultHanlder;
        return Object.assign({}, actionHandler(state, action.result));

        // 这个只会在初始化时使用，或者别的redux框架直接调用才会用
        function defaultHanlder (state, payload) {
            return state;
        }
    }

    function createAction (action, result, dispatch) {
        if (!actionList.includes(action)) {
            throw new Error('调用的action 不存在，请在createReducer处确认');
        }
        action = {
            type: action,
            result
        };
        if(dispatch) {
            dispatch(action);
            return;
        }
        return action;
    }
}
