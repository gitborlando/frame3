import generate from '@babel/generator'
import * as t from '@babel/types'
import { parse, ParseResult } from '@babel/parser'
import traverse from '@babel/traverse'
import { parseLabelStatement } from './parseLabel'

export const additionalJsTexts: string[] = []
export const reatciveIdentifers = new Set<string>()

export function parseJs(js: string) {
  const ast = parse(js, { plugins: ['jsx'] })
  parseLabelStatement(ast)
  parseDotValue(ast)

  return generate(ast).code
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
