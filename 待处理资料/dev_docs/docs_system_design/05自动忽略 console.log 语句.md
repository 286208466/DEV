---
slug: /05
title: 自动忽略 console.log 语句
---


```js
export function rewriteLog() {
    console.log = (function (log) {
        return process.env.NODE_ENV == 'development'? log : function() {}
    }(console.log))
}
```
在 main.js 引入这个函数并执行一次，就可以实现忽略 console.log 语句的效果。
