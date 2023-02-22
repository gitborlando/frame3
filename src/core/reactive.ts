import { is } from '../shared/utils'

type IKey = string | symbol
type IObject = Record<IKey, any>
interface ICallback<T = any> {
  (): T
  isFirstRun: boolean
  shouldTrack: boolean
  scheduler?: Function
}

export function reactive<T>(value?: T): { value: T | undefined } {
  return (function makeReactive<Obj extends IObject>(obj: Obj): Obj {
    return new Proxy<Obj>(obj, {
      get(target, key) {
        track(target, key)
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

let currentCallback: ICallback | undefined = undefined
const callbackStack: ICallback[] = []
const targetObjMap = new WeakMap<object, Map<IKey, Set<ICallback>>>()

function track(targetObj: IObject, key: IKey) {
  if (!currentCallback) return
  if (is.array(targetObj)) key = 'length'

  if (!targetObjMap.get(targetObj)) {
    targetObjMap.set(targetObj, new Map<IKey, Set<ICallback>>())
  }
  const keyTocallbacksMap = targetObjMap.get(targetObj)!
  if (!keyTocallbacksMap?.get(key)) {
    keyTocallbacksMap.set(key, new Set<ICallback>())
  }
  if (currentCallback.shouldTrack) {
    keyTocallbacksMap.get(key)!.add(currentCallback)
  }
}

function trigger(targetObj: IObject, key: IKey) {
  if (!targetObj.hasOwnProperty(key)) return
  if (is.array(targetObj)) key = 'length'

  const keyTocallbacksMap = targetObjMap.get(targetObj)
  const callbacks = keyTocallbacksMap?.get(key)
  callbacks?.forEach((callback) => callback())
}

export function effect<R, P extends IObject = IObject>(effectFunction: (props?: P) => R, props?: P) {
  const callback = () => {
    try {
      currentCallback = callback
      callbackStack.push(currentCallback)
      const prevCallback = callbackStack[callbackStack.length - 2]
      if (currentCallback.isFirstRun && prevCallback && !prevCallback.isFirstRun) {
        currentCallback.shouldTrack = false
        return
      }
      effectFunction(props)
      currentCallback.isFirstRun = false
    } finally {
      callbackStack.pop()
      currentCallback = callbackStack[callbackStack.length - 1]
    }
  }

  callback.isFirstRun = true
  callback.shouldTrack = true
  callback.scheduler = props?.scheduler
  callback()
  return callback
}

export function computed<T>(cb: ICallback<T>) {
  const result = reactive()
  effect(() => (result.value = cb()))
  return result
}
