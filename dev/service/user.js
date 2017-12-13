// login sign 接口
import {AJAX, HttpMethod} from 'utils/ajax';
import { COMMON } from 'enviroment/config';

class User {


    login = (param) => {
        return AJAX({
            url: `${COMMON}/user/login.do`,
            type: HttpMethod.GET,
            data: param,
            loading: true
        });
    };

    loginOut = () => {
        return AJAX({
            url: `${COMMON}/user/logout.do`,
            type: HttpMethod.GET,
            loading: true
        });
    };

    sign = (param) => {
        return AJAX({
            url: `${COMMON}/user/register.do`,
            type: HttpMethod.GET,
            data: param,
            loading: true
        });
    };

    active = (param) => {
        return AJAX({
            url: `${COMMON}/user/active.do`,
            type: HttpMethod.GET,
            data: param,
            loading: true
        });
    };
}

export default new User();