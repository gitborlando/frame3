/**
 * 所谓一个tick是指浏览器的一个渲染帧, 可以近似理解为时长为16ms的一个间隔, 就是说一般一秒内会有60个tick
 */

const effectQueue = new Set<() => void>()
const promiseResolve = Promise.resolve()
let tickStatus: 'this tick has added' | 'is next tick can add' = 'is next tick can add'
let currentPromiseResolve: Promise<any> | null = null

/**
 * 把回调放在微任务里执行
 */
export function nextTick(callback: () => void) {
  const resolve = currentPromiseResolve || promiseResolve
  return callback ? resolve.then(callback) : resolve
}

/**
 * 把effect回调添加到队列里, 然后再浏览器执行微任务时去统一执行
 */
export function queueScheduler(effect: () => void) {
  if (effectQueue.has(effect)) return
  effectQueue.add(effect)
  effectQueueAddedToTickMicrotasks()
}

/**
 * 在一个tick内只会把`runAllEffectsInOneTick`添加到微任务里一次,
 * 但每一个tick都会把`runAllEffectsInOneTick`添加到微任务里一次
 */
function effectQueueAddedToTickMicrotasks() {
  if (tickStatus === 'this tick has added') return
  currentPromiseResolve = promiseResolve.then(runAllEffectsInOneTick)
  tickStatus = 'this tick has added'
}

/**
 * 清空执行队列里的回调, 全部执行完后将当前tick状态设为可添加
 */
function runAllEffectsInOneTick() {
  try {
    effectQueue.forEach((effect) => effect())
  } finally {
    tickStatus = 'is next tick can add'
    effectQueue.clear()
    currentPromiseResolve = null
  }
}
