import { polyfillProcessAndBuffer } from './shared/process-buffer-polyfill'

export * from './core'
export * from './parse'

polyfillProcessAndBuffer()
