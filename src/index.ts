import { parseJs } from './parse'

export * from './core'
export * from './parse'

const js = `
ref: a = 456
`

parseJs(js)
