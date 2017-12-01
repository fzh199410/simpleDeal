/**
 * Created by zuilafeng on 2017/7/21.
 */
import {AJAX, HttpMethod} from 'utils/ajax';
import { COMMON } from 'enviroment/config';
/**
 * @description 获取市的数据
 * @param level 第几层下的数据(省为1,市为2...)
 * @param name  地方名(如四川省)
 */
function getCity(level, name) {
    return AJAX({
        url: `${COMMON}/location`,
        type: HttpMethod.GET,
        data: {
            level: level,
            query: name
        }
    });
}

function getCounty(level, name) {
    return AJAX({
        url: `${COMMON}/location`,
        type: HttpMethod.GET,
        data: {
            level: level,
            query: name
        }
    });
}

function getTown(level, name) {
    return AJAX({
        url: `${COMMON}/location`,
        type: HttpMethod.GET,
        data: {
            level: level,
            query: name
        }
    });
}

function getVillage(level, name) {
    return AJAX({
        url: `${COMMON}/location`,
        type: HttpMethod.GET,
        data: {
            level: level,
            query: name
        }
    });
}

// 获取四川省下面的市级的数据
function getCityData(level, name, address, callback, needNoLimit) {
    console.log(`level: ${level},name: ${name}市级`);
    getCity(level, name).then((res) => {
        if(res.code === 200) {
            if(needNoLimit) {
                res.data.unshift({name: '不限', latitude: 0, longitude: 0, qx: 0, sf: 0, sz: 0, xz: 0});
            }
            callback({
                address: Object.assign(address, { citys: res.data })
            });
        }else {
            console.log('获取市级地址数据失败！');
        }
    });
}

// 获取县级的数据
function getCountyData(level, name, address, callback, needNoLimit) {
    console.log(`level: ${level},name: ${name}县级`);
    getCounty(level, name).then(res => {
        if(res.code === 200) {
            if(needNoLimit) {
                res.data.unshift({name: '不限', latitude: 0, longitude: 0, qx: 0, sf: 0, sz: 0, xz: 0});
            }
            callback({
                address: Object.assign(address, { counties: res.data })
            });
        }else {
            console.log('获取县级地址数据失败！');
        }
    });
}

// 获取镇级的数据
function getTownData(level, name, address, callback, needNoLimit) {
    console.log(`level: ${level},name: ${name}镇级`);
    getTown(level, name).then(res => {
        if(res.code === 200) {
            if(needNoLimit) {
                res.data.unshift({name: '不限', latitude: 0, longitude: 0, qx: 0, sf: 0, sz: 0, xz: 0});
            }
            callback({
                address: Object.assign(address, { towns: res.data })
            });
        }else {
            console.log('获取镇级地址数据失败！');
        }
    });
}

// 获取村级的数据
function getVillageData(level, name, address, callback, needNoLimit) {
    console.log(`level: ${level},name: ${name}村级`);
    getVillage(level, name).then(res => {
        if(res.code === 200) {
            if(needNoLimit) {
                res.data.unshift({name: '不限', latitude: 0, longitude: 0, qx: 0, sf: 0, sz: 0, xz: 0});
            }
            callback({
                address: Object.assign(address, { villages: res.data })
            });
        }else {
            console.log('获取村级地址数据失败！');
        }
    });
}

export { getCityData, getCountyData, getTownData, getVillageData };