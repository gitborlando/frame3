import { format } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import { parseCss } from './parse-css'
import { cssParsers, parseJs } from './parse-js'
import { uuid } from './shared'

export let scopeId = uuid()

export function parseSFC(sfcSource: string) {
  const [jsSource, cssCource] = getJsAndCssFromSFC(sfcSource)
  cssParsers.push(() => parseCss(cssCource))
  const js = parseJs(jsSource)
  return format(js, { parser: 'babel', plugins: [parserBabel] })
}

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
