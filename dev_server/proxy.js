var proxyMiddleware = require('http-proxy-middleware');
var config = require('./config');

var proxyTable = config.proxy;
const proxies = [];
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options,
            // changeOrigin: true
        };
    }
    proxies.push(proxyMiddleware(context, options))
});

module.exports = proxies;
