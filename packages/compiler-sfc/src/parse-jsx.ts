import { TraverseOptions } from '@babel/traverse'
import * as t from '@babel/types'
import { scopeId } from './parse-sfc'
import { createFrameCall, FrameApi, parseState, uuid } from './shared'

export function babelTraverseJSXOption(): TraverseOptions<any> {
  return {
    JSXElement(path) {
      path.replaceWith(transformJsxElement(path.node))
    },
    JSXFragment(path) {
      path.replaceWith(transformJsxFragment(path.node))
    },
    LogicalExpression(path) {
      if (!t.isJSXExpressionContainer(path.parent)) return

      const { left, right, operator } = path.node
      const conditionalExpression =
        operator === '||'
          ? t.conditionalExpression(left, t.identifier('undefined'), right)
          : t.conditionalExpression(left, right, t.identifier('undefined'))
      path.replaceWith(conditionalExpression)
    },
  }
}

function transformJsxElement(node: t.JSXElement) {
  const { openingElement, children } = node
  const { name, attributes } = openingElement
  const propTuples: [string, any][] = attributes.map((attribute) => {
    if (t.isJSXSpreadAttribute(attribute)) return ['$_spread', attribute.argument]
    const { name, value } = attribute
    const propKey = (name as unknown as t.Identifier).name
    const propValue = t.isJSXExpressionContainer(value)
      ? promoteArrowFunctionInJsx(value.expression)
      : value
      ? value
      : t.identifier(propKey)
    return [propKey, propValue]
  })
  return createHydrateCall(
    (name as t.JSXIdentifier).name,
    propTuples.concat([['scope-id', t.stringLiteral(scopeId)]]),
    transformJsxChildren(children)
  )
}

function transformJsxFragment(node: t.JSXFragment) {
  return createHydrateCall('', [], transformJsxChildren(node.children))
}

function transformJsxChildren(
  jsxChildren: (t.JSXElement | t.JSXFragment | t.JSXExpressionContainer | t.JSXSpreadChild | t.JSXText)[]
) {
  const children: t.Expression[] = []
  jsxChildren.forEach((child) => {
    if (t.isJSXElement(child)) return children.push(transformJsxElement(child))
    if (t.isJSXFragment(child)) return children.push(transformJsxFragment(child))
    if (t.isJSXText(child) && child.value.match(/[^\n\s]/)) return children.push(t.stringLiteral(child.value))
    if (t.isJSXExpressionContainer(child) && !t.isJSXEmptyExpression(child.expression))
      return children.push(child.expression)
  })
  return children
}

function createHydrateCall(tag: string, propTuples: [string, any][], children: t.Expression[]) {
  return createFrameCall(FrameApi.h, [
    tag ? (tag[0].toUpperCase() === tag[0] ? t.identifier(tag) : t.stringLiteral(tag)) : t.arrayExpression([]),
    t.objectExpression(
      propTuples.map(([propKey, propValue]) => {
        if (propKey === '$_spread') return t.spreadElement(propValue)
        return t.objectProperty(t.stringLiteral(propKey), propValue)
      })
    ),
    t.arrayExpression(children),
  ])
}

function promoteArrowFunctionInJsx(expression: t.Expression | t.JSXEmptyExpression) {
  if (!t.isArrowFunctionExpression(expression)) return expression
  const randomId = `arrow_function_${uuid().slice(0, 4)}`
  parseState.returnStatementAnchor.insertBefore(
    t.variableDeclaration('const', [t.variableDeclarator(t.identifier(randomId), expression)])
  )
  return { type: 'Identifier', name: randomId } as t.Identifier
}
