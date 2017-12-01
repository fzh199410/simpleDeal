const config = require('./config');
const server = require('./server');
const mockFactory = require('./mock');
const express = require('express');

// server.use('/build', express.static(nodePath.join(__dirname, '../build')));

if(config.mock) {
    server.use(mockFactory(config.mock));
}
const proxies = require('./proxy');
if(proxies && proxies.length) {
    server.use(proxies);
}

server.listen(8888, function() {
    console.log('server started');
});
