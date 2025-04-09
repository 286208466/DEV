### 问题描述
我最近开始使用 Next.js 制作网站，并且我一直将 Image 和 img 混合用于各种用例.

我知道 Image 内置于 Next.js 并且是更好的选择，但有些场景我不知道大小或比例我正在加载的图像，因此 img 似乎更适合.

在我最近的项目中，这是我的 npm run build 命令第一次失败:

```
1:7  Error: Do not use <img>. Use Image from 'next/image' instead. See https://nextjs.org/docs/messages/no-img-element.
```

### 解决方式
这是由于新的 Next.js 版本，它将 ESLint 与其自己的一套规则集成在一起，以强制执行 .您的其他项目不会失败，因为您可能没有使用 Next.js v11，或者他们可能有自己的 ESLint 配置，而您没有扩展 next.参考:nextjs.org/docs/basic-features/eslint

您可以通过以下方式在构建过程中忽略掉毛:

```js title=next.config.js
module.export = {
    eslint: {ignoreDuringBuilds: true}
}
```
