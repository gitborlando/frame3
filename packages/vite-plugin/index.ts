import { addDotValue, parseSFC } from 'frame3-compiler-sfc'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Plugin } from 'vite'

const fileIds: string[] = []

export default function frame3(): Plugin {
  fileIds.length = 0

  return {
    name: 'vite-plugin-frame3',
    enforce: 'pre',
    transform(code, id) {
      if (
        id.match(/(j|t)s$/) &&
        ['vite/dist/client/client.mjs', 'vite/dist/client/env.mjs'].every((end) => !id.endsWith(end))
      ) {
        return addDotValue(code)
      }
      if (id.match(/(j|t)sx$/)) {
        fileIds.push(id)

        parseSFC.config({ importApiFrom: 'frame3' })
        const css = readCssFile(code, id.split('/').slice(0, -1).join('/'))
        return parseSFC([code, css])
      }
      if (id.match(/html$/) && !id.match(/index.html$/)) {
        fileIds.push(id)
        parseSFC.config({ isSFC: true, importApiFrom: 'frame3' })
        return parseSFC([
          code.replace(/(.*)<script>(.*)<\/script>/, '$2'),
          code.replace(/(.*)<style>(.*)<\/style>/, '$2'),
        ])
      }
      if (id.match(/css$/)) return ' '

      return code
    },
    // handleHotUpdate({ file, server, modules }) {
    //   if (!file.match(/\.(js|ts|jsx|tsx|html|css)/)) return

    //   const toUpdateModules = fileIds.map((id) => [...(server.moduleGraph.getModulesByFile(id) || [])]).flat()
    //   const updates = toUpdateModules.map((module) => ({
    //     type: 'js-update' as const,
    //     path: module.file!,
    //     acceptedPath: module.file!,
    //     timestamp: new Date().getTime(),
    //   }))
    //   server.ws.send({ type: 'update', updates })
    //   return [...modules, ...toUpdateModules]
    // },
  }
}

function readCssFile(code: string, upperDir: string) {
  return matchImportCss(code)
    .map((id) => {
      const path = resolve(upperDir, id)
      return readFileSync(path)
    })
    .join('\n')
}

function matchImportCss(code: string) {
  const importCssRe = /[\n\s]*import\s*['"](.*css)['"][\n\s]*/
  const importCssIds: string[] = []
  while (importCssRe.test(code)) {
    code = code.replace(importCssRe, (_, $1) => {
      importCssIds.push($1)
      return '\n'
    })
  }
  return importCssIds
}
