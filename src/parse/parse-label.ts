import { NodePath, TraverseOptions } from '@babel/traverse'
import * as t from '@babel/types'
import { parseJsHooks } from './parse-js'
import { babelGenerate, babelTemplate, createFrameCall, FrameApi, parseState, reatciveIdentifers } from './shared'

export function babelTraverseLabelOption(): TraverseOptions<t.Node> {
  return {
    LabeledStatement(path) {
      const { name } = path.node.label
      if (name.match(/name/)) return parseNameLabel(path)
      if (name.match(/props/)) return parsePropsLabel(path)
      if (name.match(/reactive|r/)) return parseReactiveLabel(path)
      if (name.match(/computed/)) return parseComputedLabel(path)
      if (name.match(/effect/)) return parseEffectLabel(path)
      if (name.match(/jsx/)) return parseJsxLabel(path)
      if (name.match(/mount/)) return parseMountLabel(path)
    },
  }
}

function parseNameLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body) || !t.isStringLiteral(node.body.expression)) return path.remove()

  parseState.componentName = node.body.expression.value
  path.remove()
}

function parseReactiveLabel(path: NodePath<t.LabeledStatement>) {
  const { body } = path.node
  if (!t.isExpressionStatement(body)) return path.remove()

  let identifier: t.Identifier
  let value: t.Expression = t.identifier('undefined')
  if (t.isAssignmentExpression(body.expression)) {
    identifier = body.expression.left as t.Identifier
    value = body.expression.right
  } else if (t.isIdentifier(body.expression)) {
    identifier = body.expression
  } else {
    return path.remove()
  }
  ;(identifier as any).noNeedDotValue = true
  reatciveIdentifers.add(identifier.name)

  const reactiveCall = createFrameCall(FrameApi.reactive, [value])
  const reactiveAssignment = t.assignmentExpression('=', identifier, reactiveCall)
  path.replaceWith(t.expressionStatement(reactiveAssignment))
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
  const computedDeclaration = t.assignmentExpression('=', identifier, computedCall)

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

  parseState.propsGeneratedCode = babelGenerate(body.expression).code
  // if (t.isIdentifier(body.expression)) {
  //   propIdentifiers.add(body.expression.name)
  // }
  // let multiIdentifiers: t.Expression[] = []
  // if (t.isSequenceExpression(body.expression)) {
  //   multiIdentifiers = body.expression.expressions
  // }
  // if (t.isArrayExpression(body.expression)) {
  //   multiIdentifiers = body.expression.elements as t.Expression[]
  // }
  // multiIdentifiers
  //   .filter((i) => t.isIdentifier(i))
  //   .map((i) => (i as t.Identifier).name)
  //   .forEach((prop) => propIdentifiers.add(prop))

  path.remove()
}

function parseJsxLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body) || !t.isJSXElement(node.body.expression)) return path.remove()

  const renderFunction = t.arrowFunctionExpression([], node.body.expression)
  const returnStatement = t.returnStatement(renderFunction)

  const cssInJs = babelTemplate.ast(parseJsHooks.map((parseCss) => parseCss()).join(''))

  path.replaceWith(returnStatement)
  path.insertBefore(cssInJs)
}

function parseMountLabel(path: NodePath<t.LabeledStatement>) {
  const { node } = path
  if (!t.isExpressionStatement(node.body)) return path.remove()

  parseState.toMountElement = node.body.expression
  path.remove()
}
