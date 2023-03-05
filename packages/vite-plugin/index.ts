import { addDotValue, parseSFC } from 'frame3-compiler-sfc'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Plugin } from 'vite'

const fileIds: string[] = []

let currentTsxFileId = ''
const cssToTsxImportMap: Record<string, string> = {}

const skipCssIds: string[] = []

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
        currentTsxFileId = id
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
      if (id.match(/css$/) && !skipCssIds.includes(id)) return ' '

      return code
    },
    handleHotUpdate({ file, server, modules }) {
      const toUpdateIds: string[] = []
      if (file.match(/css$/)) {
        toUpdateIds.push(cssToTsxImportMap[file])
      }

      const toUpdateModules = toUpdateIds.map((id) => [...(server.moduleGraph.getModulesByFile(id) || [])]).flat()
      const updates = toUpdateModules.map((module) => ({
        type: 'js-update' as const,
        path: module.file!,
        acceptedPath: module.file!,
        timestamp: new Date().getTime(),
      }))
      server.ws.send({ type: 'update', updates })
      return [...modules, ...toUpdateModules]
    },
  }
}

function readCssFile(code: string, upperDir: string) {
  return matchImportCss(code)
    .map((id) => {
      const path = transPath(resolve(upperDir, id))
      cssToTsxImportMap[path] = currentTsxFileId
      const content = readFileSync(path, 'utf-8')
      if (content.match(/^\s*\/\*\s*skip\s*\*\//)) {
        skipCssIds.push(path)
        return ''
      }
      return content
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

function transPath(path: string) {
  while (/\\/.test(path)) {
    path = path.replace(/\\/, '/')
  }
  return path
}
