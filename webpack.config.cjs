module.exports = {
	entry: './src/index.ts',
	output: {
		path: __dirname,
		filename: 'index.js',
		library: 'simple',
		libraryTarget: 'umd',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	// devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
		],
	},
	watch: true,
}
