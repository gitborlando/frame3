import { additionalJsTexts, parseCss, parseJs } from './parse'
import { runningEnv } from './utils'

export const NAME = 'frame'

export * from './core'
export * from './parse'

runningEnv === 'browser' &&
  (window.onload = () => {
    const script = document.querySelector('[type="text/babel"]')
    if (!script) return

    const parsedJs = parseJs(script.innerHTML)

    const styles = document.querySelectorAll('style[reactive]')
    styles.forEach((style) => {
      const newStyle = document.createElement('style')
      newStyle.innerHTML = parseCss(style.innerHTML)
      style.replaceWith(newStyle)
    })

    const newScript = document.createElement('script')
    newScript.innerHTML = parsedJs + additionalJsTexts.join(';')
    script.replaceWith(newScript)
  })
