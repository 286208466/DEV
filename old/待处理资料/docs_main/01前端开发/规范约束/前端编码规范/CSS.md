## CSS

### 缩进

统一缩进方式（4 个空格 | 2 个空格 | tab）。

```css
.element {
  position: absolute;
  top: 10px;
  left: 10px;

  border-radius: 10px;
  width: 50px;
  height: 50px;
}
```

### 分号

每个属性声明末尾都要加分号。

```css
.element {
  width: 20px;
  height: 20px;

  background-color: red;
}
```

### 空格

以下几种情况不需要空格：

- 属性名后
- 多个规则的分隔符','前
- !important '!'后
- 属性值中'('后和')'前
- 行末不要有多余的空格

以下几种情况需要空格：

:::tip

- 属性值前
- 选择器'>', '+', '~'前后
- `'{'`前
- !important '!'前
- @else 前后
- 属性值中的','后
- 注释'/_'后和'_/'前

:::

```css
/* not good */
.element {
    color :red!important;
    background-color: rgba(0,0,0,.5);
}

/* good */
.element {
    color: red !important;
    background-color: rgba(0, 0, 0, .5);
}

/* not good */
.element ,
.dialog{
    ...
}

/* good */
.element,
.dialog {

}

/* not good */
.element>.dialog{
    ...
}

/* good */
.element > .dialog{
    ...
}

/* not good */
.element{
    ...
}

/* good */
.element {
    ...
}

/* not good */
@if{
    ...
}@else{
    ...
}

/* good */
@if {
    ...
} @else {
    ...
}

```

### 空行

以下几种情况需要空行：

- 文件最后保留一个空行
- '}'后最好跟一个空行，包括 scss 中嵌套的规则
- 属性之间需要适当的空行，具体见[属性声明顺序](https://alloyteam.github.io/CodeGuide/#css-declaration-order)

```
/* not good */
.element {
    ...
}
.dialog {
    color: red;
    &:after {
        ...
    }
}

/* good */
.element {
    ...
}

.dialog {
    color: red;

    &:after {
        ...
    }
}
```

### 换行

以下几种情况需要换行：

- '{'后和'}'前
- 每个属性独占一行
- 多个规则的分隔符','后

```
/* not good */
.element
{color: red; background-color: black;}

/* good */
.element {
    color: red;
    background-color: black;
}

/* not good */
.element, .dialog {
    ...
}

/* good */
.element,
.dialog {
    ...
}
```

### 注释

注释统一用'/\* \*/'（scss 中也不要用'//'），具体参照右边的写法；

缩进与下一行代码保持一致；

可位于一个代码行的末尾，与代码间隔一个空格。

```
/* Modal header */
.modalHeader {
    ...
}

/*
 * Modal header
 */
.modalHeader {
    ...
}

.modalHeader {
    /* 50px */
    width: 50px;

    color: red; /* color red */
}
```

### 引号

最外层统一使用双引号；

url 的内容要用引号；

属性选择器中的属性值需要引号。

```
.element:after {
    content: "";
    background-image: url("logo.png");
}

li[data-type="single"] {
    ...
}
```

### 命名

class 命名

- 采用驼峰式命名，不要由特殊字符，比如 loginForm,
- 使用有意义的名称；使用结构化或者作用目标相关，而不是抽象的名称
- 命名时使用最近的父节点或者父 class 作为前缀。
- 使用 .js-\* class 来标识行为（与样式相对），并且不要将这些 class 包含到 CSS 文件中

ID 命名

- 同 class 命名规则

其他（变量、属性等）命名：

- 采用驼峰式命名

```
/* class */
.elementContent {
    ...
}

/* id */
#myDialog {
    ...
}

/* 变量 */
$colorBlack: #000;

/* 函数 */
@function pxToRem($px) {
    ...
}

/* 混合 */
@mixin centerBlock {
    ...
}

/* placeholder */
%myDialog {
    ...
}
```

### 属性

#### 属性声明顺序

相关的属性声明按右边的顺序做分组处理，组之间需要有一个空行。

```css
.declaration-order {
  display: block;
  float: right;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  border: 1px solid #e5e5e5;
  border-radius: 3px;
  width: 100px;
  height: 100px;

  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  text-align: center;

  color: #333;
  background-color: #f5f5f5;

  opacity: 1;
}
```

```js
// 下面是推荐的属性的顺序
[
  [
    "display",
    "visibility",
    "float",
    "clear",
    "overflow",
    "overflow-x",
    "overflow-y",
    "clip",
    "zoom",
  ],
  [
    "table-layout",
    "empty-cells",
    "caption-side",
    "border-spacing",
    "border-collapse",
    "list-style",
    "list-style-position",
    "list-style-type",
    "list-style-image",
  ],
  [
    "-webkit-box-orient",
    "-webkit-box-direction",
    "-webkit-box-decoration-break",
    "-webkit-box-pack",
    "-webkit-box-align",
    "-webkit-box-flex",
  ],
  ["position", "top", "right", "bottom", "left", "z-index"],
  [
    "margin",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "-webkit-box-sizing",
    "-moz-box-sizing",
    "box-sizing",
    "border",
    "border-width",
    "border-style",
    "border-color",
    "border-top",
    "border-top-width",
    "border-top-style",
    "border-top-color",
    "border-right",
    "border-right-width",
    "border-right-style",
    "border-right-color",
    "border-bottom",
    "border-bottom-width",
    "border-bottom-style",
    "border-bottom-color",
    "border-left",
    "border-left-width",
    "border-left-style",
    "border-left-color",
    "-webkit-border-radius",
    "-moz-border-radius",
    "border-radius",
    "-webkit-border-top-left-radius",
    "-moz-border-radius-topleft",
    "border-top-left-radius",
    "-webkit-border-top-right-radius",
    "-moz-border-radius-topright",
    "border-top-right-radius",
    "-webkit-border-bottom-right-radius",
    "-moz-border-radius-bottomright",
    "border-bottom-right-radius",
    "-webkit-border-bottom-left-radius",
    "-moz-border-radius-bottomleft",
    "border-bottom-left-radius",
    "-webkit-border-image",
    "-moz-border-image",
    "-o-border-image",
    "border-image",
    "-webkit-border-image-source",
    "-moz-border-image-source",
    "-o-border-image-source",
    "border-image-source",
    "-webkit-border-image-slice",
    "-moz-border-image-slice",
    "-o-border-image-slice",
    "border-image-slice",
    "-webkit-border-image-width",
    "-moz-border-image-width",
    "-o-border-image-width",
    "border-image-width",
    "-webkit-border-image-outset",
    "-moz-border-image-outset",
    "-o-border-image-outset",
    "border-image-outset",
    "-webkit-border-image-repeat",
    "-moz-border-image-repeat",
    "-o-border-image-repeat",
    "border-image-repeat",
    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "width",
    "min-width",
    "max-width",
    "height",
    "min-height",
    "max-height",
  ],
  [
    "font",
    "font-family",
    "font-size",
    "font-weight",
    "font-style",
    "font-variant",
    "font-size-adjust",
    "font-stretch",
    "font-effect",
    "font-emphasize",
    "font-emphasize-position",
    "font-emphasize-style",
    "font-smooth",
    "line-height",
    "text-align",
    "-webkit-text-align-last",
    "-moz-text-align-last",
    "-ms-text-align-last",
    "text-align-last",
    "vertical-align",
    "white-space",
    "text-decoration",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-style",
    "text-emphasis-position",
    "text-indent",
    "-ms-text-justify",
    "text-justify",
    "letter-spacing",
    "word-spacing",
    "-ms-writing-mode",
    "text-outline",
    "text-transform",
    "text-wrap",
    "-ms-text-overflow",
    "text-overflow",
    "text-overflow-ellipsis",
    "text-overflow-mode",
    "-ms-word-wrap",
    "word-wrap",
    "-ms-word-break",
    "word-break",
  ],
  [
    "color",
    "background",
    "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader",
    "background-color",
    "background-image",
    "background-repeat",
    "background-attachment",
    "background-position",
    "-ms-background-position-x",
    "background-position-x",
    "-ms-background-position-y",
    "background-position-y",
    "-webkit-background-clip",
    "-moz-background-clip",
    "background-clip",
    "background-origin",
    "-webkit-background-size",
    "-moz-background-size",
    "-o-background-size",
    "background-size",
  ],
  [
    "outline",
    "outline-width",
    "outline-style",
    "outline-color",
    "outline-offset",
    "opacity",
    "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity",
    "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
    "-ms-interpolation-mode",
    "-webkit-box-shadow",
    "-moz-box-shadow",
    "box-shadow",
    "filter:progid:DXImageTransform.Microsoft.gradient",
    "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
    "text-shadow",
  ],
  [
    "-webkit-transition",
    "-moz-transition",
    "-ms-transition",
    "-o-transition",
    "transition",
    "-webkit-transition-delay",
    "-moz-transition-delay",
    "-ms-transition-delay",
    "-o-transition-delay",
    "transition-delay",
    "-webkit-transition-timing-function",
    "-moz-transition-timing-function",
    "-ms-transition-timing-function",
    "-o-transition-timing-function",
    "transition-timing-function",
    "-webkit-transition-duration",
    "-moz-transition-duration",
    "-ms-transition-duration",
    "-o-transition-duration",
    "transition-duration",
    "-webkit-transition-property",
    "-moz-transition-property",
    "-ms-transition-property",
    "-o-transition-property",
    "transition-property",
    "-webkit-transform",
    "-moz-transform",
    "-ms-transform",
    "-o-transform",
    "transform",
    "-webkit-transform-origin",
    "-moz-transform-origin",
    "-ms-transform-origin",
    "-o-transform-origin",
    "transform-origin",
    "-webkit-animation",
    "-moz-animation",
    "-ms-animation",
    "-o-animation",
    "animation",
    "-webkit-animation-name",
    "-moz-animation-name",
    "-ms-animation-name",
    "-o-animation-name",
    "animation-name",
    "-webkit-animation-duration",
    "-moz-animation-duration",
    "-ms-animation-duration",
    "-o-animation-duration",
    "animation-duration",
    "-webkit-animation-play-state",
    "-moz-animation-play-state",
    "-ms-animation-play-state",
    "-o-animation-play-state",
    "animation-play-state",
    "-webkit-animation-timing-function",
    "-moz-animation-timing-function",
    "-ms-animation-timing-function",
    "-o-animation-timing-function",
    "animation-timing-function",
    "-webkit-animation-delay",
    "-moz-animation-delay",
    "-ms-animation-delay",
    "-o-animation-delay",
    "animation-delay",
    "-webkit-animation-iteration-count",
    "-moz-animation-iteration-count",
    "-ms-animation-iteration-count",
    "-o-animation-iteration-count",
    "animation-iteration-count",
    "-webkit-animation-direction",
    "-moz-animation-direction",
    "-ms-animation-direction",
    "-o-animation-direction",
    "animation-direction",
  ],
  [
    "content",
    "quotes",
    "counter-reset",
    "counter-increment",
    "resize",
    "cursor",
    "-webkit-user-select",
    "-moz-user-select",
    "-ms-user-select",
    "user-select",
    "nav-index",
    "nav-up",
    "nav-right",
    "nav-down",
    "nav-left",
    "-moz-tab-size",
    "-o-tab-size",
    "tab-size",
    "-webkit-hyphens",
    "-moz-hyphens",
    "hyphens",
    "pointer-events",
  ],
];
```

#### 带前缀的属性

当使用特定厂商的带有前缀的属性时，通过缩进的方式，让每个属性的值在垂直方向对齐，这样便于多行编辑。

```
/* Prefixed properties */
.selector {
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
          box-shadow: 0 1px 2px rgba(0,0,0,.15);
}
```

### 颜色

所有的十六进制值都应该使用小写字母，例如 #fff。因为小写字母有更多样的外形，在浏览文档时，他们能够更轻松的被区分开来。

尽可能使用短的十六进制数值，例如使用 #fff 替代 #ffffff

```
/* not good */
.element {
    color: #ABCDEF;
    background-color: #001122;
}

/* good */
.element {
    color: #abcdef;
    background-color: #012;
}
```

### 属性简写

属性简写需要你非常清楚属性值的正确顺序，而且在大多数情况下并不需要设置属性简写中包含的所有值，所以建议尽量分开声明会更加清晰；

margin 和 padding 相反，需要使用简写；

常见的属性简写包括：

- font
- background
- transition
- animation

```
/* not good */
.element {
    transition: opacity 1s linear 2s;
}

/* good */
.element {
    transition-delay: 2s;
    transition-timing-function: linear;
    transition-duration: 1s;
    transition-property: opacity;
}
```

### 媒体查询

尽量将媒体查询的规则靠近与他们相关的规则，不要将他们一起放到一个独立的样式文件中，或者丢在文档的最底部，这样做只会让大家以后更容易忘记他们。

```css
.element {
  ...;
}

.element-avatar {
  ...;
}

@media (min-width: 480px) {
  .element {
    ...;
  }

  .element-avatar {
    ...;
  }
}
```

### SCSS 相关

提交的代码中不要有 @debug；

声明顺序：

- @extend
- 不包含 @content 的 @include
- 包含 @content 的 @include
- 自身属性
- 嵌套规则

@import 引入的文件不需要开头的'\_'和结尾的'.scss'；

嵌套最多不能超过 3 层；

@extend 中使用 placeholder 选择器；

去掉不必要的父级引用符号'&'。

```
/* not good */
@import "_dialog.scss";

/* good */
@import "dialog";

/* not good */
.fatal {
    @extend .error;
}

/* good */
.fatal {
    @extend %error;
}

/* not good */
.element {
    & > .dialog {
        ...
    }
}

/* good */
.element {
    > .dialog {
        ...
    }
}
```

### 选择器

- 使用 class 而不是通用元素标签来优化渲染性能。

- 避免在经常出现的组件中使用一些属性选择器 (例如，[class^="..."])。浏览器性能会受到这些情况的影响。

- 减少选择器的长度，每个组合选择器选择器的条目应该尽量控制在 3 个以内。

- 只在必要的情况下使用后代选择器 (例如，没有使用带前缀 classes 的情况).

- 不要使用 ID 选择器

### 其他

- 不允许有空的规则；

- 元素选择器用小写字母；

- 去掉小数点前面的 0；

- 去掉数字中不必要的小数点和末尾的 0；

- 属性值'0'后面不要加单位；

- 同个属性不同前缀的写法需要在垂直方向保持对齐，具体参照右边的写法；

- 无前缀的标准属性应该写在有前缀的属性后面；

- 不要在同个规则里出现重复的属性，如果重复的属性是连续的则没关系；

- 不要在一个文件里出现两个相同的规则；

- 用 border: 0; 代替 border: none;；

- 选择器不要超过 4 层（在 scss 中如果超过 4 层应该考虑用嵌套的方式来写）；

- 发布的代码中不要有 @import；

- 尽量少用'\*'选择器。

```
/* not good */
.element {
}

/* not good */
LI {
    ...
}

/* good */
li {
    ...
}

/* not good */
.element {
    color: rgba(0, 0, 0, 0.5);
}

/* good */
.element {
    color: rgba(0, 0, 0, .5);
}

/* not good */
.element {
    width: 50.0px;
}

/* good */
.element {
    width: 50px;
}

/* not good */
.element {
    width: 0px;
}

/* good */
.element {
    width: 0;
}

/* not good */
.element {
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;

    background: linear-gradient(to bottom, #fff 0, #eee 100%);
    background: -webkit-linear-gradient(top, #fff 0, #eee 100%);
    background: -moz-linear-gradient(top, #fff 0, #eee 100%);
}

/* good */
.element {
    -webkit-border-radius: 3px;
       -moz-border-radius: 3px;
            border-radius: 3px;

    background: -webkit-linear-gradient(top, #fff 0, #eee 100%);
    background:    -moz-linear-gradient(top, #fff 0, #eee 100%);
    background:         linear-gradient(to bottom, #fff 0, #eee 100%);
}

/* not good */
.element {
    color: rgb(0, 0, 0);
    width: 50px;
    color: rgba(0, 0, 0, .5);
}

/* good */
.element {
    color: rgb(0, 0, 0);
    color: rgba(0, 0, 0, .5);
}
```

- 禁止使用无样式 class 来 hook 脚本

:::tip
禁止为元素定义无样式的 class，而作为调用脚本使用。这样会造成页面 class 定义冗余以及增加维护难度。请使用元素自带属性或自定义属性实现。
:::

```js
// bad
<div class="click-alert"></div>;
$(".click-alert").click(function () {});

// good
<div data-action="clickAlert"></div>;
$('div[data-action="clickAlert"]').click(function () {});
```

- 不要使用 @import

:::tip
与 `<link>` 标签相比，@import 指令要慢很多，不光增加了额外的请求次数，还会导致不可预料的问题。替代办法有以下几种：

- 使用多个 `<link>` 元素
- 通过 Sass 或 Less 之类的 CSS 预处理器将多个 CSS 文件编译为一个文件
- 通过 Rails、Jekyll 或其他系统中提供过 CSS 文件合并功能

```html
<!-- Use link elements -->
<link rel="stylesheet" href="core.css" />

<!-- Avoid @imports -->
<style>
  @import url("more.css");
</style>
```

:::

### 常用命名

页面结构

```
　　头：header
　　内容：content/container
　　尾：footer
　　导航：nav
　　侧栏：sidebar
　　栏目：column
　　页面外围控制整体佈局宽度：wrapper
　　左右中：left right center
　　登录条：loginbar
　　标志：logo
　　广告：banner
　　页面主体：main
　　热点：hot
　　新闻：news
　　下载：download
　　子导航：subnav
　　菜单：menu
　　子菜单：submenu
　　搜索：search
　　友情链接：friendlink
　　页脚：footer
　　版权：copyright
　　滚动：scroll
　　内容：content
　　标签：tags
　　文章列表：list
　　提示信息：msg
　　小技巧：tips
　　栏目标题：title
　　加入：joinus
　　指南：guide
　　服务：service
　　注册：regsiter
　　状态：status
　　投票：vote
　　合作伙伴：partner
```

导航

```
　　导航：nav
　　主导航：mainnav
　　子导航：subnav
　　顶导航：topnav
　　边导航：sidebar
　　左导航：leftsidebar
　　右导航：rightsidebar
　　菜单：menu
　　子菜单：submenu
　　标题: title
　　摘要: summary
```

功能

```
　　标志：logo
　　广告：banner
　　登陆：login
　　登录条：loginbar
　　注册：register
　　搜索：search
　　功能区：shop
　　标题：title
　　加入：joinus
　　状态：status
　　按钮：btn
　　滚动：scroll
　　标籤页：tab
　　文章列表：list
　　提示信息：msg
　　当前的: current
　　小技巧：tips
　　图标: icon
　　注释：note
　　指南：guild
　　服务：service
　　热点：hot
　　新闻：news
　　下载：download
　　投票：vote
　　合作伙伴：partner
　　友情链接：link
　　版权：copyright
```
