const effectQueue = new Set<() => void>()
const promiseResolve = Promise.resolve()
let tickStatus: 'Entered a Tick' | 'Leaved a Tick' = 'Leaved a Tick'
let currentPromiseResolve: Promise<any> | null = null

export function nextTick(callback: () => void) {
  const resolve = currentPromiseResolve || promiseResolve
  return callback ? resolve.then(callback) : resolve
}

export function queueScheduler(effect: () => void) {
  if (effectQueue.has(effect)) return
  effectQueue.add(effect)
  effectQueueAddedToTickMicrotasks()
}

function effectQueueAddedToTickMicrotasks() {
  if (tickStatus === 'Entered a Tick') return
  currentPromiseResolve = promiseResolve.then(runAllEffectsInOneTick)
  tickStatus = 'Entered a Tick'
}

function runAllEffectsInOneTick() {
  try {
    effectQueue.forEach((effect) => effect())
  } finally {
    tickStatus = 'Leaved a Tick'
    effectQueue.clear()
    currentPromiseResolve = null
  }
}
