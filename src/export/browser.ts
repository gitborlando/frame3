import { polyfillProcessAndBuffer } from '../shared/process-buffer-polyfill'
import { parseSFC } from '../parse-sfc'

export * from '../runtime'

polyfillProcessAndBuffer()

const script = document.querySelector('[type="module"]') as HTMLScriptElement
const styles = [...document.querySelectorAll('style')]

const jsSource = `<script>${script.innerHTML}</script>`
const cssSource = `<style>${styles.map((style) => style.innerHTML).join(';')}</style>`

parseSFC.config({
  importApiFrom: script.src.replace('browser.js', 'module.js'),
})
const js = parseSFC([jsSource, cssSource])
const newScript = document.createElement('script')

newScript.innerHTML = js
newScript.type = 'module'
document.body.insertAdjacentElement('beforeend', newScript)

script.remove()
styles.forEach((style) => style.remove())