const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
module.exports = merge(common, {
  mode: "development",
  devServer: {
    watchFiles: ["./src/**/*"],
    static: './dist',
  },
  plugins: [
    new EslintWebpackPlugin(),
  ],
})
