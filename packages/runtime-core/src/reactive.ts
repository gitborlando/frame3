import { queueScheduler } from './scheduler'
import { is } from './shared'
import { IComponentFunction, IComponentInstance, IEffectCallback } from './types'

type IKey = string | symbol

export function reactive<T>(value: T): { value: T }
export function reactive<T = any>(): { value: T | undefined }
export function reactive(value?: unknown) {
  return (function makeReactive<O extends object>(obj: O): O {
    return new Proxy<O>(obj, {
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

let currentEffectCallback: IEffectCallback | undefined = undefined
const effectCallbackStack: IEffectCallback[] = []
const targetObjMap = new WeakMap<object, Map<IKey, Set<IEffectCallback>>>()

function track(targetObj: object, key: IKey) {
  if (!currentEffectCallback) return
  if (is.array(targetObj)) {
    if (key === 'length') return
    key = key === ManualTrackObjectKey ? key : 'length'
  }

  if (!targetObjMap.get(targetObj)) {
    targetObjMap.set(targetObj, new Map<IKey, Set<IEffectCallback>>())
  }
  const keyToCallbacksMap = targetObjMap.get(targetObj)!
  if (!keyToCallbacksMap?.get(key)) {
    keyToCallbacksMap.set(key, new Set<IEffectCallback>())
  }
  keyToCallbacksMap.get(key)!.add(currentEffectCallback)
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

  const keyToCallbacksMap = targetObjMap.get(targetObj)
  const callbacks = keyToCallbacksMap?.get(key)
  callbacks?.forEach((callback) => {
    if (callback === currentEffectCallback) return
    callback.scheduler ? callback.scheduler(callback) : callback()
  })
}

export function effect<P extends Record<string, any> & { scheduler?: Function }>(
  callback: (props?: P) => any,
  props?: P
) {
  const effectCallback: IEffectCallback = Object.assign(
    () => {
      try {
        if (!effectCallback.active) return

        effectCallbackStack.push((currentEffectCallback = effectCallback))
        callback(props)
      } finally {
        effectCallbackStack.pop()
        currentEffectCallback = effectCallbackStack.slice(-1)[0]
      }
    },
    { active: true, scheduler: props?.scheduler || queueScheduler }
  )
  effectCallback()
  return effectCallback
}

export function computed<T>(cb: () => T): { value: T } {
  const result = reactive('' as T)
  effect(() => (result.value = cb()))
  return result
}

export function $computed<T>(cb: () => T): T {
  return cb()
}

export function ref(tagName: IComponentFunction): { value: IComponentInstance | undefined }
export function ref<K extends keyof HTMLElementTagNameMap>(tagName: K): { value: HTMLElementTagNameMap[K] | undefined }
export function ref<HTMLTagName extends keyof HTMLElementTagNameMap>(tagName: IComponentFunction | HTMLTagName) {
  return typeof tagName === 'function' ? reactive<IComponentInstance>() : reactive<HTMLElementTagNameMap[HTMLTagName]>()
}

export function $ref(tagName: IComponentFunction): IComponentInstance | undefined
export function $ref<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] | undefined
export function $ref<HTMLTagName extends keyof HTMLElementTagNameMap>(tagName: IComponentFunction | HTMLTagName) {
  return typeof tagName === 'function'
    ? $reactive<IComponentInstance>()
    : $reactive<HTMLElementTagNameMap[HTMLTagName]>()
}
