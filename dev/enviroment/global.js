// 系统需要的shim垫片
import './shim.js';
// 系统对原型JS对象的扩充函数
import './extend.js';

// console打印工具
global.Logger = require('utils/logger').default;
require('utils/ajax');
global.axios = require('axios');