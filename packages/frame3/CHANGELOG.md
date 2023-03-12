# frame3

## 1.2.0

### Minor Changes

- 将响应式标志 $ 移至变量尾部, 特殊处理 jsx 里的 style-xxx, 还有其他一些细小优化

### Patch Changes

- Updated dependencies
  - frame3-compiler-sfc@1.2.0
  - frame3-runtime-core@1.2.0

## 1.1.11

### Patch Changes

- 修复重复加 scope-id
- Updated dependencies
  - frame3-compiler-sfc@1.1.7

## 1.1.10

### Patch Changes

- return 不加.value && 新增 v()手动加.value
- Updated dependencies
  - frame3-compiler-sfc@1.1.6
  - frame3-runtime-core@1.1.9

## 1.1.9

### Patch Changes

- 修复类名重复添加
- Updated dependencies
  - frame3-runtime-core@1.1.8

## 1.1.8

### Patch Changes

- 添加 classes 语法糖
- Updated dependencies
  - frame3-runtime-core@1.1.7

## 1.1.7

### Patch Changes

- 添加配置 css 主题 api 以及修复嵌套组件渲染异常
- Updated dependencies
  - frame3-compiler-sfc@1.1.5
  - frame3-runtime-core@1.1.6

## 1.1.6

### Patch Changes

- 增加跳过 css 解析的选项以及当$xx 是 jsx 的 ref 里的值时不加.value
- Updated dependencies
  - frame3-compiler-sfc@1.1.4

## 1.1.5

### Patch Changes

- 修复对添加.value 的判定
- Updated dependencies
  - frame3-compiler-sfc@1.1.3
  - frame3-runtime-core@1.1.5

## 1.1.4

### Patch Changes

- 添加并完善 tsdoc
- Updated dependencies
  - frame3-compiler-sfc@1.1.2
  - frame3-runtime-core@1.1.4

## 1.1.3

### Patch Changes

- 修复了一些使用体验的问题
- Updated dependencies
  - frame3-compiler-sfc@1.1.1
  - frame3-runtime-core@1.1.3

## 1.1.2

### Patch Changes

- 修复父子组件 css 穿透问题
- Updated dependencies
  - frame3-runtime-core@1.1.2

## 1.1.1

### Patch Changes

- 修复 fragment 节点插入错误 bug
- Updated dependencies
  - frame3-runtime-core@1.1.1

## 1.1.0

### Minor Changes

- 22affd6: 更改包名

### Patch Changes

- Updated dependencies [22affd6]
  - frame3-compiler-sfc@1.1.0
  - frame3-runtime-core@1.1.0

## 1.0.4

### Patch Changes

- version 1.0.4
- Updated dependencies
  - @frame3/compiler-sfc@1.0.4
  - @frame3/runtime-core@1.0.4
