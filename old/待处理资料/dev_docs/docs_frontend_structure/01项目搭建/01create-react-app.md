---
slug: /项目搭建/01
title: create-react-app
---

### 环境安装&项目创建
建议参照官网：[https://create-react-app.dev/docs/getting-started](https://create-react-app.dev/docs/getting-started)



### 暴露配置
```js
npm run eject
```

### 项目开发常用依赖
```
//ui
antd

//请求
axios

//样式
less less-loader
react-css-theme-switcher


//图表
d3
echarts

//国际化
react-intl

//redux
react-redux redux redux-logger redux-thunk

//其他
mockjs
http-proxy-middleware
nprogress
js-cookie
js-md5
lodash


//动画相关
react-countup
react-transition-group

//富文本
draft-js
```

### 配置less ，less-loader
1、安装
```js
yarn add less less-loader
//或者
npm install less less-loader -D
```
2、修改webpack.config.js
```js  title=webpack.config.js
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
//添加
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
```
在module的rules中添加
```js  title=webpack.config.js
//直接复制sass的配置稍作修改即可
{
    test: cssModuleRegex,
    use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    modules: {
        getLocalIdent: getCSSModuleLocalIdent,
    },
    }),
},

{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 2,
        sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    },
    "less-loader"
    ),
    sideEffects: true,
},
```


### 配置webpack别名alias
修改webpack.config.js
```js
alias: {
    ...
    "@": paths.appSrc,
    ...
}
```
**在ts中使用别名：**

1.新建paths.json
```js
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
2.在tsconfig.json最后面添加
```js
{
    ...
    "extends": "./paths.json"
}
```

### 配置代理
```js
npm install http-proxy-middleware --save
```
在 src 目录下创建 setupProxy.js 文件，代码如下：
```js
const { createProxyMiddleware } = require("http-proxy-middleware");
let test = "http://127.0.0.1:5001";
let dev = "http://127.0.0.1:5000";
module.exports = function (app) {
  app.use(
    "/backend",
    createProxyMiddleware("/backend", {
      target: test,
    })
  );
  app.use(
    "/api",
    createProxyMiddleware("/api", {
      target: dev,
    })
  );
};

```

### IE兼容问题解决
在 src/index.js 的最顶部引入
```js
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
```
在 packge.json 文件下 browserlist 添加 ie11
```js
"browserslist": {
    "production": [
        ">0.2%",
        "not dead",
        "not op_mini all",
        "ie 11"
    ],
    "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version",
        "ie 11"
    ]
},
```

### 生产环境去除 sourcemap  
修改webpack.config.js
```js title=webpack.config.js  
const shouldUseSourceMap = false
```