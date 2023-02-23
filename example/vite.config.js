import { defineConfig } from 'vite'
import frame3 from '../src/export/vite-plugin'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [frame3()],
})
