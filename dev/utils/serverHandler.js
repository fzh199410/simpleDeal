import devConfig from '../resources/config.dev';

// 获取后台接口服务器地址, 主要用于返回接口数据
export function getPassportAPIServer() {
    if(__DEV__){
        return devConfig.server.api;
    }
    return prodConfig.server.api;
}