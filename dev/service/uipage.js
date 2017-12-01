import {AJAX, HttpMethod} from 'utils/ajax';
import { COMMON } from 'enviroment/config';

// 查询接口
function autoComplete(param) {
    return AJAX({
        url: `${COMMON}/uipage/autoComplete`,
        type: HttpMethod.GET,
        data: param
    })
}

export {
    autoComplete
};