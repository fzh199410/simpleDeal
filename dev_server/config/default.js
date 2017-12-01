const nodePath = require('path');

module.exports = {
    mock: {
        'urlPattern': '/api',
        'dataPath': nodePath.join(__dirname, '../data'),
        'skipNotFound': false
    },
    proxy: {
        // 在本文件的目录中添加localConfig.js 并覆盖本配置
        '/api/common': {
            target: 'http://192.168.31.173:20000',
            pathRewrite: {
                '^/api/common': ''
            }
        }
    }
};
