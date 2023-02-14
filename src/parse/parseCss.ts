import { generate as cssGenerate, parse as cssParse, walk } from 'css-tree'
import jsGenerate from '@babel/generator'
import { parse as jsParse } from '@babel/parser'
import { additionalJsTexts, parseDotValue, reatciveIdentifers } from './parseJs'
import { NAME } from '..'

export const parseCss = (css: string) => {
  const ast = cssParse(css)

  walk(ast, {
    visit: 'Rule',
    enter(rule) {
      const { prelude, block } = rule
      walk(block, {
        visit: 'Declaration',
        enter(declaration) {
          if (declaration.value.type !== 'Value') return
          const parentheses = [...declaration.value.children].find((i) => i.type === 'Parentheses')
          if (!parentheses) return

          const selector = cssGenerate(prelude)
          const parenthesesRawString = cssGenerate(parentheses)
            .replace(/^\(('|"|`)?/, '')
            .replace(/('|"|`)?\)$/, '')
          const dealedParentheses = jsGenerate(parseDotValue(jsParse(parenthesesRawString))).code

          ;(parentheses as any).type = 'Raw'
          ;(parentheses as any).value = '${' + dealedParentheses.replace(/;$/, '') + '}'

          const style = '<style>' + selector + ' {' + cssGenerate(declaration) + ';}' + '</style>'
          additionalJsTexts.push(
            '\n' +
              NAME +
              '.effect(() => {\n  ;(document.head || document.querySelector("html"))?.insertAdjacentHTML(\n    "beforeend", \n    `' +
              style +
              '`\n  )\n})'
          )

          declaration.value.children.clear()
        },
      })
    },
  })
  const newCss = cssGenerate(ast)
  return newCss
}
