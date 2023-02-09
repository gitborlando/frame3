import { generate, parse } from 'css-tree'

export const css = `
		.div {
			width: (width) px;
			height: 200px;
			background-color: gray;
		}
`
export const parseCss = (css: string) => {
	const ast = parse(css)
	const newCss = generate(ast)
	console.log(newCss)
}

parseCss(css)
