import generate from '@babel/generator'
import * as t from '@babel/types'
import { ParseResult } from '@babel/parser'
import traverse, { NodePath } from '@babel/traverse'
import { NAME } from '..'
import { reatciveIdentifers } from './parseJs'

export function parseLabelStatement(ast: ParseResult<t.File>) {
  traverse(ast, {
    LabeledStatement(path) {
      const { name } = path.node.label
      if (name === 'ref') return parseRefLabel(path)
      if (name === 'computed') return parseComputedLabel(path)
      if (name === 'effect') return parseEffectLabel(path)
    },
  })
  return ast
}

function parseRefLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body)) return
  if (!t.isAssignmentExpression(node.body.expression)) return

  const { left: identifier, right: value } = node.body.expression
  ;(identifier as any).noNeedDotValue = true
  reatciveIdentifers.add(generate(identifier).code)

  const reactiveCall = t.callExpression(t.identifier(NAME + '.reactive'), [value])
  const reactiveDeclaration = t.variableDeclaration('const', [t.variableDeclarator(identifier, reactiveCall)])

  path.replaceWith(reactiveDeclaration)
}

function parseComputedLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body)) return
  if (!t.isAssignmentExpression(node.body.expression)) return

  const { left: identifier, right: computedExpression } = node.body.expression
  ;(identifier as any).noNeedDotValue = true
  reatciveIdentifers.add(generate(identifier).code)

  const computedCaller = t.memberExpression(t.identifier(NAME), t.identifier('computed'))
  const computedCallback = t.isArrowFunctionExpression(computedExpression)
    ? computedExpression
    : t.arrowFunctionExpression([], computedExpression)
  const computedCall = t.callExpression(computedCaller, [computedCallback])
  const computedDeclaration = t.variableDeclaration('const', [t.variableDeclarator(identifier, computedCall)])

  path.replaceWith(computedDeclaration)
}

function parseEffectLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body)) return

  const effectCaller = t.memberExpression(t.identifier(NAME), t.identifier('effect'))
  const effectCallback = t.isArrowFunctionExpression(node.body.expression)
    ? node.body.expression
    : t.arrowFunctionExpression([], node.body.expression)
  const effectCall = t.callExpression(effectCaller, [effectCallback])

  path.replaceWith(effectCall)
}
