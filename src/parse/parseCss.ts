import { generate, parse, walk } from 'css-tree'

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
	walk(ast, (node, item, list) => {
		if (node.type === 'Parentheses') {
			console.log(generate(node))
		}
	})
	const newCss = generate(ast)
	console.log(newCss)
}
