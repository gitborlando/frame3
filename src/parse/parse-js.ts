import { parse } from '@babel/parser'
import { NodePath, TraverseOptions } from '@babel/traverse'
import * as t from '@babel/types'
import { isBrowser } from '../shared/utils'
import { babelTraverseJSXOption } from './parse-jsx'
import { babelTraverseLabelOption } from './parse-label'
import { babelGenerate, babelTraverse, FrameApi, parseState, propIdentifiers, reatciveIdentifers } from './shared'

export const cssParsers: (() => string)[] = []

export function parseJs(js: string) {
  const ast = parse(js, { plugins: ['jsx'] })

  babelTraverse(ast, {
    ...babelTraverseLabelOption(),
    ...babelTraverseDotValueOption(),
    ...babelTraverseJSXOption(),
    exit(path) {
      if (t.isProgram(path.node) && parseState.hasJsx) {
        wrapProgram(path)
      }
    },
  })

  return babelGenerate(ast).code
}

export function babelTraverseDotValueOption(): TraverseOptions<t.Node> {
  return {
    Identifier(path) {
      if (
        (path.node as any).noNeedDotValue ||
        !reatciveIdentifers.has(path.node.name) ||
        (t.isMemberExpression(path.parent) && path.node.start !== path.parent.start)
      )
        return
      path.replaceWith(t.identifier(`${path.node.name}.value`))
      path.skip()
    },
  }
}

let done = false
function wrapProgram(path: NodePath<t.Node>) {
  if (done) return
  done = true

  const props = t.objectPattern(
    [...propIdentifiers].map((propName) => t.objectProperty(t.identifier(propName), t.identifier(propName)))
  )
  const componentFunction = t.arrowFunctionExpression([props], t.blockStatement((path.node as any).body))

  if (isBrowser()) {
    const mountCall = t.callExpression(t.identifier(FrameApi.mount), [
      componentFunction,
      parseState.toMountElementSelector || t.identifier('document.body'),
    ])
    path.replaceWith(t.program([t.expressionStatement(mountCall)]))
    return
  }

  path.replaceWith(t.program([t.exportDefaultDeclaration(componentFunction)]))
}
