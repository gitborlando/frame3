type IKey = string | symbol
type ICallback = () => void
type IObject = Record<IKey, any>

const targetObjMap = new WeakMap<object, Set<ICallback> | Map<IKey, Set<ICallback>>>()
let currentCallback: ICallback | null

export function reactive<Val>(value: Val): { value: Val } {
  return (function makeReactive<Obj extends IObject>(obj: Obj): Obj {
    return new Proxy<Obj>(obj, {
      get(target, key) {
        record(target, key)
        const gotValue = Reflect.get(target, key)
        return typeof gotValue === 'object' ? makeReactive(gotValue as object) : gotValue
      },
      set(target, key, value) {
        Reflect.set(target, key, value)
        trigger(target, key)
        return true
      },
    })
  })({ value })
}

export function effect(cb: ICallback) {
  currentCallback = cb
  const res = cb()
  currentCallback = null
  return res
}

export function computed<T extends any>(cb: () => T): { value: T } {
  const result = reactive(undefined as T)
  effect(() => (result.value = cb()))
  return result
}

function record(targetObj: IObject, key: IKey) {
  if (!currentCallback) return

  const orArray = Array.isArray(targetObj) ? targetObj : Array.isArray(targetObj[key]) ? targetObj[key] : null
  if (orArray) {
    if (!targetObjMap.get(orArray)) {
      targetObjMap.set(orArray, new Set<ICallback>())
    }
    const callbacks = targetObjMap.get(orArray) as Set<ICallback>
    return callbacks.add(currentCallback)
  }

  if (!targetObjMap.get(targetObj)) {
    targetObjMap.set(targetObj, new Map<IKey, Set<ICallback>>())
  }
  const keyTocallbacksMap = targetObjMap.get(targetObj) as Map<IKey, Set<ICallback>>
  if (!keyTocallbacksMap.get(key)) {
    keyTocallbacksMap.set(key, new Set<ICallback>())
  }
  keyTocallbacksMap.get(key)!.add(currentCallback)
}

function trigger(targetObj: IObject, key: IKey) {
  if (key === 'length' || !targetObj.hasOwnProperty(key)) return

  if (Array.isArray(targetObj)) {
    const array = targetObj
    const callbacks = targetObjMap.get(array) as Set<ICallback> | undefined
    callbacks?.forEach((callback) => callback())
  } else {
    const keyTocallbacksMap = targetObjMap.get(targetObj) as Map<IKey, Set<ICallback>> | undefined
    keyTocallbacksMap?.get(key)?.forEach((callback) => callback())
  }
}
