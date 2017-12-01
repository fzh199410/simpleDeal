var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var baseConfig = require('./webpack.config.base');
var  CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    entry: {
        main: './dev/index.jsx',
        common: ['react', 'react-dom', 'react-router']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({ // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new CleanWebpackPlugin(['public/assets/build/*.*'])
    ]
});