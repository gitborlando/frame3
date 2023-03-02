import { IComponentInstance, ILifeCycleTypes, LifeCycle } from './types'

let currentComponentInstance: IComponentInstance | null = null

export function setCurrentComponentInstance(componentInstance: IComponentInstance | null) {
  currentComponentInstance = componentInstance
}

export function initLifeCycles() {
  return Object.fromEntries(Object.keys(LifeCycle).map((key) => [key, new Set()])) as IComponentInstance['lifeCycles']
}

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

function injectLifeCycle(type: ILifeCycleTypes, callbacks: Function) {
  currentComponentInstance?.lifeCycles[type].add(callbacks)
}
