import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: './index.js',
				name: 'simple',
				format: 'umd',
				sourcemap: true,
			},
		],
		plugins: [
			typescript({
				tsconfig: './tsconfig.json',
			}),
		],
	},
	{
		input: 'src/index.ts',
		output: [{ file: './index.d.ts', format: 'umd' }],
		plugins: [dts()],
	},
]
