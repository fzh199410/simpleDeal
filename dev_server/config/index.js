const defaultConfig = require('./default');
let config = defaultConfig;
try {
    let localConfig = require('./localConfig');
    config = Object.assign({}, defaultConfig, localConfig);
}catch(e){}

module.exports = config;

console.log('开发服务器配置：');
console.log(config);
