```ts
export function effect<T>(cb: ICallback<T>, lastState?: Record<string, any>) {
  currentCallback = () => cb(lastState)
  const res = currentCallback(lastState)
  currentCallback = null
  return res
}
```

```ts
export function effect(fn, option = {}) {
  const effectFn = () => {
    try {
      effectStack.push(effectFn)
      activeEffect = effectFn
      return fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  if (!option.lazy) {
    effectFn()
  }
  effectFn.scheduler = option.scheduler
  return effectFn
}

// effectFn.scheduler(effectFn)
```

```ts
const a = frame3.reactive({ num1: 10, num2: 20 })

frame3.effect(() => {
  frame3.effect(() => {
    console.log(`a.num2: ${a.value.num2}`)
  })
  console.log(`a.num1: ${a.value.num1}`)
})
```
