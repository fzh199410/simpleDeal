/**
 * Created by tommy on 2017/10/8.
 */
/**
 * Created by fuzhihong on 2017/7/13.
 */
import {AJAX, HttpMethod} from 'utils/ajax';
import { COMMON } from 'enviroment/config';

// bighome 很多统计的接口
function loadStatics(data) {
    return AJAX({
        url: `${COMMON}/bigs/bighome`,
        type: HttpMethod.GET,
        data: data,
        loading: true,
        cache: true
    });
}

// 预警总数
function loadWarningCount(data) {
    return AJAX({
        url: `${COMMON}/pcHomePage/statistic/countAllWarning`,
        type: HttpMethod.GET,
        data: data,
        cache: true,
        loading: true
    });
}

// 任务完成率
function loadTaskCompletion(data) {
    return AJAX({
        url: `${COMMON}/pcHomePage/statistic/taskCompletion`,
        type: HttpMethod.GET,
        data: data,
        cache: true,
        loading: true
    });
}

// 关注对象统计
function loadConcernCount(data) {
    return AJAX({
        url: `${COMMON}/pcHomePage/statistic/concernedCount`,
        type: HttpMethod.GET,
        data: data,
        cache: true,
        loading: true
    });
}

// 数据完善进度
function loadCompeleteData(data) {
    return AJAX({
        url: `${COMMON}/bigs/perfect`,
        type: HttpMethod.GET,
        data: data,
        cache: true,
        loading: true
    });
}

// 民警任务执行量排名
function loadTaskRange(data) {
    return AJAX({
        url: `${COMMON}/bigs/homerange`,
        type: HttpMethod.GET,
        data: data,
        cache: true,
        loading: true
    });
}

// 预警数下层
function loadWarningDetail(data) {
    return AJAX({
        url: `${COMMON}/pcHomePage/statistic/warning`,
        type: HttpMethod.GET,
        data: data,
        cache: true,
        loading: true
    });
}

export {
    loadStatics,
    loadWarningCount,
    loadTaskCompletion,
    loadConcernCount,
    loadCompeleteData,
    loadTaskRange,
    loadWarningDetail
};
