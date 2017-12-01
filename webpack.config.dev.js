var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var baseConfig = require('./webpack.config.base');

const env = process.env;

module.exports = webpackMerge(baseConfig, {
    entry: {
        main: './dev/index_dev.jsx',
        common: ['react', 'react-dom', 'react-router']
    },
    devtool: 'cheap-source-map',
    plugins: [
        // 出错不终止插件
        new webpack.NoEmitOnErrorsPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ]
});