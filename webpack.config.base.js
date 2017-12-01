var  path = require('path');
var  webpack = require('webpack');
var  precss = require('precss');
var  autoprefixer = require('autoprefixer');
var  HtmlWebpackPlugin = require('html-webpack-plugin');
var  ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractMTUI = new ExtractTextPlugin('assets/build/mtui_[contentHash].css');
const extractStyle = new ExtractTextPlugin('assets/build/style_[contentHash].css');

module.exports =  {
    // 页面入口文件配置
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'public'),
        filename: 'assets/build/[name]_[chunkhash].js',
        chunkFilename: 'assets/build/[name]_[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        alias: {
            'utils': path.resolve(__dirname, './dev/utils'),
            'service': path.resolve(__dirname, './dev/service'),
            'store': path.resolve(__dirname, './dev/store'),
            'enviroment': path.resolve(__dirname, './dev/enviroment'),
            'assets': path.resolve(__dirname, './dev/assets'),
            'inc': path.resolve(__dirname, './dev/inc'),
            'views': path.resolve(__dirname, './dev/components/views'),
            'common': path.resolve(__dirname, './dev/components/common'),
            'ui': path.resolve(__dirname, './dev/components/UIComponents'),
            'const': path.resolve(__dirname, './dev/const')
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'dev'),
            use: ['babel-loader']
        }, { // 独立加载mtui的css
            test: /\.(css|scss)$/,
            include: path.join(__dirname, 'node_modules'),
            use: extractMTUI.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        }, { // 项目scss加载处理
            test: /\.(css|scss)$/,
            include: path.join(__dirname, 'dev'),
            use: extractStyle.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        }, { // 图片加载处理
            test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
            include: path.join(__dirname, 'dev/assets/images'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'assets/images/[name].[ext]'
                }
            }]
        }, { // 图片加载处理
            test: /\.(png|jpg|jpeg|gif|ico)$/,
            include: path.join(__dirname, 'dev/utils/map/images'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'assets/map/images/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        extractMTUI,
        extractStyle,
        new webpack.optimize.CommonsChunkPlugin('common'),
        new HtmlWebpackPlugin({
            template: './dev/index.html', // 当前目录下的index.html
            filename: 'index.html' // 生成到build目录的index.html
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true, // 压缩loader读取的文件
            options: {
                postcss: function() {
                    return [precss, autoprefixer];
                }
            }
        }),
        new webpack.HashedModuleIdsPlugin({
            hashDigestLength: 16
        })
    ]
};
