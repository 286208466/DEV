---
slug: /项目搭建/03
title: webpack5
---

### 安装

新建一个目录，进入目录初始化 package.json，并安装 webpack 依赖

```js
// 初始化包
npm init -y

// 安装依赖
npm i webpack webpack-cli -D
```

### 安装依赖

```js
//react
npm i react react-dom react-router-dom
npm i @types/react @types/react-dom @types/react-router-dom --dev

//vue
npm i vue -S
npm i vue-loader -D
npm i @vue/compiler-sfc -D


//babel
yarn add -D @babel/core @babel/preset-env babel-loader @babel/plugin-transform-runtime @babel/preset-react babel-plugin-import @babel/cli @babel/preset-typescript


//css
npm i css-loader -D
npm i style-loader -D

//
yarn add -D postcss-loader postcss postcss-normalize autoprefixer postcss-preset-env

npm i react-dev-utils resolve-url-loader -D
npm install --save-dev mini-css-extract-plugin
//
yarn add -D sass-loader sass

//html
npm i html-webpack-plugin -D

//在打包之前清空output配置的文件夹
npm i clean-webpack-plugin -D
npm i webpack-merge -D

//图片
npm i url-loader -D
//
npm i webpack-dev-server -D

//ts
npm install --save-dev typescript ts-loader

//
npm i less less-loader -D 
```

### 创建基础 webpack 配置

新建 config 文件来存放 webpack 的配置文件：

- webpack.config.base.js 存放 webpack 的基本配置
- webpack.config.dev.js 存放 webpack 的开发环境配置
- webpack.config.prod.js 存放 webpack 的生产环境配置

### webpack.config.base.js

```js
// webpack.config.base.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * @type {import('webpack').Configuration}
 */

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].js",
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.module\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "管理后台",
      template: path.resolve(__dirname, "../index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
  ],
  cache: {
    type: "filesystem",
    // 可选配置
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    name: "development-cache",
  },
};
```

### webpack.config.dev.js

```js
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const path = require("path");

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const devServer = {
  port: 3000,
  host: "localhost",
  contentBase: path.join(__dirname, "../publich"),
  watchContentBase: true,
  publicPath: "/",
  compress: true,
  historyApiFallback: true,
  hot: true,
  clientLogLevel: "error",
  // open: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};

const devConfig = {
  mode: "development",
  devServer: devServer,
};

module.exports = webpackMerge.merge(baseConfig, devConfig);
```

### webpack.config.prod.js

```js
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */

const prodConfig = {
  mode: "production",
};

module.exports = webpackMerge.merge(baseConfig, prodConfig);
```

### package.json 中添加启动命令
```js
"scripts": {
    "start": "webpack serve --config ./config/webpack.config.dev.js",
    "build": "webpack --mode=production --config ./config/webpack.config.prod.js"
},

```