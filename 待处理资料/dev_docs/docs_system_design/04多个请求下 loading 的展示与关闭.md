---
slug: /04
title: 多个请求下 loading 的展示与关闭
---

一般情况下，在 vue 中结合 axios 的拦截器控制 loading 展示和关闭，是这样的：

在 App.vue 配置一个全局 loading。
```js
<div class="app">
    <keep-alive :include="keepAliveData">
        <router-view/>
    </keep-alive>
    <div class="loading" v-show="isShowLoading">
        <Spin size="large"></Spin>
    </div>
</div>
```
同时设置 axios 拦截器。
```js
// 添加请求拦截器
this.$axios.interceptors.request.use(config => {
    this.isShowLoading = true
    return config
}, error => {
    this.isShowLoading = false
    return Promise.reject(error)
})

// 添加响应拦截器
this.$axios.interceptors.response.use(response => {
    this.isShowLoading = false
    return response
}, error => {
    this.isShowLoading = false
    return Promise.reject(error)
})
```
这个拦截器的功能是在请求前打开 loading，请求结束或出错时关闭 loading。

如果每次只有一个请求，这样运行是没问题的。但同时有多个请求并发，就会有问题了。

举例：

假如现在同时发起两个请求，在请求前，拦截器 this.isShowLoading = true 将 loading 打开。

现在有一个请求结束了。this.isShowLoading = false 拦截器关闭 loading，但是另一个请求由于某些原因并没有结束。

造成的后果就是页面请求还没完成，loading 却关闭了，用户会以为页面加载完成了，结果页面不能正常运行，导致用户体验不好。

**解决方案**

增加一个 loadingCount 变量，用来计算请求的次数。
```js
loadingCount: 0
```
再增加两个方法，来对 loadingCount  进行增减操作。
```js
methods: {
    addLoading() {
        this.isShowLoading = true
        this.loadingCount++
    },

    isCloseLoading() {
        this.loadingCount--
        if (this.loadingCount == 0) {
            this.isShowLoading = false
        }
    }
}
```
现在拦截器变成这样：
```js
// 添加请求拦截器
this.$axios.interceptors.request.use(config => {
    this.addLoading()
    return config
}, error => {
    this.isShowLoading = false
    this.loadingCount = 0
    this.$Message.error('网络异常，请稍后再试')
    return Promise.reject(error)
})

// 添加响应拦截器
this.$axios.interceptors.response.use(response => {
    this.isCloseLoading()
    return response
}, error => {
    this.isShowLoading = false
    this.loadingCount = 0
    this.$Message.error('网络异常，请稍后再试')
    return Promise.reject(error)
})
```
这个拦截器的功能是：

每当发起一个请求，打开 loading，同时 loadingCount 加 1。

每当一个请求结束， loadingCount 减 1，并判断  loadingCount 是否为 0，如果为 0，则关闭 loading。

这样即可解决，多个请求下有某个请求提前结束，导致 loading 关闭的问题。


### 切换路由时，取消之前的请求
**axios切换路由取消指定请求与取消重复请求并存方案**

思路：

> 用一个变量存储目前处于pending状态的请求，用一个标识表明。拦截发送请求，判断这个api请求之前是否已经有还在pending的同类，即是否存在上述变量中，如果存在，则取消处理，不存在就正常发送，等请求完结后删除这个api请求在上述变量中的标识，这是一个完整的处理取消重复请求的流程。

> 而对于切换了路由（页面），要取消上个页面仍然pending的请求，就需要监听路由切换，每次切换都对上述变量存储的请求标识做判断，哪些是要取消的请求，就给取消掉即可。这里并没有对所有处于pending状态的请求做取消处理，原因是，系统中可能有些请求是不必要由于切换路由就要取消的，如全局的一些请求等。当然，这个也可以延伸一下，用于你实际项目需求，指定哪些所需要取消。

```js
// http.js

import axios from 'axios';

// 用于存储目前状态为pending的请求标识信息
let pendingRequest = [];

/**
 * 请求的拦截处理
 * @param config - 请求的配置项
 */
const handleRequestIntercept = config => {
    // 区别请求的唯一标识，这里用方法名+请求路径
    // 如果一个项目里有多个不同baseURL的请求
    // 可以改成`${config.method} ${config.baseURL}${config.url}`
    const requestMark = `${config.method} ${config.url}`;
    // 找当前请求的标识是否存在pendingRequest中，即是否重复请求了
    const markIndex = pendingRequest.findIndex(item => {
        return item.name === requestMark;
    });
    // 存在，即重复了
    if (markIndex > -1) {
        // 取消上个重复的请求
        pendingRequest[markIndex].cancel();
        // 删掉在pendingRequest中的请求标识
        pendingRequest.splice(markIndex, 1);
    }
    // （重新）新建针对这次请求的axios的cancelToken标识
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    config.cancelToken = source.token;
    // 设置自定义配置requestMark项，主要用于响应拦截中
    config.requestMark = requestMark;
    // 记录本次请求的标识
    pendingRequest.push({
        name: requestMark,
        cancel: source.cancel,
        routeChangeCancel: config.routeChangeCancel // 可能会有优先级高于默认设置的routeChangeCancel项值
    });
    
    return config;
};

/**
 * 响应的拦截处理
 * @param config - 请求的配置项
 */
const handleResponseIntercept = config => {
    // 根据请求拦截里设置的requestMark配置来寻找对应pendingRequest里对应的请求标识
    const markIndex = pendingRequest.findIndex(item => {
        return item.name === config.requestMark;
    });
    // 找到了就删除该标识
    markIndex > -1 && pendingRequest.splice(markIndex, 1);
}

/**
 * 创建axios实例
 * @param {String} url - 访问后台的主url
 */
const createAxiosInstance = (baseUrl) => {
    let instance = axios.create({
        baseURL: baseUrl
    });
    // 默认把请求视为切换路由就会把pending状态的请求取消，false为不取消
    instance.defaults.routeChangeCancel = true;
    
    // 请求拦截
    instance.interceptors.request.use(handleRequestIntercept, error => Promise.reject(error));
    
    // 响应拦截
    instance.interceptors.response.use(res => {
        handleResponseIntercept(res.config);
        // 其实更多情况下你执行获取res.data
        // 可以return res.data;
        return res;
    }, error => {
        let errorFormat = {};
        const response = error.response;
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        if (response) {
            handleResponseIntercept(response.config);
            // 设置返回的错误对象格式（按照自己项目实际需求）
            errorFormat = {
                status: response.status,
                data: response.data
            };
        }
        // 如果是主动取消了请求，做个标识
        if (axios.isCancel(error)) {
            errorFormat.selfCancel = true;
        }
        // 其实还有一个情况
        // 在设置引发错误的请求时，error.message才是错误信息
        // 但我觉得这个一般是脚本错误，我们项目提示也不应该提示脚本错误给用户看，一般都是我们自定义一些默认错误提示，如“创建成功！”
        // 所以这里不针对此情况做处理。
        
        return Promise.reject(errorFormat);
    });
    
    // 还有一些其他你想要的axios实例设置
    // ...
    
    return instance;
}

// 其他配置
// ...

export {
    pendingRequest
}

```


上面的代码里就能实现取消重复请求了，那么要实现切换路由后取消pending的指定请求，就需要在监听路由的变化了。

在路由设置文件里，这里以vue-router为例子

```js
// router.js

import { pendingRequest } from 'http.js';

// ...这是其他配置

router.beforeEach((to, from, next) => {
    // 把上个页面还没结束的请求取消掉
    pendingRequest.forEach(item => {
        item.routeChangeCancel && item.cancel();
    });
    // ... 其他处理
});
```

**实际项目应用时**

- 处理报错

上面我们定好了怎么做拦截，怎么处理路由切换，基本上已经处理好了。

还有一些小点，还记得我们对响应拦截做了判断是否是主动取消，然后设置了selfCancel标识。

这个有什么用呢？是用在我们在项目中发请求时，捕获错误信息时做处理的。如
```js
// 我创建了axios实例并绑在Vue的http上
Vue.http.get('/api/test').then(res => {
    // 成功请求的处理
}).catch(e => {
    // 这里就要判断是否是主动取消请求的
    e.selfCancel || this.$message.error('请求失败！');
})
```
这里的this.$message.error主要是用来提示错误信息给用户看的，而由于我们主动取消了请求，会走到catch流程中，但是这实际意义上并不算一个错误，不应该告诉用户出现错误了。

所以这个selfCancel标识就是用来告诉开发者这是我们主动取消请求导致的报错，不应该提示给用户看

- 区分是否页面请求

我们上面通过请求的config.routeChangeCancel来判断切换路由时是否取消正在pending的请求。

我们是统一在创建axios实例时，就设置默认routeChangeCancel为true，一般什么情况下是true呢？ 我们切换路由往往就是想把上个页面尚未完成的请求给取消掉，避免由于切换了路由请求完成了回调函数处理时如果有涉及上个页面的变化或方法或dom对象等，现在没有了会报脚本错等问题。当然这也是个性能优化的处理，提升用户交互体验，所以这个是有必要的。

有的人可能觉得，只要切换了路由就把目前所有尚未完成的请求取消不就好了吗？但是你的系统里或许有些公共请求，不受且不应受页面的切换而受到影响的请求，这类请求就不应该在切换路由的时候给取消掉了！常见的例子是位于系统头部的某些信息是需要发请求获取的，切换页面头部header也是不会变的对吧。

那么我们已经通过instance.defaults.routeChangeCancel = true设置了，那么接下来怎么设置才能知道哪些请求不需要切换路由就取消呢？
```js
Vue.http.get('/api/test', {
    routeChangeCancel: false
})
```
在实例发送请求的时候，这么设置就能覆盖了

其实如果不想以这种设置的形式去区分，其实也可以创建两种axios实例，一种表示切换路由就要取消的，另一种就是不需要取消的。但是我觉得，这种不需要取消的请求在一个项目中，一个系统中较少，其实通过这种配置的形式灵活性更好，处理起来也不会很多很麻烦。
