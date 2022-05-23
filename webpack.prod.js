const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common')
const CopyPlugin = require('copy-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(process.cwd(), 'dist')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets/fonts',
          to: './assets/fonts/',
          context: path.resolve(__dirname),
          force: true,
        }
      ]
    }),
    new WriteFileWebpackPlugin(),
    new CssMinimizerPlugin(),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
})