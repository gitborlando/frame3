import _generate from '@babel/generator'
import _template from '@babel/template'
import _traverse from '@babel/traverse'
import * as t from '@babel/types'

export const babelTraverse = (_traverse as any).default as typeof _traverse
export const babelGenerate = (_generate as any).default as typeof _generate
export const babelTemplate = (_template as any).default as typeof _template

export const frameApiImports: { api: string; as: string }[] = []
export const commonImports = new Set<t.ImportDeclaration>()

export const requiredFrameApis = new Set<keyof typeof FrameApi>()

export const reatciveIdentifers = new Set<string>()

export const parseState = {
  toMountElement: '' as any,
  hasJsx: false,
  isInJsx: false,
  propsGeneratedCode: '',
  importApiFrom: 'F:/frame/lib/index.js',
  componentName: 'Component' + uuid(),
  wrapped: false,
}

const id = '' //'__' + uuid().slice(0, 4)
export const FrameApi = new Proxy(
  {
    h: 'h' + id,
    reactive: 'reactive' + id,
    computed: 'computed' + id,
    effect: 'effect' + id,
    mount: 'mount' + id,
  },
  {
    get(target, api) {
      if (frameApiImports.some((i) => i.api === api)) return Reflect.get(target, api)
      frameApiImports.push({
        api: api as string,
        as: Reflect.get(target, api),
      })
      return Reflect.get(target, api)
    },
  }
)

export function init() {
  frameApiImports.length = 0
  commonImports.clear()
  requiredFrameApis.clear()
  reatciveIdentifers.clear()

  parseState.toMountElement = ''
  parseState.hasJsx = false
  parseState.isInJsx = false
  parseState.propsGeneratedCode = ''
  parseState.importApiFrom = 'F:/frame/lib/index.js'
  parseState.componentName = 'Component' + uuid()
  parseState.wrapped = false
}

export function uuid() {
  return Math.random().toString(36).slice(2, 12)
}

export function createFrameCall(
  api: string,
  arguements: (t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder)[]
) {
  return t.callExpression(t.identifier(api), arguements)
}
