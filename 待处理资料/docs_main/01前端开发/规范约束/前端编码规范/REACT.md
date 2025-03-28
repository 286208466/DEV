## 格式

### 命名

文件使用 .jsx 扩展名, 不应在项目中出现部分组件为.js文件，部分为.jsx的情况。

:::tip

明确属于 React 组件

与 JS 文件区分

方便 IDE 的语法高亮

:::

组件文件名使用帕斯卡式，如 ReservationCard.jsx

组件名称与文件名称保持相同

属性名使用驼峰式

```js
// bad
<Foo UserName="hello" phone_number={12345678} />

// good
<Foo userName="hello" phoneNumber={12345678} />
```

### 文件

一个文件只有一个组件

:::tip
与文件名保持一致

防止单个文件代码量过大，不好阅读以及管理
:::

### 引号

JSX 字符串属性值使用双引号，属性值属于 js 代码的字符串使用单引号，使用。eslint: jsx-quotes

```
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{left: "20px"}} />

// good
<Foo style={{left: '20px'}} />

```

### 空格

自关闭标签前保留一个空格

```
// bad
<Foo/>

// good
<Foo />
```

### 换行

多行 JSX 语句使用括号包裹。eslint: react/wrap-multilines

```js
// bad
render() {
  return <MyComponent className="long body" foo="bar">
           <MyChild />
         </MyComponent>
}

// good
render() {
  return (
    <MyComponent className="long body" foo="bar">
      <MyChild />
    </MyComponent>
  )
}
```
### 标签

组件没有 children 时，标签自关闭。eslint: react/self-closing-comp

```js
// bad
<Foo className="stuff"></Foo>

// good
<Foo className="stuff" />

```

### 属性

属性值为 true 时，省略属性值。eslint: react/jsx-boolean-value

```js
// bad
<Foo hidden={true} />

// good
<Foo hidden />
```

### 顺序

依照规定顺序编排组件中的方法和属性

```
static displayName
static propTypes
static contextTypes
state defaultProps
static state
其它静态的属性
用于事件处理并且以属性的方式（onClick = e => {...}）声明的方法
其它实例属性
constructor
getChildContext
componentWillMount
componentDidMount
shouldComponentUpdate
componentWillUpdate
componentDidUpdate
componentWillUnmount
事件处理方法
其它方法
render
```

propTypes, defaultProps, contextTypes, childContextTypes 声明方式

以 propTypes 为例

```js
import React, { PropTypes } from 'react';

const Link = React.createClass({
  render() {
    return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
  }
})

Link.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
}

export default Link
```


[https://github.com/airbnb/javascript/tree/master/react](https://github.com/airbnb/javascript/tree/master/react)



### 其他

- 同一目录下不得拥有同名的.js和.jsx文件。

:::tip
在使用模块导入时，倾向于不添加后缀，如果存在同名但不同后缀的文件，构建工具将无法决定哪一个是需要引入的模块
:::



- 每一个文件以export default的形式暴露一个组件

:::tip
允许一个文件中存在多个不同的组件，但仅允许通过export default暴露一个组件，其它组件均定义为内部组件
:::

- 使用onXxx形式作为props中用于回调的属性名称

:::tip
使用统一的命名规则用以区分props中回调和非回调部分的属性，在JSX上可以清晰地看到一个组件向上和向下的逻辑交互。

对于不用于回调的函数类型的属性，使用动词作为属性名称。
:::

- 使用withXxx或xxxable形式的词作为高阶组件的名称

:::tip
高阶组件是为组件添加行为和功能的函数，因此使用如上形式的词有助于对其功能进行理解。
:::

- 作为组件方法的事件处理函数以具备业务含义的词作为名称，不使用onXxx形式命名

```js
// Good
class Form {
    @autobind
    collectAndSubmitData() {
        let data = {
            name: this.state.name,
            age: this.state.age
        };
        this.props.onSubmit(data);
    }

    @autobind
    syncName() {
        // ...
    }

    @autobind
    syncAge() {
        // ...
    }

    render() {
        return (
            <div>
                <label>姓名：<input type="text" onChange={this.syncName} /></label>
                <label>年龄：<input type="number" onChange={this.syncAge} /></label>
                <button type="button" onClick={this.collectAndSubmit}>提交</button>
            </div>
        );
    }
}
```

- 使用ES Class声明组件，禁止使用React.createClass。

- 所有组件均需声明propTypes

:::tip
propsTypes在提升组件健壮性的同时，也是一种类似组件的文档的存在，有助于代码的阅读和理解。
:::

- 对于所有非isRequired的属性，在defaultProps中声明对应的值。

:::tip
声明初始值有助于对组件初始状态的理解，也可以减少propTypes对类型进行校验产生的开销。

对于初始没有值的属性，应当声明初始值为null而非undefined。
:::

- 如无必要，使用静态属性语法声明propsTypes、contextTypes、defaultProps和state

:::tip
仅当初始state需要从props计算得到的时候，才将state的声明放在构造函数中，其它情况下均使用静态属性声明进行。
:::


- 无需显式引入React对象

:::tip
使用JSX隐式地依赖当前环境下有React这一对象，但在源码上并没有显式使用，这种情况下添加import React from 'react';会造成一个没有使用的变量存在。
:::

- 使用箭头函数声明函数组件

:::tip
箭头函数具备更简洁的语法（无需function关键字），且可以在仅有一个语句时省去return造成的额外缩进。
:::

- 高阶组件返回新的组件类型时，添加displayName属性

同时在displayName上声明高阶组件的存在。

```js
// Good
let asPureComponent = Component => {
    let componentName = Component.displayName || Component.name || 'UnknownComponent';
    return class extends PureComponent {
        static displayName = `asPure(${componentName})`

        render() {
            return <Component {...this.props} />;
        }
    };
};
```


