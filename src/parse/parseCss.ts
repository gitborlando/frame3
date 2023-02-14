import { generate, parse, walk } from 'css-tree'
import { isNumber } from 'lodash'

export const css = `
		.div {
			width: (width + 2) px;
			height: 200px;
			background-color: gray;
		}
`

export const values = { width: 200 }

export const parseCss = (css: string) => {
  const ast = parse(css)
  // walk(ast, {
  //   visit: 'Declaration',
  //   enter(node) {
  //     if (node.value.type === 'Value') {
  //       const parentheses = [...node.value.children].find((i) => i.type === 'Parentheses')
  //       if (!parentheses) return

  //       const repalcer = parentheses as any
  //       const value = new Function('v', `with(v){return ${generate(repalcer)}}`)(values)

  //       if (isNumber(value)) {
  //         repalcer.type = 'Number'
  //         repalcer.value = JSON.stringify(value)
  //       } else {
  //         repalcer.type = 'Identifier'
  //         repalcer.name = JSON.stringify(value)
  //       }

  //       console.log(node)
  //     }
  //   },
  // })
  // walk(ast, {
  //   visit: 'Block',
  //   enter(block) {
  //     walk(block, {
  //       visit: 'Declaration',
  //       enter(node) {
  //         if (node.value.type === 'Value') {
  //           const parentheses = [...node.value.children].find((i) => i.type === 'Parentheses')
  //           if (!parentheses) return

  //           const repalcer = parentheses as any
  //           const value = new Function('v', `with(v){return ${generate(repalcer)}}`)(values)

  //           if (isNumber(value)) {
  //             repalcer.type = 'Number'
  //             repalcer.value = JSON.stringify(value)
  //           } else {
  //             repalcer.type = 'Identifier'
  //             repalcer.name = JSON.stringify(value)
  //           }

  //           console.log(generate(block))
  //         }
  //       },
  //     })
  //   },
  // })

  walk(ast, {
    visit: 'Rule',
    enter(rule) {
      const { prelude, block } = rule
      walk(block, {
        visit: 'Declaration',
        enter(declaration) {
          if (declaration.value.type === 'Value') {
            const parentheses = [...declaration.value.children].find((i) => i.type === 'Parentheses')
            if (!parentheses) return
            console.log(generate(parentheses))
            const repalcer = parentheses as any
            const value = new Function('v', `with(v){return ${generate(repalcer)}}`)(values)

            if (isNumber(value)) {
              repalcer.type = 'Number'
              repalcer.value = JSON.stringify(value)
            } else {
              repalcer.type = 'Identifier'
              repalcer.name = JSON.stringify(value)
            }

            console.log(generate(prelude), generate(declaration))
          }
        },
      })
    },
  })
  const newCss = generate(ast)
  console.log(newCss)
}
