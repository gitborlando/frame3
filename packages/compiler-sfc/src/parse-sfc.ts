import { format } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import { parseCss } from './parse-css'
import { parseJs } from './parse-js'
import { init, parseConfig, parseJsHooks, uuid } from './shared'

export let scopeId = uuid()

export function parseSFC([jsSource, cssSource]: [string, string]) {
  init()
  scopeId = uuid()
  parseJsHooks.push(() => parseCss(cssSource))
  let js = parseJs(jsSource)
  js = format(js, { parser: 'babel', plugins: [parserBabel] })
  return js
}

parseSFC.config = ({ importApiFrom, isSFC }: { importApiFrom?: string; isSFC?: boolean }) => {
  importApiFrom && (parseConfig.importApiFrom = importApiFrom)
  parseConfig.isSFC = !!isSFC
}
