# simpleDeal
# 运行项目
clone项目到本地，进入项目文件夹，安装依赖
```javascript
git clone xxx
cd zweb
npm install
```
然后运行项目
```javascript
npm run start
```
//启动成功后，将看到输出
// HTTP Server is running in http://127.0.0.1:8888
```

最后打开浏览器，输入`localhost:8888`即可访问。

# 路由
应用包括下面路由
* `/login` 登陆页面;
* `/`  首页;
* `/index` 全息检索（其下对应各个子路由）；
* `/exception` 管控中心;
* `/keyPeopleAnalysis` 重点对象;
* `/focusPeople` 关注对象;
* `/keyPeopleForm` 重点对象添加;
* `/focusPeopleForm` 关注对象添加;
* `*` 404页面。

```

需要注意的是，由于跨域问题，并不能直接通过ajax请求访问。不过dev server提供了代理的配置。
我们需要在`dev_server/config/defualt.js` 或 `dev_server/config/localConfig.js`中配置代理或者mock：
```javascript
proxy: {
  '/api/special': 'http://special.com/special',
  '/api': 'http://target.com/'
}
```
# 项目alias 和全局变量
为了开发时的方便，项目在webpack中配置了如下alias，以尽量避免跨父目录访问模块

## alias

```javascript
'utils': path.resolve(__dirname, './dev/utils'),
'service': path.resolve(__dirname, './dev/service'),
'store': path.resolve(__dirname, './dev/store'),
'enviroment': path.resolve(__dirname, './dev/enviroment'),
'assets': path.resolve(__dirname, './dev/assets'),
'inc': path.resolve(__dirname, './dev/inc'),
'views': path.resolve(__dirname, './dev/components/views'),
'common': path.resolve(__dirname, './dev/components/common'),
'ui': path.resolve(__dirname, './dev/components/ui')
```
## 全局变量

定义在：enviroment/global.js
