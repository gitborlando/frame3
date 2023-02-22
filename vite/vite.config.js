import { defineConfig } from 'vite'
import frame from './plugin'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [frame()],
})
