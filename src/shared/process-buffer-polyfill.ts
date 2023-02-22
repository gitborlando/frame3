import * as buffer from 'buffer'
import process from 'process'
import { isBrowser } from './utils'

if (isBrowser()) {
  ;(window as any).Buffer = buffer.Buffer
  ;(window as any).process = process
}

export const polyfillProcessAndBuffer = () => {}
