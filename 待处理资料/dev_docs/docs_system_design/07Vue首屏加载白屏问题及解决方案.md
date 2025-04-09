---
slug: /07
title: Vue首屏加载白屏问题及解决方案
---


1.预渲染

预渲染就是webpack打包时候渲染,通过无头浏览器

无头浏览器,打包的时候，可以把你index.html的内容放入你这个浏览器，但是你这个浏览器是空白的，然后当你进入页面时候直接加载这个index.html，但是没ajax请求

获取到预渲染的页面html内容,然后再放入index.html,再到CDN，直接请求html(相当于FMP提前到了FP),其实更像另外一种骨架屏，少了ajax请求
但是由于这样做我们只能添加死数据，而不能把ajax请求的数据渲染到首页上，怎么解决呢?

我们可以在app.vue中
```html
<div id="header"></div>
```

比如要在这个header标签里面加ajax请求

直接在script中请求给它添加数据即可
```js
document.querySelector('#header').html('...')
```

2.同构

何为同构渲染，就是一套代码多端使用

现在有一些框架，Next，Nuxt，类似于渲染就是vue ->json ->vue-server-renderer ->html

3.SSR

服务端渲染也可以解决首屏加载慢这个问题，因为服务端会把所有数据全部渲染完成再返回给客户端

ssr =>请求->node->解析 ->吐回给客户端(带请求数据)

但是有一个大问题，重要的是node层，高并发的解决

4.路由懒加载
可以通过plugin-syntax-dynamic-import 这个插件
```js
Vue.component('async-component',(resolve)=>{
  import('./AsyncComponent.js')
  .then((AsyncComponent)=>{
    resolve(AsyncComponent.default)
  })
})
```
但是现在好像直接可以通过箭头函数实现路由懒加载
```js
const app = () =>import('')
```

5.quicklink

quicklink就是在浏览器空闲的时候去指定需要加载的数据,这个是谷歌开源的，可以去看看

6.使用Gzip压缩，减少文件体积,加快首屏页面打开速度

前提是服务器那边得开启gzip

前端需要做的事
```js
npm i compression-webpack-plugin -D
```
vue.config.js
```js
const CompressionPlugin = require("compression-webpack-plugin")
​
module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /.js$|.html$|.css$|.jpg$|.jpeg$|.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false, // 是否删除原文件
            minRatio: 0.8
          })
        ]
      }
    }
  }
}
```

7.外链CSS,JS文件

很多时候我们在main.js中直接import一些ui库或者css文件啥的，以后可以在index.html，通过script外链引入，这样就不会通过我们的webpack打包

8.webpack entry

这个就是将单页改成多页应用,比如一些组件中，vue.js vue-router等插件已经在某个页面使用了，然后给它缓存起来，下次就无需加载

9.骨架屏

骨架屏就是在进入项目的FP阶段，给它来一个类似轮廓的东西，当我们的页面加载完成之后就消失，这个也很好做的，很多ui库都有这个东西，可以参考一下

10.loading

首页加一个loading或许是最原始的方法了，在index.html里加一个loadingcss效果，当页面加载完成消失

