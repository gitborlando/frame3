import { format } from 'prettier'
import { parseCss } from './parse-css'
import { parseJsHooks, parseJs } from './parse-js'
import { init, parseState, uuid } from './shared'
import parserBabel from 'prettier/parser-babel'

export let scopeId = uuid()

export function parseSFC(sfcSource: string): string
export function parseSFC(sfcSource: { js: string; css: string }): string
export function parseSFC(sfcSource: string | { js: string; css: string }) {
  init()
  scopeId = uuid()
  parseJsHooks.length = 0

  const [jsSource, cssCource] =
    typeof sfcSource === 'object' ? [sfcSource.js, sfcSource.css] : getJsAndCssFromSFC(sfcSource)

  parseJsHooks.push(() => parseCss(cssCource))
  return format(parseJs(jsSource), { parser: 'babel', plugins: [parserBabel] })
}

parseSFC.setImportApiFrom = (importApiFrom: string) => (parseState.importApiFrom = importApiFrom)

function getJsAndCssFromSFC(sfcSource: string) {
  let [js, css, char, inScript, inStyle] = ['', '', '', false, false]
  for (let i = 0; i < sfcSource.length; i++) {
    char = sfcSource[i]
    if (char === '<' && sfcSource.slice(i + 1, i + 9) === '/script>') inScript = false
    if (char === '<' && sfcSource.slice(i + 1, i + 8) === '/style>') inStyle = false
    if (inScript) js += char
    if (inStyle) css += char
    if (char === '>' && sfcSource.slice(i - 7, i) === '<script') inScript = true
    if (char === '>' && sfcSource.slice(i - 6, i) === '<style') inStyle = true
  }
  return [js, css]
}
