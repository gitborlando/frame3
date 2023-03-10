import { generate as cssGenerate, parse as cssParse, Selector, SelectorList, walk } from 'css-tree'
import { scopeId } from './parse-sfc'
import { FrameApi } from './shared'

const additionalJsForAddCss: string[] = []

export const parseCss = (css: string) => {
  additionalJsForAddCss.length = 0
  const ast = cssParse(css)
  walk(ast, {
    visit: 'Rule',
    enter(rule) {
      const { prelude, block } = rule

      if (!cssGenerate(prelude).match(/\*/)) {
        ;((prelude as SelectorList).children.last as Selector).children.appendData({
          type: 'AttributeSelector',
          name: { name: `s-${scopeId}`, type: 'Identifier' },
          matcher: null,
          value: null,
          flags: null,
        })
      }

      walk(block, {
        visit: 'Declaration',
        enter(declaration) {
          if (declaration.value.type !== 'Value') return
          const parentheses = [...declaration.value.children].find((i) => i.type === 'Parentheses')
          if (!parentheses) return

          const selector = cssGenerate(prelude)
          const parenthesesJsExpression = cssGenerate(parentheses)
            .replace(/^\(('|"|`)?/, '')
            .replace(/('|"|`)?\)$/, '')

          ;(parentheses as any).type = 'Raw'
          ;(parentheses as any).value = '${' + parenthesesJsExpression + '}'

          const style = `${selector}{${cssGenerate(declaration)};}`

          additionalJsForAddCss.push(`
          ${FrameApi.effect}((prevState) => {
            const { t } = prevState
            if (prevState.style) return prevState.style.innerHTML = \`${style}\`; 
            const style = document.createElement('style');
            style.innerHTML = \`${style}\`;
            document.head.appendChild((prevState.style = style));
          }, { style: null, t: ${FrameApi.theme} });`)

          declaration.value.children.clear()
        },
      })
    },
  })
  additionalJsForAddCss.push(`if (!document.querySelector('style[s-${scopeId}]')) {
  document.head.insertAdjacentHTML('beforeend', '<style s-${scopeId}>${cssGenerate(ast)}</style>')
}`)
  return additionalJsForAddCss.join('')
}
