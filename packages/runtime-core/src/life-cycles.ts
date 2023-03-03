import { IComponentInstance, ILifeCycleTypes, LifeCycle } from './types'

let currentComponentInstance: IComponentInstance | null = null

/**
 * 在每次组件函数执行时都设置当前的组件实例, 以便生命周期hooks执行时能将其回调加入到当前组件上
 */
export function setCurrentComponentInstance(componentInstance: IComponentInstance | null) {
  currentComponentInstance = componentInstance
}

/**
 * 返回一个对象, 键为生命周期类型, 值为空Set对象
 */
export function initLifeCycles() {
  return Object.fromEntries(Object.keys(LifeCycle).map((key) => [key, new Set()])) as IComponentInstance['lifeCycles']
}

/**
 * 执行组件实例上的生命周期回调
 */
export function implementLifeCycles(componentInstance: IComponentInstance) {
  return (type: ILifeCycleTypes) => componentInstance.lifeCycles[type].forEach((callback) => callback())
}

export function onBeforeMount(callbacks: Function) {
  injectLifeCycle('beforeMount', callbacks)
}
export function onMounted(callbacks: Function) {
  injectLifeCycle('mounted', callbacks)
}
export function onBeforeUpdate(callbacks: Function) {
  injectLifeCycle('beforeUpdate', callbacks)
}
export function onUpdated(callbacks: Function) {
  injectLifeCycle('updated', callbacks)
}
export function onBeforeUnMount(callbacks: Function) {
  injectLifeCycle('beforeUnMount', callbacks)
}
export function onUnMounted(callbacks: Function) {
  injectLifeCycle('unMounted', callbacks)
}

/**
 * 在组建实例的lifecycle对象上加入某一类型的生命周期回调
 */
function injectLifeCycle(type: ILifeCycleTypes, callbacks: Function) {
  currentComponentInstance?.lifeCycles[type].add(callbacks)
}
