import { parseJs } from './parse'
import { runningEnv } from './utils'

export * from './core'
export * from './parse'

runningEnv === 'browser' &&
  (window.onload = () => {
    const script = document.querySelector('[type="text/babel"]')!
    const newScript = document.createElement('script')
    newScript.innerHTML = parseJs(script.innerHTML)
    script.replaceWith(newScript)
  })
