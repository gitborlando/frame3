import { parseCss } from './parse-css'
import { parseJs } from './parse-js'
import { init, parseConfig, parseJsHooks, uuid } from './shared'

export let scopeId = uuid()

export function parseSFC([jsSource, cssCource]: [string, string]) {
  init()
  scopeId = uuid()
  parseJsHooks.push(() => parseCss(cssCource))
  const js = parseJs(jsSource)
  return js
}

parseSFC.config = ({ importApiFrom, isSFC }: { importApiFrom?: string; isSFC?: boolean }) => {
  importApiFrom && (parseConfig.importApiFrom = importApiFrom)
  parseConfig.isSFC = !!isSFC
}
