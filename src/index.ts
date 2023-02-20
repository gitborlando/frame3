import { processAndBufferPolyfill } from './shared/process-buffer-polyfill'
import { parseSFC } from './parse'
import { isBrowser } from './shared/utils'

export { mount, h, reactive, computed, effect } from './core'
export { parseSFC }

processAndBufferPolyfill()

isBrowser() &&
  (window.onload = () => {
    const scripts = [...document.querySelectorAll('[type="text/babel"]')]
    const styles = [...document.querySelectorAll('style')]
    const jsSource = `<script>${scripts.map((script) => script.innerHTML).join(';')}</script>`
    const cssSource = `<style>${styles.map((style) => style.innerHTML).join(';')}</style>`
    scripts.forEach((script) => script.remove())
    styles.forEach((style) => style.remove())
    const js = parseSFC(jsSource + cssSource)
    const script = document.createElement('script')
    script.innerHTML = js
    document.body.insertAdjacentElement('beforeend', script)
  })
