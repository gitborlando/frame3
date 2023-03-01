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
  init,
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
    ...babelTraverseOnExitsOption(),
    ...babelTraverseOthersOption(),
  })

  return babelGenerate(ast).code
}

export function addDotValue(js: string) {
  init()
  const ast = babelParse(js)
  babelTraverse(ast, { ...babelTraverseDotValueOption(), ...babelTraverseOnExitsOption() })
  return babelGenerate(ast).code.replace(/;$/, '')
}

function babelTraverseDotValueOption(): TraverseOptions<t.Node> {
  return {
    Identifier(path) {
      if (
        !path.node.name.startsWith('$') ||
        path.node.name === '$' ||
        path.node.name.match(/.value$/) ||
        path.node.name.match(/\$(reactive|computed|ref)/) ||
        t.isObjectProperty(path.parent) ||
        t.isImportSpecifier(path.parent) ||
        t.isVariableDeclarator(path.parent) ||
        t.isJSXExpressionContainer(path.parent)
      )
        return
      path.replaceWith(t.identifier(`${path.node.name}.value`))
      path.skip()
    },
    CallExpression(path) {
      if (t.isIdentifier(path.node.callee) && path.node.callee.name.match(/\$(reactive|computed|ref)/)) {
        const args = path.node.arguments
        const callee = { $reactive: FrameApi.reactive, $computed: FrameApi.computed, $ref: FrameApi.ref }[
          path.node.callee.name
        ]
        path.replaceWith(createFrameCall(callee!, args))
      }
    },
    VariableDeclarator(path) {
      const { node } = path
      if (t.isIdentifier(node.id) && node.id.name.match(/^\$/)) {
        if (
          t.isCallExpression(node.init) &&
          t.isIdentifier(node.init.callee) &&
          node.init.callee.name.match(/\$?(reactive|computed|ref)/)
        )
          return
        node.init = createFrameCall(FrameApi.reactive, [node.init || t.identifier('')])
      }
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
      const { argument } = path.node
      if (
        !t.isJSXElement(argument) &&
        !t.isJSXFragment(argument) &&
        !(t.isCallExpression(argument) && (argument.callee as t.Identifier).name === 'h')
      )
        return
      path.replaceWith(t.returnStatement(t.arrowFunctionExpression([], argument)))
      parseState.returnStatementAnchor = path
      const cssInJs = babelTemplate.ast(parseJsHooks.map((parseCss) => parseCss()).join(''))
      path.insertBefore(cssInJs)
    },
  }
}

function babelTraverseOnExitsOption(): TraverseOptions<t.Node> {
  return {
    exit(path) {
      if (t.isProgram(path.node)) {
        insertImportStatement(path as NodePath<t.Program>)
        if (parseConfig.isSFC) {
          wrapProgram(path as NodePath<t.Program>)
        }
      }
    },
  }
}

function insertImportStatement(path: NodePath<t.Program>) {
  const importFrameApiDeclarationString = frameApiImports.length
    ? `import { ${frameApiImports.reduce((all, { api, as }) => (all += `${api} as ${as},`), '')} } from "${
        parseConfig.importApiFrom
      }"`
    : ''
  const commonImportsString = [...commonImports].reduce((p, i) => (p += babelGenerate(i).code + '\n'), '')

  path.node.body.unshift(t.expressionStatement(t.identifier(commonImportsString + importFrameApiDeclarationString)))
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

  return path.replaceWith(
    t.program([
      t.variableDeclaration('let', [t.variableDeclarator(t.identifier(parseState.componentName))]),
      t.exportDefaultDeclaration(
        t.assignmentExpression('=', t.identifier(parseState.componentName), componentFunction)
      ),
      ...(mountStatement ? [mountStatement] : []),
    ])
  )
}
