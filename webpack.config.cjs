const NpmDtsPlugin = require('npm-dts-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: 'frame',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [new NpmDtsPlugin({ output: './lib/index.d.ts' })],
  watch: true,
}
