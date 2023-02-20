import { NodePath, TraverseOptions } from '@babel/traverse'
import * as t from '@babel/types'
import { cssParsers } from './parse-js'
import { babelGenerate, babelTemplate, FrameApi, parseState, propIdentifiers, reatciveIdentifers } from './shared'

export function babelTraverseLabelOption(): TraverseOptions<t.Node> {
  return {
    LabeledStatement(path) {
      const { name } = path.node.label
      if (name === 'props') return parsePropsLabel(path)
      if (name === 'ref') return parseRefLabel(path)
      if (name === 'computed') return parseComputedLabel(path)
      if (name === 'effect') return parseEffectLabel(path)
      if (name === 'jsx') return parseJsxLabel(path)
    },
  }
}

function parseRefLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body)) return path.remove()
  if (!t.isAssignmentExpression(node.body.expression)) return path.remove()

  const { left: identifier, right: value } = node.body.expression
  ;(identifier as any).noNeedDotValue = true
  reatciveIdentifers.add(babelGenerate(identifier).code)

  const reactiveCall = t.callExpression(t.identifier(FrameApi.reactive), [value])
  const reactiveDeclaration = t.variableDeclaration('const', [t.variableDeclarator(identifier, reactiveCall)])

  path.replaceWith(reactiveDeclaration)
}

function parseComputedLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body)) return path.remove()
  if (!t.isAssignmentExpression(node.body.expression)) return path.remove()

  const { left: identifier, right: computedExpression } = node.body.expression
  ;(identifier as any).noNeedDotValue = true
  reatciveIdentifers.add(babelGenerate(identifier).code)

  const computedCaller = t.identifier(FrameApi.computed)
  const computedCallback = t.isArrowFunctionExpression(computedExpression)
    ? computedExpression
    : t.arrowFunctionExpression([], computedExpression)
  const computedCall = t.callExpression(computedCaller, [computedCallback])
  const computedDeclaration = t.variableDeclaration('const', [t.variableDeclarator(identifier, computedCall)])

  path.replaceWith(computedDeclaration)
}

function parseEffectLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body) && !t.isBlock(node.body)) return path.remove()

  const effectCaller = t.identifier(FrameApi.effect)
  const effectCallback = t.isBlock(node.body)
    ? t.arrowFunctionExpression([], node.body)
    : t.isArrowFunctionExpression(node.body.expression)
    ? node.body.expression
    : t.arrowFunctionExpression([], node.body.expression)
  const effectCall = t.callExpression(effectCaller, [effectCallback])

  path.replaceWith(effectCall)
}

function parsePropsLabel(path: NodePath<t.LabeledStatement>) {
  const {
    node: { body },
  } = path
  if (!t.isExpressionStatement(body)) return path.remove()

  if (t.isIdentifier(body.expression)) {
    propIdentifiers.add(body.expression.name)
  }
  let multiIdentifiers: t.Expression[] = []
  if (t.isSequenceExpression(body.expression)) {
    multiIdentifiers = body.expression.expressions
  }
  if (t.isArrayExpression(body.expression)) {
    multiIdentifiers = body.expression.elements as t.Expression[]
  }
  multiIdentifiers
    .filter((i) => t.isIdentifier(i))
    .map((i) => (i as t.Identifier).name)
    .forEach((prop) => propIdentifiers.add(prop))

  path.remove()
}

function parseJsxLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body)) return path.remove()

  const jsxLabelRightExpression = node.body.expression
  let jsx: t.Expression
  if (t.isSequenceExpression(jsxLabelRightExpression)) {
    jsx = jsxLabelRightExpression.expressions[0]
    parseState.toMountElementSelector = jsxLabelRightExpression.expressions[1]
  } else {
    jsx = jsxLabelRightExpression
  }
  if (!t.isJSXElement(jsx)) return path.remove()

  const renderFunction = t.arrowFunctionExpression([], jsx)
  const returnStatement = t.returnStatement(renderFunction)

  const cssInJs = babelTemplate.ast(cssParsers.map((parseCss) => parseCss()).join(''))

  path.replaceWith(returnStatement)
  path.insertBefore(cssInJs)
}
