import {AJAX, HttpMethod} from 'utils/ajax';
import { COMMON } from 'enviroment/config';

// 获取预警
// data: { warning_recent_time:, warning_inout_recent_time:, data: [] }
export function getWarningNotification(sfzh) {

    return axios.get(`${COMMON}/warning/popup`).then(data => ({data}));
}

// ?username=xx&warning_recent_time=xxx&warning_inout_recent_time=xxx
export function closeWarningNotification(params) {
    return AJAX({
        url: `${COMMON}/warning/confirmpopup`,
        type: HttpMethod.POST,
        data: params || null,
        loading: false
    });
}

export function changePasswd(oldPassword, newPassword) {
    return axios.get(`${COMMON}/auth/user/change?oldPassword=${oldPassword}&newPassword=${newPassword}`);
}

export function userLog(description, details) {
    return axios.post(COMMON + '/auth/sys_log/add', {
        description,
        details
    });
}
