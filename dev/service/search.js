import { AJAX, HttpMethod } from 'utils/ajax';
import {userLog} from './app';
import { Tip } from 'mtui/index';
import { userInfo } from './activeUser';

import { COMMON, NEO4J } from 'enviroment/config';

// 模糊搜索重点人、关注人
export function search(val) {
    return axios.get(COMMON + '/archives/get', {
        params: {
            para: val
        }
    });
}

export function getDetail(sfzh) {
    return axios.get(COMMON + '/archives/getDetail', {
        params: {
            sfzh
        }
    });
}

export function personStart(person) {
    userLog('全息检索', `检索人员：${person.xm}
身份证号：${person.sfzh}
列控级别：${person.lkjb || '无'}
`);
    return axios.get(NEO4J + '/centerStart', {
        params: {
            nodeType: '身份证',
            propertyType: 'index',
            propertyValue: person.sfzh,
            startTime: new Date(Date.now() - 30 * 24 * 3600 * 1000).format('yyyy-MM-dd 00:00:00'),
            endTime: new Date().format('yyyy-MM-dd 23:59:59'),
            szCode: userInfo.dCode
        },
        loading: true
    });
}

export function matchMultiSourceIDRe(params, mainPerson) {
    return axios.get(NEO4J + '/matchMultiSourceIDRe', {
        params: {
            ...params,
            szCode: userInfo.dCode
        },
        loading: true
    }).then(filterNodes(mainPerson));
}

export function mediumWork(params, mainPerson) {
    return axios.get(NEO4J + '/mediumWork', {
        params: {
            ...params,
            szCode: userInfo.dCode
        },
        loading: true
    }).then(filterNodes(mainPerson));
}

export function searchMultiRelationIn(params, mainPerson) {
    return axios.get(NEO4J + '/searchMultiRelationIn', {
        params: {
            ...params,
            szCode: userInfo.dCode
        },
        loading: true
    }).then(filterNodes(mainPerson));
}
export function mediumTour(params, mainPerson) {
    return axios.get(NEO4J + '/mediumTour', {
        params: {
            ...params,
            szCode: userInfo.dCode
        },
        loading: true
    }).then(filterNodes(mainPerson));
}
export function mediumHotel(params, mainPerson) {
    return axios.get(NEO4J + '/mediumHotel', {
        params: {
            ...params,
            szCode: userInfo.dCode
        },
        loading: true
    }).then(filterNodes(mainPerson));
}

export function mediumPhoneNum(params, mainPerson) {
    return axios.get(NEO4J + '/mediumPhoneNum', {
        params: {
            ...params,
            szCode: userInfo.dCode
        },
        loading: true
    }).then(filterNodes(mainPerson));
}

// nodeType  propertyType  propertyValueOne  propertyValueTwo  minAndMaxLins =1,2
export function searchPathsRe(person1, person2, params) {
    userLog('全息检索', `探寻人员1：${person1.xm}
    探寻人员2：${person2.xm}
    身份证号1：${person1.sfzh}
    身份证号2：${person2.sfzh}
    人员1列控级别: ${person1.lkjb || '无'}
    人员2列控级别: ${person2.lkjb || '无'}
    扩展维度: ${params.level}度
    `);
    return axios.get(NEO4J + '/searchPathsRe', {
        params: {
            nodeType: '身份证',
            propertyType: 'index',
            propertyValueOne: person1.sfzh,
            propertyValueTwo: person2.sfzh,
            minAndMaxLins: '1,' + params.level,
            startTime: params.startTime,
            endTime: params.endTime,
            szCode: userInfo.dCode
        },
        loading: true
    });
}

export function mediumTime(params) {
    return axios.get(NEO4J + '/mediumTime', {
        params: {
            ...params,
            szCode: userInfo.dCode
        },
        loading: true
    });
}
// 疑似号码查询
export function mediumVoice(sfzh) {
    return axios.get(NEO4J + '/mediumVoice', {
        params: {
            idCard: sfzh,
            szCode: userInfo.dCode
        }
    });
}

// 快递
export function mediumSend(sfzh, startTime, endTime) {
    return axios.get(NEO4J + '/mediumSend', {
        params: {
            idCard: sfzh,
            szCode: userInfo.dCode,
            startTime,
            endTime
        }
    });
}

function filterNodes(mainPerson) {
    return function({nodes, links}) {
        nodes = nodes.filter(n => n.index !== mainPerson.sfzh);
        return {
            nodes,
            links
        };
    };
}