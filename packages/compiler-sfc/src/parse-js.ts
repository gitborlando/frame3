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
    ...babelTraversOnExitsOption(),
    ...babelTraverseOthersOption(),
  })

  return babelGenerate(ast).code
}

export function addDotValue(js: string) {
  init()
  const ast = babelParse(js)
  babelTraverse(ast, { ...babelTraverseDotValueOption(), ...babelTraversOnExitsOption() })
  return babelGenerate(ast).code.replace(/;$/, '')
}

function babelTraverseDotValueOption(): TraverseOptions<t.Node> {
  return {
    Identifier(path) {
      if (
        !path.node.name.startsWith('$') ||
        path.node.name === '$' ||
        path.node.name.match(/.value$/) ||
        path.node.name.match(/\$(reactive|computed)/) ||
        t.isObjectProperty(path.parent) ||
        t.isImportSpecifier(path.parent) ||
        t.isVariableDeclarator(path.parent)
      )
        return
      path.replaceWith(t.identifier(`${path.node.name}.value`))
      path.skip()
    },
    CallExpression(path) {
      if (t.isIdentifier(path.node.callee) && path.node.callee.name.match(/\$(reactive|computed)/)) {
        const args = path.node.arguments
        if (path.node.callee.name === '$reactive') {
          path.replaceWith(createFrameCall(FrameApi.reactive, args))
          path.skip()
        }
        if (path.node.callee.name === '$computed') {
          path.replaceWith(createFrameCall(FrameApi.computed, args))
          path.skip()
        }
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
      if (!t.isJSXElement(path.node.argument)) return

      path.replaceWith(t.returnStatement(t.arrowFunctionExpression([], path.node.argument)))
      const cssInJs = babelTemplate.ast(parseJsHooks.map((parseCss) => parseCss()).join(''))
      path.insertBefore(cssInJs)
    },
  }
}

function babelTraversOnExitsOption(): TraverseOptions<t.Node> {
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
