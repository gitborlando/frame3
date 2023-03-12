<div align="center" >
<img src="./example/src/assets/shiyangyang.jpeg" width="350px"></img>
<div><img src="./example/src/assets/frame3.svg"></img></div>
</div>

### 介绍

- frame 取自 "framework" 的 "frame", 是我两年前写的 [frame.js](https://github.com/gitborlando/Frame) 的第三代
- frame3 只是长得像 react, 其内核还是 vue3 那套, 换句话说就是 react 的外表, vue 的内心
- 尽管原理上与 vue3 如出一辙, 但由于一些微不足道的改动, 使得实际开发还是与 vue3 有一点点不同(更好)
- 尽管 frame3 是一个可正常使用(非玩具, 支持 ts)的框架, 但其更大的作用还是作为 vue3 的 mini 版本供开发者研究其原理
- frame3 源码类型友好(几乎不用`any`), 每个函数都有 tsdoc, 部分有详细注释, 方便食用

### 体验

```bash
git clone https://github.com/gitborlando/frame3.git
cd frame3
pnpm install
cd example
npx vite
```

或者

[在线 play ground](https://stackblitz.com/edit/vite-pjko68?file=src/index.tsx)

### 例子

size.ts

```ts
import { computed$ } from 'frame3'

export let size$ = 1
export let outOfBound$ = computed$(() => size$ >= 100)

export function setSize(s: number) {
  size$ = s
}
```

counter.tsx

```ts
import { size$, outOfBound$, setSize } from './size'

export const Counter = () => {
  return (
    <div>
      <div>{!outOfBound$ ? size$ : 'out of bound'}</div>
      <button onClick={() => setSize(size$ + 1)}>+</button>
    </div>
  )
}
```

### 疑问

相信看了上面的例子你肯定已经似懂非懂了. 写法上和 react 是一摸一样的, 然后从 api 上看得出一丢丢 vue3 的影子. 就是为啥:

- 直接给变量赋值就能触发更新
- 这满屏的带 `$` 的变量是啥意思
- 如果是基于 `Proxy API`, 为啥 import 不会丢失响应式

答案就是:

frame3 在编译时**除了几种特殊情况, 会给每个带 `$` 的变量加上一个`.value`**, 除了:

- 变量声明时不加
- import, export 不加
- 是对象的健时不加
- .....等等其他情况

你以为用的是基本值, 其实它是个对象, 例如以上例子编译后会变为

```ts
// size.ts
import { reactive, computed } from 'frame3'

export let size$ = reactive(1)
export let outOfBound$ = computed(() => size$.value >= 100)

export function setSize(s: number) {
  size$.value = s
}

// counter.tsx
import { size$, outOfBound$, setSize } from './size'

interface IProps {}

export const Counter = ({}: IProps) => {
  return () => (
    <div>
      <div>{!outOfBound$.value ? size$.value : 'out of bound'}</div>
      <button onClick={() => setSize(size$.value + 1)}>+</button>
    </div>
  )
}
```

所以很明显, frame3 就是靠 `Proxy API` 来实现响应式的

而所有带`$`的变量, 不管是什么类型, 都会被编译成这样`{ value: xxx }`的对象

免得开发者手动加`.value`, 也不用担心任何 import 或解构赋值啥的会失去响应式的问题, 根本不用考虑 `toRefs` 等心智负担

### CSS

你以为这就完了? frame3 甚至还能让 css 变响应式

```css
div {
  width: ('70 * (size$ * 0.2 + 1.5)') px;
  height: ('20 * (size$ * 0.2 + 1.5)') px;
  border-radius: 5px;
  border: 1px solid rgb(0, 0, 0, 0.5);
}
```

frame3 也会编译组件引入的 css 文件, 会把每个带有`(xx)或('xx')`的声明 (xx 必须是合法的 js 表达式) 提取出来, 编译成类似这样

```ts
// 这是简化版
effect(() => {
  style.innerHTML = `
    .div {
      width: `${70 * (size$.value * 0.2 + 1.5)}` px
    } `
})
```

插入到组件代码中, 只要其依赖的响应式变量变了, 就会修改`style`标签内容, 实现样式更新.

其余部分仍保持原样不改动, 并且在编译过程中还会给每个选择器添加`scope`, 实现组件样式隔离

### 文档

[文档](https://gitborlando.github.io/blog/#frame3doc)

### 用户

现在还只有我自己(frame3 的文档和我自己的博客是用 frame3 写的)

### 指南

源码阅读指南 :

- 阅读顺序: vnode.ts -> render-dom.ts -> component.ts -> reactive.ts -> scheduler.ts
- 整个源码几乎没有行内注释, 而是由函数及类型声明上的 tsdoc 来替代
- 阅读时可以将鼠标移到变量名上, 会很详细的解释这个变量或者函数有什么作用
- 注: frame3 有些地方具体实现和 vue3 及各种 mini 版不同, 而变量命名则完全不同, 以及由于使用的是 jsx, 所以并没有模板编译部分, 不过这对理解 vue3 原理及其运行流程并无影响, 甚至可能更有帮助

框架使用指南 :

- 首先`yarn create vite`创建一个空的原生 ts 的项目 (没用过 vite 的先去学下 vite)
- 然后再`yarn add frame3 vite-plugin-frame3`
- 在 vite.config.ts 的 plugin 里添加`frame3()` (啥名都行, 反正是默认导出)
- 在 tsconfig.json 里添加`"jsx": "preserve"`和`"jsxImportSource": "frame3"` (这两个是对 tsx 进行编译和智能提示的)
- api 的使用去看文档就行 (其实不用看文档都行, 看两个示例就懂了)

如果有任何问题欢迎提 issue

### 初衷

之所以写这个框架, 是因为

- 之前曾尝试直接看 vue3 源码, 发现根本看不懂(太多兼容性代码, 无从下手)
- 于是转向一些专供研究的 mini 版, 发现少了兼容性代码, 流程上清晰许多
- 但这些 mini 版本仍然是缺少有效注释(该注的不注), 各种`any`类型, 一运行 demo 就 bug 报错满天飞
- 于是 frame3 就在这种环境下诞生了, 目的很明确, 就是: 至少能正常使用, 然后对 ts 类型友好, 尽量使代码好读
- 但 frame3 显然不止于此, 正如上面例子, 它也有属于自己的特色(类 react 函数组件写法, 无需手动加`.value`, 响应式 css 等)
- 这些特色可能会给开发者带来更友好的开发体验, 但肯定的是, 这些特色使得 frame3 成为 frame3, 而不是又一个 vue3 mini 版

### 最后

欢迎提 issue, 欢迎 pull request, 当然如果你有什么不太重要的新项目, 可以试试 frame3 哦.
