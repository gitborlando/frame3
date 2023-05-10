# Frame3 文档

## 配置

- 首先`yarn create vite`创建一个空的原生 ts 的项目
- 然后再`yarn add frame3 vite-plugin-frame3`
- 在 vite.config.ts 里, 先`import frame3 from vite-plugin-frame3`, 然后在 `plugin` 里添加`frame3()`
- 在 tsconfig.json 里添加`"jsx": "preserve"`和`"jsxImportSource": "frame3"` (这两个是对 tsx 进行编译和智能提示的)

## API

- ### reactive

```typescript
let a = reactive(1)
// a.value === 1
let b = reactive({ b: 123 })
// b.value === {b: 123}
let c = reactive<string>()
// type c.value === string | undefined
```

- ### reactive$

```ts
let a$ = reactive$(1)
// a$ === 1
let b$ = reactive$({ b: 123 })
// b$ === {b: 123}
let c$ = reactive$<string>()
// type c$ === string | undefined
```

- ### computed

```ts
let a = computed(() => 123)
// a.value === 123
```

- ### computed$

```ts
let a$ = computed$(() => 123)
// a$ === 123
```

- ### ref

获取 dom 或组件引用

```ts
let a = ref('div') // 传入这个是让 ts 自动推导类型
<div ref={a}></div>
// a.value === div

let b = ref(Counter) // 传入这个是让 ts 自动推导类型
<Counter ref={b}></Counter>
// b.value === Counter实例
```

- ### ref$

获取 dom 或组件引用

```ts
let a$ = ref$('div')
<div ref={a$}></div>
// a$ === div

let b$ = ref$(Counter)
<Counter ref={b$}></Counter>
// b$ === Counter实例
```

- ### effect

```ts
let a$ = 123
effect(() => {
  console.log('a$ is ', a$)
})
a$++
a$++
a$++

//a$ is 123
//a$ is 124
//a$ is 125
//a$ is 126
```

- ### 生命周期

```ts
onBeforeMount(() => {})
onMounted(() => {})
onBeforeUpdate(() => {})
onUpdated(() => {})
onBeforeUnMount(() => {})
onUnMounted(() => {})
```

- ### mount

```ts
mount(App, document.querySelector('.app'))
```

- ### h

```ts
h('button', { classes: ['btn'] }, ['click'])
// <button class="btn">click</button>
```

- ### classes 语法糖

frame3 里没有 class 和 className, 只有 classes. classes 可以传字符串和数组

```ts
<div classes={'abc'}></div>
// <div class="abc"></div>

let a$ = true
<div classes={['abc', a$ && 'cbd']}></div>
// <div class="abc cbd"></div>
```

- ### 响应式 css

```css
/* 可以使用组件内变量和theme变量, 不管是不是响应的 */
.abc {
  color: ('isError$ ? "red" : "green"');
}
```

- ### defineTheme
  全局主题

```ts
// 要调用在mount之前
defineTheme({
  color: 'red',
})
```

```css
/* 在任何css文件中使用主题 */
.abc {
  color: ('t.color');
}
```

- ### nv
  在绝大多数情况下, 带`$`变量都会被加上个`.value`, 如果不想加`.value`可以用`nv`来包裹住(nv === 'no value')

```ts
let a$ = 1
<div a={nv(a$)}></div>
```

- ### v
  手动添加 `.value`
