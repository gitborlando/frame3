import generate from '@babel/generator'
import * as t from '@babel/types'
import { parse, ParseResult } from '@babel/parser'
import traverse from '@babel/traverse'

export const exposeValueMap = new Map<string, any>()

export function parseJs(js: string) {
  const ast = parse(js)

  parseLabel(ast)

  const { code } = generate(ast)
  return code
}

export function parseLabel(ast: ParseResult<t.File>, env: 'browser' | 'node' = 'browser') {
  traverse(ast, {
    LabeledStatement(path) {
      const { node } = path
      if (node.label.name !== 'ref') return
      if (!t.isExpressionStatement(node.body)) return
      if (!t.isAssignmentExpression(node.body.expression)) return

      const { left: identifier, right: value } = node.body.expression
      path.replaceWith(
        t.variableDeclaration('const', [
          t.variableDeclarator(
            identifier,
            t.callExpression(t.identifier(env === 'browser' ? 'frame.reactive' : '$_reactive'), [value])
          ),
        ])
      )
    },
  })
}
