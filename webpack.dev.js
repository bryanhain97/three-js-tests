const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: "development",
  devServer: {
    watchFiles: ["./src/**/*"],
    static: path.resolve(__dirname, 'src'),
    open: true
  },
  plugins: [
    new EslintWebpackPlugin(),
  ],
})
