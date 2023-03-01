import { defineConfig } from 'vite'
import frame3 from 'vite-plugin-frame3'
import path from 'path'

export default defineConfig({
  plugins: [frame3()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})
