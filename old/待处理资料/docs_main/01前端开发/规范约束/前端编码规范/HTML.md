## HTML

### 缩进

统一的缩进方式（4 个空格 | 2 个空格 | tab）

### HTML5 doctype

在页面开头使用这个简单地 doctype 来启用标准模式，使其在每个浏览器中尽可能一致的展现；

虽然 doctype 不区分大小写，但是按照惯例，doctype 大写

[（关于 html 属性，大写还是小写）](https://stackoverflow.com/questions/15594877/is-there-any-benefits-to-use-uppercase-or-lowercase-letters-with-html5-tagname)。

```html
<!DOCTYPE html>
<html>
  ...
</html>
```

### lang 属性

根据 HTML5 规范：

应在 html 标签上加上 lang 属性。这会给语音工具和翻译工具帮助，告诉它们应当怎么去发音和翻译。

更多关于 lang 属性的说明在[这里](http://www.w3.org/html/wg/drafts/html/master/semantics.html#the-html-element)；

```html
<!DOCTYPE html>
<html lang="en-us">
  ...
</html>
```

### 字符编码

通过声明一个明确的字符编码，让浏览器轻松、快速的确定适合网页内容的渲染方式，通常指定为'UTF-8'。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  ...
</html>
```

### IE 兼容模式

用 `<meta>` 标签可以指定页面应该用什么版本的 IE 来渲染；

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
  </head>
  ...
</html>
```

### 属性

- 在属性上，使用双引号，不要使用单引号；
- 属性名全小写，用中划线做分隔符；

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page title</title>
  </head>
  <body>
    <img src="images/company_logo.png" alt="Company" />

    <h1 class="hello-world">Hello, world!</h1>
  </body>
</html>
```

### 属性顺序

属性应该按照特定的顺序出现以保证易读性；

- class
- id
- name
- data-\*
- src, for, type, href, value , max-length, max, min, pattern
- placeholder, title, alt
- aria-\*, role
- required, readonly, disabled

class 是为高可复用组件设计的，所以应处在第一位；

id 更加具体且应该尽量少使用，所以将它放在第二位。

```html
<a class="..." id="..." data-modal="toggle" href="#">Example link</a>

<input class="form-control" type="text" />

<img src="..." alt="..." />
```

### boolean 属性

boolean 属性指不需要声明取值的属性，XHTML 需要每个属性声明取值，但是 HTML5 并不需要；

更多内容可以参考 [WhatWG section on boolean attributes](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#boolean-attributes)：

boolean 属性的存在表示取值为 true，不存在则表示取值为 false。

```html
<input type="text" disabled />

<input type="checkbox" value="1" checked />

<select>
  <option value="1" selected>1</option>
</select>
```

### 标签
- 标签不要大写
- 在自动闭合标签结尾处使用斜线`/`；
- 不要忽略可选的关闭标签，例：`</li>` 和 `</body>`。

使用语义化标签

:::tip
使用 html5 的语义化标签。针对旧版浏览器，引用 html5shiv.js 进行兼容调整。
:::

```html
<!-- bad -->
<div class="header"></div>
<div class="nav"></div>
<div class="section"></div>
<div class="article"></div>
<div class="footer"></div>

<!-- good -->
<header class="header"></header>
<nav class="nav"></nav>
<section class="content-section"></section>
<article class="article"></article>
<footer class="footer"></footer>
```

一个页面只能有一个 h1 标签，具体与 seo 有关。

```html
<!-- bad -->
<h1>我是标题一</h1>
<h1>我是标题二</h1>

<!-- good -->
<h1>我是标题一</h1>
<h2>我是标题二</h2>
...
<h6>我是标题六</h6>
```

标签嵌套规则

:::tip
html 标签包含块级元素、内联元素，元素的类型决定嵌套的规则。

常见块元素：div、section、ul、li、p、h1~h6 等。

常见内联元素：span、a、i、input、label、img 等。
:::

常见嵌套

```html
<!-- right：块级元素可以内嵌其他块级元素或者内联元素 -->
<div>
  <h1><span></span></h1>
</div>

<!-- right：内联元素可以内嵌其他内联元素 -->
<a href=""><span></span></a>
```

错误嵌套

```html
<!-- wrong：内联元素不能嵌套其他块级元素 -->
<span><div></div></span>

<!-- wrong：p元素不能内嵌块级元素，类似元素有h1、h2、h3、h4、h5、h6、p、dt -->
<p><div></div></p>
<h1><div></div></h1>
...
<h6><div></div></h6>

<!-- wrong：a标签不能内嵌a标签，这个错误会经常发生，值得重视 -->
<a href="a.html"><a href="a.html"></a></a>
```

对于网页中非常重要的链接采用 TITLE 说明，有助于帮助搜索引擎找到网页的重点 URL

```html
<a href="网址" title="链接说明">网页信息</a>。
```

### meta 标签

```html
<!-- 字体编码 -->
<meta charset="utf-8" />

<!-- 关键字 -->
<meta name="keywords" content="" />

<!-- 说明 -->
<meta name="description" content="" />

<!-- 作者 -->
<meta name="author" content="" />

<!-- 设置文档宽度、是否缩放 -->
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,user-scalable=no"
/>

<!-- 优先使用IE最新版本或chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<!-- 360读取到这个标签立即钱换到极速模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="renderer" content="webkit" />

<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<!-- 禁止百度转码 -->
<meta http-equiv="Cache-Control" content="no-siteapp" />

<!-- UC强制竖屏 -->
<meta name="screen-orientation" content="portrait" />

<!-- UC强制全屏 -->
<meta name="full-scerrn" content="yes" />

<!-- UC应用模式 -->
<meta name="browsermode" content="application" />

<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait" />

<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="ture" />

<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app" />

<!-- window phone 点亮无高光 -->
<meta name="msapplication-tap-highlight" content="no" />

<!-- 安卓设备不自动识别邮件地址 -->
<meta name="format-detection" name="email=no" />

<!-- 设置网页的定时跳转 -->
<meta http-equiv="refresh" content="跳转时间；url=链接地址" />

<!-- iOS设备 -->
<!-- 添加到主屏幕的标题 -->
<meta name="apple-mobile-web-app-title" content="标题" />

<!-- 是否启用webApp全屏 -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- 设置状态栏的背景颜色，启用webapp模式时生效 -->
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent/black/default"
/>

<!-- 半透明/黑色/默认白色 -->
<!-- 禁止数字识别为电话号码 -->
<meta name="format-detection" content="telephone=no;email=no" />

<!-- 
iOS图标
iPhone/iTouch默认是57*57
iPad，72*72，可以没有，但推荐有
Retina iPhone/Retina iTouch，114*114,可以没有，但推荐有
Retina iPad,144*144,可以没有，但推荐有
iPhone 6 plus是180*180，iPhone 6 是120*120
-->
<link rel="apple--touch-icon-precomposed" sizes="width*height" href="xxx.png" />

<!-- 
iOS启动画面 
iPad启动是不包含状态栏的 
标准分辨率：1、竖屏(768*1004)；2、横屏(1024*748)
Retina:1、竖屏(1536*2008)；2、横屏(2048*1496)
iPhone/iTouch启动是包含状态栏的
标准分辨率(320*480)、Retina(640*960)、iPhone 5/iTouch 5(640*1136) 
-->
<link rel="apple-touch-startup-image" sizes="width*height" href="xxx.png" />

<!-- iPhone 6对应的图片大小是750×1294，iPhone 6 Plus 对应的是1242×2148 -->
<link
  rel="apple-touch-startup-image"
  href="xxx.png"
  media="(device-width:375px)"
/>
<link
  rel="apple-touch-startup-image"
  href="xxx.png"
  media="(device-width:414px)"
/>

<!-- 智能添加广告条 -->
<meta
  name="apple-itunes-app"
  content="app-id=myappstoreID,affiliate-data=myaffiliatedata,app-argument=myurl"
/>
```

### 图片

禁止 img 的 src 取值为空。延迟加载的图片也要增加默认的 src。

:::tip
src 取值为空，会导致部分浏览器重新加载一次当前页面，参考：https://developer.yahoo.com/performance/rules.html#emptysrc
:::

避免为 img 添加不必要的 title 属性。

:::tip
多余的 title 影响看图体验，并且增加了页面尺寸。
:::

为重要图片添加 alt 属性。

:::tip
可以提高图片加载失败时的用户体验。
:::

添加 width 和 height 属性，以避免页面抖动。

有下载需求的图片采用 img 标签实现，无下载需求的图片采用 CSS 背景图实现。

### 引入 CSS, JS

根据 HTML5 规范, 通常在引入 CSS 和 JS 时不需要指明 type，因为 text/css 和 text/javascript 分别是他们的默认值。

HTML5 规范链接

- [使用 link](http://www.w3.org/TR/2011/WD-html5-20110525/semantics.html#the-link-element)
- [使用 style](http://www.w3.org/TR/2011/WD-html5-20110525/semantics.html#the-style-element)
- [使用 script](http://www.w3.org/TR/2011/WD-html5-20110525/scripting-1.html#the-script-element)

```js
<!-- External CSS -->
<link rel="stylesheet" href="code_guide.css">

<!-- In-document CSS -->
<style>
    ...
</style>

<!-- External JS -->
<script src="code_guide.js"></script>

<!-- In-document JS -->
<script>
    ...
</script>
```

### 注释

好的命名与代码组织优于注释。如果你为代码添加了注释，在对代码进行改动的时候记得更新它。

用 TODO 标示待办事项和正在开发的条目

```
<!-- TODO: 图文混排 -->
<div class="g-imgtext">
  <img src="1.png" alt="" />
  ...

  /* TODO: 图文混排 comm: g-imgtext */
  .g-imgtext { sRules; }
</div>
```

### JS 生成标签

在 JS 文件中生成标签让内容变得更难查找，更难编辑，性能更差。应该尽量避免这种情况的出现。

### 减少标签数量

在编写 HTML 代码时，需要尽量避免多余的父节点；

很多时候，需要通过迭代和重构来使 HTML 变得更少。

```html
<!-- Not well -->
<span class="avatar">
  <img src="..." />
</span>

<!-- Better -->
<img class="avatar" src="..." />
```

### 实用高于完美

尽量遵循 HTML 标准和语义，但是不应该以浪费实用性作为代价；

任何时候都要用尽量小的复杂度和尽量少的标签来解决问题。

### 其他

省略嵌入式资源协议头

不推荐：

```html
<script src="http://www.google.com/js/gweb/analytics/autotrack.js"></script>
```

推荐：

```html
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```

不推荐：

```css
.example {
  background: url(http://www.google.com/images/example);
}
```

推荐：

```css
.example {
  background: url(//www.google.com/images/example);
}
```

如果是粗体就使用 b/strong，而不是自己设置 font-weight

如果是表单就使用 form 标签，注意 form 里面不能套 form

如果内容是表格就使用 table，table 有自适应的优点；如果是一个列表就使用 ol/ul 标签，扩展性比较好

如果是跳链就使用 a 标签，而不是自己写 onclick 跳转。a 标签里面不能套 a 标签

自定义属性要以 data-开头
