import path from 'path'
import { parseSFC } from '../lib/index.js'

export default function markdownPlugin() {
  const fileIds = []
  return {
    name: 'vite-plugin-frame3',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.jsx')) return code
      fileIds.push(id)
      const parsed = parseSFC({ js: code, css: '' }) /* || code */
      return parsed
    },
    handleHotUpdate(ctx) {
      const { file, server, modules } = ctx
      if (path.extname(file) !== '.abc') return

      const toUpadateModules = fileIds.map((id) => server.moduleGraph.getModulesByFile(id))
      const updates = toUpadateModules.map((module) => ({
        type: 'js-update',
        path: module.file,
        acceptedPath: module.file,
        timestamp: new Date().getTime(),
      }))

      server.ws.send({
        type: 'update',
        updates,
      })

      return [...modules, ...toUpadateModules]
    },
  }
}
