import generate from '@babel/generator'
import * as t from '@babel/types'
import { parse, ParseResult } from '@babel/parser'
import traverse, { NodePath } from '@babel/traverse'
import { runningEnv } from '../utils'

export const additionalJsTexts: string[] = []
export const reatciveIdentifers = new Set<string>()

export function parseJs(js: string) {
  const ast = parse(js)
  parseLabelStatement(ast)
  parseDotValue(ast)

  return generate(ast).code
}

export function parseLabelStatement(ast: ParseResult<t.File>) {
  traverse(ast, {
    LabeledStatement(path) {
      parseRefLabel(path)
    },
  })
  return ast
}

export function parseDotValue(ast: ParseResult<t.File>) {
  traverse(ast, {
    Identifier(path) {
      if (!reatciveIdentifers.has(path.node.name) || (path.node as any).noNeedDotValue) return
      path.replaceWith(t.memberExpression(path.node, t.identifier('value')))
      path.skip()
    },
  })
  return ast
}

function parseRefLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (node.label.name !== 'ref') return
  if (!t.isExpressionStatement(node.body)) return
  if (!t.isAssignmentExpression(node.body.expression)) return

  const { left: identifier, right: value } = node.body.expression
  ;(identifier as any).noNeedDotValue = true
  reatciveIdentifers.add(generate(identifier).code)

  path.replaceWith(
    t.variableDeclaration('const', [
      t.variableDeclarator(
        identifier,
        t.callExpression(
          t.identifier('frame.reactive' /* runningEnv === 'browser' ? 'frame.reactive' : '$_reactive' */),
          [value]
        )
      ),
    ])
  )
}
