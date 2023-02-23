import { NodePath, TraverseOptions } from '@babel/traverse'
import * as t from '@babel/types'
import { babelTraverseJSXOption } from './parse-jsx'
import { babelTraverseLabelOption } from './parse-label'
import {
  babelGenerate,
  babelParse,
  babelTemplate,
  babelTraverse,
  commonImports,
  createFrameCall,
  FrameApi,
  frameApiImports,
  parseConfig,
  parseJsHooks,
  parseState,
} from './shared'

export function parseJs(js: string) {
  const ast = babelParse(js)

  babelTraverse(ast, {
    ...(parseConfig.isSFC ? { ...babelTraverseLabelOption() } : {}),
    ...babelTraverseDotValueOption(),
    ...babelTraverseJSXOption(),
    ...babelTraverseOthersOption(),
  })

  return babelGenerate(ast).code
}

export function addDotValue(js: string) {
  const ast = babelParse(js)
  babelTraverse(ast, babelTraverseDotValueOption())
  return babelGenerate(ast).code.replace(/;$/, '')
}

function babelTraverseDotValueOption(): TraverseOptions<t.Node> {
  return {
    Identifier(path) {
      if (
        !path.node.name.startsWith('$') ||
        t.isVariableDeclarator(path.parent) ||
        t.isObjectProperty(path.parent) ||
        path.node.name.match(/.value$/)
      )
        return
      path.replaceWith(t.identifier(`${path.node.name}.value`))
      path.skip()
    },
    CallExpression(path) {
      if (!t.isIdentifier(path.node.callee) || path.node.callee.name !== '$') return
      path.replaceWith(t.memberExpression(path.node, t.identifier('value')))
    },
  }
}

function babelTraverseOthersOption(): TraverseOptions<t.Node> {
  return {
    ImportDeclaration(path) {
      commonImports.add(path.node)
      path.remove()
    },
    ReturnStatement(path) {
      if (!t.isJSXElement(path.node.argument)) return

      path.replaceWith(t.returnStatement(t.arrowFunctionExpression([], path.node.argument)))
      const cssInJs = babelTemplate.ast(parseJsHooks.map((parseCss) => parseCss()).join(''))
      path.insertBefore(cssInJs)
    },
    exit(path) {
      if (t.isProgram(path.node)) {
        wrapProgram(path as NodePath<t.Program>)
      }
    },
  }
}

function wrapProgram(path: NodePath<t.Program>) {
  if (parseState.wrapped) return
  parseState.wrapped = true

  const componentFunction = t.arrowFunctionExpression(
    [t.identifier(`({${parseState.propsGeneratedCode}})`)],
    t.blockStatement((path.node as any).body)
  )

  const mountStatement =
    parseState.toMountElement &&
    t.expressionStatement(
      createFrameCall(FrameApi.mount, [t.identifier(parseState.componentName), parseState.toMountElement])
    )

  const importFrameApiDeclarationString = frameApiImports.length
    ? `import { ${frameApiImports.reduce((all, { api, as }) => (all += `${api} as ${as},`), '')} } from "${
        parseConfig.importApiFrom
      }"`
    : ''
  const commonImportsString = [...commonImports].reduce((p, i) => (p += babelGenerate(i).code + '\n'), '')

  if (!parseConfig.isSFC) {
    return path.node.body.unshift(
      t.expressionStatement(t.identifier(commonImportsString + importFrameApiDeclarationString))
    )
  }
  return path.replaceWith(
    t.program([
      t.expressionStatement(t.identifier(commonImportsString + importFrameApiDeclarationString)),
      t.variableDeclaration('let', [t.variableDeclarator(t.identifier(parseState.componentName))]),
      t.exportDefaultDeclaration(
        t.assignmentExpression('=', t.identifier(parseState.componentName), componentFunction)
      ),
      ...(mountStatement ? [mountStatement] : []),
    ])
  )
}
