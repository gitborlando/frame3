import { parse } from '@babel/parser'
import { NodePath, TraverseOptions } from '@babel/traverse'
import * as t from '@babel/types'
import { babelTraverseJSXOption } from './parse-jsx'
import { babelTraverseLabelOption } from './parse-label'
import {
  babelGenerate,
  babelTraverse,
  commonImports,
  createFrameCall,
  FrameApi,
  frameApiImports,
  parseState,
  reatciveIdentifers,
} from './shared'

export const parseJsHooks: (() => string)[] = []

export function parseJs(js: string) {
  const ast = parse(js, { plugins: ['jsx'], sourceType: 'module' })

  babelTraverse(ast, {
    ...babelTraverseLabelOption(),
    ...babelTraverseDotValueOption(),
    ...babelTraverseJSXOption(),
    ...babelTraverseOthersOption(),
  })

  return babelGenerate(ast).code
}

export function babelTraverseDotValueOption(): TraverseOptions<t.Node> {
  return {
    Identifier(path) {
      if (
        (path.node as any).noNeedDotValue ||
        !reatciveIdentifers.has(path.node.name) ||
        t.isVariableDeclarator(path.parent) ||
        (t.isMemberExpression(path.parent) && path.node.start !== path.parent.start)
      )
        return
      path.replaceWith(t.identifier(`${path.node.name}.value`))
      path.skip()
    },
  }
}

function wrapProgram(path: NodePath<t.Node>) {
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
        parseState.importApiFrom
      }"`
    : ''
  const commonImportsString = [...commonImports].reduce((p, i) => (p += babelGenerate(i).code + '\n'), '')

  path.replaceWith(
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

function babelTraverseOthersOption(): TraverseOptions<t.Node> {
  return {
    ImportDeclaration(path) {
      commonImports.add(path.node)
      path.remove()
    },
    exit(path) {
      if (t.isProgram(path.node)) {
        wrapProgram(path)
      }
    },
  }
}
