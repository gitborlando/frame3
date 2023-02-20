const NpmDtsPlugin = require('npm-dts-webpack-plugin')
const { ProvidePlugin } = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist',
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
  plugins: [
    new NpmDtsPlugin({ output: './dist/index.d.ts' }),
    new ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new CompressionPlugin(),
  ],
  watch: true,
}
