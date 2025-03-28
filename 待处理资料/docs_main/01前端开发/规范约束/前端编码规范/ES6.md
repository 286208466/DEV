### 引用

**使用 let 代替 var**

- let 声明的变量属于块级作用域
- let 不会带来变量提升（Hoisting）

```js
// bad
for (var i = 0; i < 3; i++) {
  // ...
}
console.log(i); // 3

// good
for (let i = 0; i < 3; i++) {
  // ...
}
console.log(i); // i is not defined
```

**使用 const 声明常量**

如果变量不需要重新分配值，全部用 const 声明

- const 声明后，无法修改引用的值，可避免被重写
- const 也属于块级作用域
- const 不会带来变量提升（Hoisting）

多次使用的命名空间，使用对象解构替换，简洁易读

```js
// bad
const x = obj.x;
const y = obj.y;
const a = arr[0];
const b = arr[1];

// good
const { x, y } = obj;
const [a, b] = arr;
```

### 类型转换

转换成字符串时，使用 String 构造器

```js
const reviewScore = 9;

// bad
const totalScore = reviewScore + "";
// 实际调用: reviewScore.valueOf()
const obj = {
  valueOf: () => 1,
};
obj + ""; // '1' 而不是 '[object Object]'

// bad
const totalScore = reviewScore.toString(); // toString 方法可能被改写

// good
const totalScore = String(reviewScore);
```

转换成数字时，使用 Number 构造器

```js
const inputValue = "4";

// bad
const val = +inputValue;

// bad
const val = new Number(inputValue);

// bad
/**
 * JavaScript 位运算完全套用 Java，有三个问题：
 * 1、位操作针对的是整数，小数部分会被舍弃
 * 2、整数不能超过32位
 * 3、JavaScript 的数字都是以双精度浮点数存储的，实际执行还需要先转换为整数
 */
const val = inputValue >> 0;

// good
const val = Number(inputValue);
```

解析成整数时，使用 ParseInt

:::tip

使用 parseInt 时，如果不指定进制，转换的变量以 0 开头（比如一些月份和天），ECMAScript 3 会当作 8 进制。

:::

```js
const inputValue = "200px";

// bad
const val = parseInt(inputValue);

// good
const val = parseInt(inputValue, 10);
```

转换成 boolean 时，使用 Boolean 构造器或者 !!variable

```js
const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// good
const hasAge = !!age;
```

### 条件

使用 === 和 !== 而不是 == 和 !=

:::tip

严格判断会检查对象的类型，避免隐式的类型转换

:::

```js
0 == false; // true
0 == "0"; // true
0 === false; // false
0 === "0"; // false
```

使用简写

```js
// bad
if (collection.length > 0) {
  // ...
}

// good
if (collection.length) {
  // ...
}
```

避免使用 switch

:::tip

switch 的方式需要逐条 case 判断且匹配的 case，如果漏掉 break，会执行下一条 case （不论是否满足）或 default，直到遇到 break 为止。

使用字典对象代替，速度更快，同时避免未预料的结果。

:::

```js
const cases = {
  alpha: function () {
    // ...
  },
  beta: function () {
    // ...
  },
  _default: function () {
    // ...
  },
};
```

### 循环

循环体不要包含函数表达式，事先将函数提取到循环体外，避免多次声明函数对象。

```js
// bad
for (let i = 0, len = elements.length; i < len; i++) {
  const element = elements[i];
  addListener(element, "click", function () {});
}

// good
function clicker() {
  // ...
}

for (let i = 0, len = elements.length; i < len; i++) {
  const element = elements[i];
  addListener(element, "click", clicker);
}
```

对有序集合进行遍历时，缓存 length

:::tip

虽然现代浏览器都对数组长度进行了缓存，但对于一些宿主对象和老旧浏览器的数组对象，在每次 length 访问时会动态计算元素个数，此时缓存 length 能有效提高程序性能。

:::

```js
// bad
for (let i = 0; i < arr.length; i++) {
  console.log(i);
}

// good
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(i);
}
```

使用倒序遍历（不考虑先后顺序的情况下）

```js
for (let i = elements.length; i--; ) {
  const element = elements[i];
}
```

:::tip

无需额外变量缓存集合长度

前测条件只需判断数字是否为 true，无需大小比较

无需运行后执行体

避免了数组越界

:::

遍历对象若无需获取原型链的属性，用 Object.keys 和 for 代替 for...in

```js
for (let keys = Object.keys(obj), i = keys.length; i--; ) {
  const key = keys[i];
  // ...
}
```

:::tip

for in 的速度很慢

无需遍历原型链的可枚举属性

无需 hasOwnProperty 判断来避免遍历原型链（ Object.create(null) 除外 ）

10 万个属性的对象两种遍历方式在 Chrome48 测试结果：

for in: 143ms Object.keys + for: 45ms

:::

### 字符串

字符串模版

```js
const name = "lucy";

// bad
const greetings = "Hello " + name;

// good
const greetings = `Hello ${name}`;
```

换行的字符串

```js
const html = `
<article>
  <h1>Title here</h1>
  <p>This is a paragraph</p>
  <footer>Complete</footer>
</article>
```

### 数组

使用数组字面量 [] 创建新数组，除非想要创建的是指定长度的数组

```js
// bad
const items = new Array();

// good
const items = [];
```

使用扩展运算符（spread operator）... 复制数组

```js
// bad
const list = [1, 2, 3];
const result = list.concat();

// good
const list = [1, 2, 3];
const result = [...list];
```

转换类数组（array-like object）成数组时，使用 Array.from

```js
const foo = document.querySelectorAll(".foo");

// bad
const nodes = Array.prototype.slice.call(foo, 0);

// good
const nodes = Array.from(foo);
```

### 对象

使用对象字面量 {} 创建新 Object

```js
// bad
const item = new Object();

// good
const item = {};
```

对象的属性不使用关键字/保留字，只对无效属性的属性名添加引号

```js
// bad
const superman = {
  default: { clark: "kent" },
  bar: true,
  "data-blah": 5,
};

// good
const superman = {
  defaults: { clark: "kent" },
  bar: true,
  "data-blah": 5,
};
```

不允许修改和扩展任何原生对象和宿主对象的原型，避免干扰他人使用

```js
// bad
JSON.stringify = function () {
  // ...
};
```

:::tip

如果必须重写内置方法，功能上保持一致性

:::

动态属性名使用属性名表达式

:::tip

所有属性可在对象创建的时候一次性定义

:::

```js
// bad
const prop = condition ? "testA" : "testB";
const item = {
  test: 0,
};
item[prop] = true;

// good
const prop = condition ? "testA" : "testB";
const item = {
  test: 0,
  [prop]: true,
};
```

对象方法省略 function

```js
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

属性简写

```js
const lukeSkywalker = "Luke Skywalker";

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```

简写的属性放在前面，很容易识别哪些是简写属性

```js
const anakinSkywalker = "Anakin Skywalker";
const lukeSkywalker = "Luke Skywalker";

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

### 函数

不在循环体内声明函数，前面的循环提过

不用使用 arguments，可以选择扩展运算符 ... 替代（rest 参数）

:::tip

使用 ... 能表明你要传入的参数

rest 参数是一个真正的数组，而 arguments 是一个类数组

:::

```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join("");
}

// good
function concatenateAll(...args) {
  return args.join("");
}
```

直接给函数的参数指定默认值，不要使用一个变化的函数参数

:::tip

默认值只会在参数未传入或值为 undefined 的情况下被使用

:::

```js
// bad
function handleThings(opts) {
  opts = opts || {};
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

使用函数表达式（或传递一个匿名函数），使用箭头函数

:::tip

箭头函数体内的 this 对象为定义时所在的对象而不是使用时所在的对象且写法更简洁

:::

```js
// bad
[1, 2, 3]
  .map(function (x) {
    this.count += x;
    return x * x;
  }, this)

  [
    // good
    (1, 2, 3)
  ].map((x) => {
    this.count += x;
    return x * x;
  });
```

箭头函数如果只有一个参数，省略圆括号；如果函数体只有一行返回语句，省略花括号和 return

```js
// bad
[1, 2, 3]
  .map((x) => {
    return x * x;
  })

  [
    // good
    (1, 2, 3)
  ].map((x) => x * x);
```

### 面向对象

总是使用 class, 避免直接操作 prototype

:::tip

class 语法更符合标准面向对象结构，更简洁易读

:::

```js
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}

Queue.prototype.pop = function () {
  return this._queue.pop();
};

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }

  pop() {
    return this._queue.pop();
  }
}
```

使用 extends 继承

```js
// bad
const inherits = require("inherits");

function PeekableQueue(contents) {
  Queue.apply(this, contents);
}

inherits(PeekableQueue, Queue);

PeekableQueue.prototype.peek = function () {
  return this._queue[0];
};

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```

### 模块

使用 import / export 而不是其他非标准模块系统

```js
// bad
const styleGuide = require("./styleGuide");

// good
import styleGuide from "./styleGuide";
```

### 动态特性

避免使用直接 eval 函数

:::tip

动态代码如果通过其他来源传入 eval('document.' + potato + '.style.color = "red"')，可能导致注入攻击

动态代码调试起来不方便，如具体的行数不明

动态代码执行更慢（不能编译、缓存）

eval 直接调用时，作用域为当前作用域，间接调用时，作用域为全局作用域，可能会造成干扰

:::

```js
// 直接调用
function test() {
  let count = 0;
  eval("count++");
}

// 相当于
function test() {
  let count = 0;
  count++;
}

// 间接调用
function test() {
  let count = 0;
  const myEval = eval;
  myEval("count++");
}

// 相当于
function test() {
  let count = 0;
}
count++;
```

如果一定要执行动态代码，使用 new Function 执行

:::tip

new Function 相当于在全局作用域下声明一个函数，不会干扰其他作用域

:::

```js
function test() {
  const foo = new Function("name", "return name");
}

// 相当于
function test() {}
const foo = function (name) {
  return name;
};
```

使用函数代替动态代码

:::tip

动态代码的执行作用域是全局的，会影响全局作用域

:::

```js
// bad
setTimeout('a++', 0)
// 与HTML上直接定义事件相同
element.setAttribute('onclick', 'doSomething()')

// good
setTimeout(function() {
  a++
}, 0)
element.addEventListener('click', function() { ... }, false)
```

尽量不要使用 with

:::tip

with 作用域下如果没找到，会向父级寻找，可能造成未预料的结果

:::

```js
// 如果 o 没有属性 x，则会读取参数 x，可能不是想要的结果
function f(x, o) {
  with (o) print(x);
}
```

### 浏览器环境

尽量减少 DOM 操作

:::tip

使用变量缓存 DOM 对象

:::

```js
// bad
document.getElementById("container").setAttribute("class", "active");
document.getElementById("container").setAttribute("index", 0);

// good
const el = document.getElementById("container");
el.setAttribute("class", "active");
el.setAttribute("index", 0);
```

操作 DOM 时，尽量减少页面 reflow

:::tip

页面 reflow 是非常耗时的行为，非常容易导致性能瓶颈。下面一些场景会触发浏览器的 reflow：

- DOM 元素的添加、修改（内容）、删除
- 应用新的样式或者修改任何影响元素布局的属性
- Resize 浏览器窗口、滚动页面
- 读取元素的某些属性，如 offsetLeft、offsetTop、offsetHeight、offsetWidth、scrollTop/Left/Width/Height、clientTop/Left/Width/Height、getComputedStyle()、currentStyle(IE)

:::

```js
// bad
el.style.width = "100px";
el.style.height = "100px";
while (i--) {
  el.style.left = el.offsetWidth + 10 + "px";
}

// good
el.style.cssText = "width: 100px; height: 100px;";
const offsetWidth = el.offsetWidth;
while (i--) {
  el.style.left = offsetWidth + 10 + "px";
}
```

操作 document fragment 是在内存中操作而非 DOM 树下，不会导致 reflow

```js
// bad
for (let i = 0; i < 5; i++) {
  const li = document.createElement("li");
  ul.appendChild(li);
}

// good
const docFrag = document.createDocumentFragment();
for (let i = 0; i < 5; i++) {
  const li = document.createElement("li");
  docFrag.appendChild(li);
}
ul.appendChild(docFrag);
```

获取子元素使用 children，避免使用 childNodes，除非子元素包含文本、注释和属性节点

:::tip

childNodes 的范围包括 children、文本、注释和属性节点

:::

优先使用 addEventListener / attachEvent 绑定事件，避免直接在 HTML 属性中或 DOM 的属性绑定事件

:::tip

addEventListener / attachEvent 可绑定多个事件

直接在 HTML 属性中或 DOM 的属性绑定事件属于动态代码，在全局作用域下执行

:::
