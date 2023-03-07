import { queueScheduler } from './scheduler'
import { is } from './shared'
import { IComponentFunction, IComponentInstance, IEffectCallback } from './types'

type IKey = string | symbol

/**
 * 不管啥入参, 返回的都是一个`{value: xxx}`的对象, 如果入参是对象则还会递归代理
 *
 * 这个函数原理没啥好解释的, 不懂得建议先去学习下es6 Proxy的用法
 */
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

/**
 * 这个函数主要是用于欺骗ts编译器. 因为frame3会自动给每个带`$`的变量加`.value`, 所以在实际使用过程中,
 * 即使我们非常清楚其是个对象, 但ts编译器并不知道, 所以要用一点"障眼法"来避免报错. 也就是说, 用`reactive`
 * 需要手动加`.value`, 而`$reactive`不用. 后面的`$computed`, `$ref`同理
 */
export function $reactive<T>(value: T): T
export function $reactive<T = any>(): T | undefined
export function $reactive(value?: unknown) {
  return value
}

let currentEffectCallback: IEffectCallback | undefined = undefined
/** 用来存储已经碰到的effect, 用于effect嵌套调用的情况 */
const effectCallbackStack: IEffectCallback[] = []
const targetObjMap = new WeakMap<object, Map<IKey, Set<IEffectCallback>>>()

/**
 * 将当前的effect回调加入到触发set的key的回调队列里
 * @param targetObj 触发set的对象
 * @param key 触发set的键
 */
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

/**
 * 从回调队列里拿出effect回调去执行, 如果有调度器就放调度器里执行
 * @param targetObj 触发set的对象
 * @param key 触发set的键
 */
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

/**
 * effect执行原理是: 先包装业务回调, 包装好后赋值给currentEffectCallback, 之后如果业务回调执行触发了变量的get,
 * 那就把currentEffectCallback添加到该变量的effect回调队列里, 之后如果该变量触发set, 就把effect回调从回调队列里拿出来执行
 * @param callback 业务回调
 * @param props 传入的自定义props, 可作为业务回调的参数
 * @returns 返回包装好的业务回调
 */
export function effect<P extends Record<string, any> & { scheduler?: Function }>(
  callback: (props?: P) => any,
  props?: P
) {
  // 包装业务回调, 加上active和scheduler属性
  const effectCallback: IEffectCallback = Object.assign(
    () => {
      // 放在try里是怕用户代码报错
      try {
        // 失效就返回
        if (!effectCallback.active) return
        // 每次执行都把自己加入到栈中, 并设置为当前的回调
        effectCallbackStack.push((currentEffectCallback = effectCallback))
        // 执行业务回调
        callback(props)
        // 不懂这个finally的自行学习
      } finally {
        // 执行完就弹出
        effectCallbackStack.pop()
        // 将当前回调设为栈里的最后一个
        currentEffectCallback = effectCallbackStack.slice(-1)[0]
      }
    },
    { active: true, scheduler: props?.scheduler || queueScheduler }
  )
  effectCallback()
  return effectCallback
}

/**
 * 这个不解释了, 懂了effect原理这个自然懂
 */
export function computed<T>(callback: () => T): { value: T } {
  const result = reactive('' as T)
  effect(() => (result.value = callback()))
  return result
}

/** 转到$reactive */
export function $computed<T>(cb: () => T): T {
  return cb()
}

/**
 * 获取dom或组件引用
 */
export function ref(tagName: IComponentFunction): { value: IComponentInstance | undefined }
export function ref<K extends keyof HTMLElementTagNameMap>(tagName: K): { value: HTMLElementTagNameMap[K] | undefined }
export function ref<HTMLTagName extends keyof HTMLElementTagNameMap>(tagName: IComponentFunction | HTMLTagName) {
  return typeof tagName === 'function' ? reactive<IComponentInstance>() : reactive<HTMLElementTagNameMap[HTMLTagName]>()
}

/** 转到$reactive */
export function $ref(tagName: IComponentFunction): IComponentInstance | undefined
export function $ref<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] | undefined
export function $ref<HTMLTagName extends keyof HTMLElementTagNameMap>(tagName: IComponentFunction | HTMLTagName) {
  return typeof tagName === 'function'
    ? $reactive<IComponentInstance>()
    : $reactive<HTMLElementTagNameMap[HTMLTagName]>()
}

export function v<T>(reactiver: T) {
  return (reactiver as unknown as any).value as T
}

export function nv<T>(value: T) {
  return value
}
