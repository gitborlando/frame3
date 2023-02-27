import { NodePath, TraverseOptions } from '@babel/traverse'
import * as t from '@babel/types'
import { scopeId } from './parse-sfc'
import { FrameApi, parseState, uuid } from './shared'

interface IJsx {
  tag: string
  props: Record<string, any>
  children: t.Expression[]
  isSelfClose: boolean
  jsxElementPath: NodePath<any>
}

export const jsxStack: IJsx[] = []
const getJsxStackLastOne = () => jsxStack[jsxStack.length - 1]

export function babelTraverseJSXOption(): TraverseOptions<any> {
  jsxStack.length = 0
  return {
    JSXOpeningElement(path) {
      parseState.hasJsx = true
      parseState.isInJsx = true

      const { node, parentPath } = path
      const currentJsx: IJsx = {
        tag: (node.name as unknown as t.Identifier).name,
        props: { 'scope-id': t.stringLiteral(scopeId) },
        children: [],
        isSelfClose: node.selfClosing,
        jsxElementPath: parentPath,
      }

      jsxStack.push(currentJsx)
      if (currentJsx.isSelfClose) {
        currentJsx.jsxElementPath.replaceWith(createHydrateCall(currentJsx))
        jsxStack.pop()
      }

      const prevJsx = jsxStack.slice(-2, -1)[0]
      if (prevJsx) {
        prevJsx.children.push(currentJsx.jsxElementPath.node)
      }
    },
    JSXAttribute({ node }) {
      const { name, value } = node
      const currentJsx = getJsxStackLastOne()
      const propKey = (name as unknown as t.Identifier).name
      const propValue = t.isJSXExpressionContainer(value) ? value.expression : value ? value : t.identifier(propKey)
      currentJsx.props[propKey] = propValue
    },
    JSXText({ node }) {
      if (!node.value.match(/[^\n\s]/)) return

      const currentJsx = getJsxStackLastOne()
      currentJsx.children.push(t.stringLiteral(node.value))
    },
    JSXExpressionContainer(path) {
      const { node, parent: parentNode } = path
      if (t.isJSXEmptyExpression(node.expression)) return path.remove()
      if (t.isJSXAttribute(parentNode)) return

      const currentJsx = getJsxStackLastOne()
      currentJsx.children.push(node.expression as t.Expression)
    },
    JSXClosingElement() {
      const currentJsx = getJsxStackLastOne()
      currentJsx.jsxElementPath.replaceWith(createHydrateCall(currentJsx))
      jsxStack.pop()
      if (!jsxStack.length) parseState.isInJsx = false
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
    ArrowFunctionExpression(path) {
      if (!t.isJSXExpressionContainer(path.parent)) return

      const randomId = `arrow_func_${uuid().slice(0, 4)}`
      parseState.returnStatementAnchor.insertBefore(
        t.variableDeclaration('const', [t.variableDeclarator(t.identifier(randomId), path.node)])
      )
      path.replaceWith(t.identifier(randomId))
    },
  }
}

function createHydrateCall({ tag, props, children }: IJsx) {
  return t.callExpression(t.identifier(FrameApi.h), [
    tag[0].toUpperCase() === tag[0] ? t.identifier(tag) : t.stringLiteral(tag),
    t.objectExpression(
      Object.entries(props).map(([propKey, propValue]) => t.objectProperty(t.stringLiteral(propKey), propValue))
    ),
    t.arrayExpression(children),
  ])
}
