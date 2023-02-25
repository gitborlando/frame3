import { is } from './shared'
import { IComponentFunction, IComponentInstance, IVnodeProps } from './types'

type IKey = string | symbol
interface IEffectCallback<T = any> {
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

let currentCallback: IEffectCallback | undefined = undefined
const callbackStack: IEffectCallback[] = []
const targetObjMap = new WeakMap<object, Map<IKey, Set<IEffectCallback>>>()

function track(targetObj: object, key: IKey) {
  if (!currentCallback) return
  if (is.array(targetObj)) {
    if (key === 'length') return
    key = key === ManualTrackObjectKey ? key : 'length'
  }

  if (!targetObjMap.get(targetObj)) {
    targetObjMap.set(targetObj, new Map<IKey, Set<IEffectCallback>>())
  }
  const keyTocallbacksMap = targetObjMap.get(targetObj)!
  if (!keyTocallbacksMap?.get(key)) {
    keyTocallbacksMap.set(key, new Set<IEffectCallback>())
  }
  if (currentCallback.shouldTrack) {
    keyTocallbacksMap.get(key)!.add(currentCallback)
  }
}

const ManualTrackObjectKey = Symbol('manual-track-object-key')

export function manualTrack<T extends object>(object: T) {
  track(object, ManualTrackObjectKey)
  return object
}

function trigger(targetObj: object, key: IKey) {
  if (!targetObj.hasOwnProperty(key) || key === 'length') return
  if (is.array(targetObj)) {
    if (key === 'length') return
    key = key === ManualTrackObjectKey ? key : 'length'
  }

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

export function computed<T>(cb: IEffectCallback<T>): { value: T } {
  const result = reactive('' as T)
  effect(() => (result.value = cb()))
  return result
}

export function $computed<T>(cb: IEffectCallback<T>): T {
  return cb()
}

export function ref<K extends keyof HTMLElementTagNameMap>(value: K): { value: HTMLElementTagNameMap[K] | undefined } {
  return reactive<HTMLElementTagNameMap[K]>()
}

export function $ref<P extends IVnodeProps>(tagName: IComponentFunction<P>): IComponentInstance<P> | undefined
export function $ref<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] | undefined
export function $ref<HTMLTagName extends keyof HTMLElementTagNameMap, P extends IVnodeProps>(
  tagName: IComponentFunction<P> | HTMLTagName
) {
  return typeof tagName === 'function'
    ? $reactive<IComponentInstance<P>>()
    : $reactive<HTMLElementTagNameMap[HTMLTagName]>()
}
