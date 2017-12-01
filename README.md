# Z计划
# 运行项目
clone项目到本地，进入项目文件夹，安装依赖
```javascript
git clone http://192.168.31.231:8888/zfront/zweb.git
cd zweb
npm install
```
然后运行项目
```javascript
npm run start
```
//启动成功后，将看到输出
// HTTP Server is running in http://127.0.0.1:8082
```

最后打开浏览器，输入`localhost:8082`即可访问。

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


# 项目结构
```javascript
.
├── build                       # build打包过后生成文件
│   ├── admin                     # 后台系统资源
│   ├── assets                    # 前台系统资源
│   └── attachments               # 一些供用户下载的文件，目前主要是数字证书相关的插件
├── dev                         # 源文件目录
│   ├── service                      # 依据Ajax封装的service
│   ├── assets                    # 静态项目文件
│   ├── inc                         # 项目通用非react组件模块存放
        ├──commonClass                # 业务class类
│   ├── components                  # react 组件
│       ├── Common                  # 公共组件
│       ├── UI                      # UI组件
│       ├── views                  # 公共组件
│           ├── ExceptionWarning        # 管控中心
│           ├── FocusPeople             # 关注对象
│           ├── FocusPeopleForm         # 关注对象新增表单
│           ├── home                    # 首页
│           ├── Index                   # 全息检索
│           ├── keyManAnalysis          # 重点对象
│           ├── KeyPeopleForm           # 重点对象-信息录入
│           ├── Login                   # 登陆
│           ├── Reduxdom                # ReduxDom
│       ├── App.jsx                 # 入口container
│       └── public.scss             # 公共样式
│   ├── environment               # 整个程序运行所需要的环境定义
|       ├── config.js                   # 程序的配置
│       ├── extend.js                   # 对js环境原生对象的扩展
│       ├── global.js                   # environment 定义的入口文件
│       └── shim.js                     # 程序运行需要的环境'垫片'
│   ├── store                     # redux 的store 每个文件既包含了 reducer 也包含了action
│   ├── utils                     # 公共工具方法
│   ├── index_dev.jsx             # 开发环境js入口
│   ├── index.jsx                 # 生产环境js入口
│   ├── index.html                # 浏览器加载时的入口html文件
│   ├── Router.jsx                # 路由配置文件
│   ├── style.scss                # 全局公共样式
|
├── dev_server                  # webpack 开发服务器
|   ├── config                      # dev server 的配置文件
|   ├── data                        # mock数据目录
|   ├── index.js                    # dev server 的入口和启动文件
|   ├── mock.js                     # 提供mock功能的中间件
|   ├── proxy.js                    # 提供代理后端接口的中间件
|   └── server.js                   # webpack dev server
├── .babelrc                    # babel配置文件
├── .eslint.json                # eslint开发环境配置
├── .eslint.prod.json           # eslint生产环境配置
├── .gitignore                  # git忽略上传文件配置
├── 接口文档.md                  # 接口文档说明
├── package.json                # npm配置文件
├── README.md                   # 项目使用说明
├── webpack.config.base.js      # 基础配置
├── webpack.config.dev.js       # webpack开发环境配置
└── webpack.config.prod.js      # webapck生产环境配置
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
