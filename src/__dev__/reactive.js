//reactive.js

//effect函数的实现
let activeEffect = null
function effect(cb) {
  activeEffect = cb
  const res = cb()
  activeEffect = null
  return res
}

function computed(cb) {
  const res = reactive({ value: 0 })
  effect(() => (res.value = cb()))
  return res
}

//创建响应式变量函数
function reactive(obj) {
  const handler = {
    get(target, propKey, receiver) {
      track(target, propKey) //依赖收集
      const val = Reflect.get(...arguments) //读取数据

      if (typeof val === 'object') {
        return reactive(val)
      }
      return val
    },
    set(target, propKey, newVal, receiver) {
      const success = Reflect.set(...arguments) //设置数据,返回true/false

      trigger(target, propKey) //触发更新

      return success
    },
  }
  const proxyObj = new Proxy(obj, handler)
  return proxyObj
}

//依赖收集函数
const targetMap = new WeakMap() //储存映射关系的结构
function track(target, property) {
  if (!activeEffect) return

  let depsMap
  let dep

  const orArray = Array.isArray(target) ? target : Array.isArray(target[property]) ? target[property] : null
  if (orArray) {
    dep = targetMap.get(orArray)
    if (!dep) {
      targetMap.set(orArray, (dep = new Set()))
    }
    return dep.add(activeEffect)
  }

  depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  dep = depsMap.get(property)
  if (!dep) {
    depsMap.set(property, (dep = new Set()))
  }
  dep.add(activeEffect) //添加属性对应的effect进映射结构
}

//派发更新函数
function trigger(target, property) {
  if (property === 'length') return
  let depsMap
  let dep

  if (Array.isArray(target)) {
    dep = targetMap.get(target)
    if (!dep) return
    return dep.forEach((effect) => effect())
  }

  depsMap = targetMap.get(target)
  console.log(target, targetMap, depsMap)
  if (!depsMap) return

  dep = depsMap.get(property)
  if (!dep) return
  dep.forEach((effect) => effect())
}

let obj = reactive({ value: 1 })
let sum = 0

const a = computed(() => obj.value * 2)

effect(() => console.log('a =>', a.value))

obj.value++
obj.value++

// obj.son.num3.shift()
