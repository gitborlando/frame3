import { is } from './shared'

type IKey = string | symbol
interface ICallback<T = any> {
  (): T
  isFirstRun: boolean
  shouldTrack: boolean
  scheduler?: Function
}

export function reactive<T>(value: T): { value: T }
export function reactive<T = any>(): { value: T | undefined }
export function reactive(value?: unknown) {
  return (function makeReactive<Obj extends object>(obj: Obj): Obj {
    return new Proxy<Obj>(obj, {
      get(target, key) {
        track(target, key)
        const gotValue = Reflect.get(target, key)
        return typeof gotValue === 'object' ? makeReactive(gotValue as object) : gotValue
      },
      set(target, key, value) {
        Reflect.set(target, key, value)
        trigger(target, key)
        trigger(target, ManualTrackObjectKey)
        return true
      },
    })
  })({ value })
}

export function $reactive<T>(value: T): T
export function $reactive<T = any>(): T | undefined
export function $reactive(value?: unknown) {
  return value
}

let currentCallback: ICallback | undefined = undefined
const callbackStack: ICallback[] = []
const targetObjMap = new WeakMap<object, Map<IKey, Set<ICallback>>>()

function track(targetObj: object, key: IKey) {
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

const ManualTrackObjectKey = Symbol('manual-track-object-key')

export function $track<T extends object>(object: T) {
  track(object, ManualTrackObjectKey)
  return object
}

function trigger(targetObj: object, key: IKey) {
  if (!targetObj.hasOwnProperty(key)) return
  if (is.array(targetObj) && key === 'length') return
  else key = 'length'

  const keyTocallbacksMap = targetObjMap.get(targetObj)
  const callbacks = keyTocallbacksMap?.get(key)
  callbacks?.forEach((callback) => callback())
}

export function effect<R, P extends object & { scheduler: Function }>(effectCallback: (props?: P) => R, props?: P) {
  const callback = Object.assign(
    () => {
      try {
        callbackStack.push((currentCallback = callback))
        const parentCallback = callbackStack.slice(-2, -1)[0]
        if (parentCallback && !parentCallback.isFirstRun) {
          currentCallback.shouldTrack = false
          return
        }
        effectCallback(props)
        currentCallback.isFirstRun = false
      } finally {
        callbackStack.pop()
        currentCallback = callbackStack.slice(-1)[0]
      }
    },
    { isFirstRun: true, shouldTrack: true, scheduler: props?.scheduler }
  )
  callback()
}

export function computed<T>(cb: ICallback<T>): { value: T } {
  const result = reactive('' as T)
  effect(() => (result.value = cb()))
  return result
}

export function $computed<T>(cb: ICallback<T>): T {
  return cb()
}
