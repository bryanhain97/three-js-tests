const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const CopyPlugin = require('copy-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: "production",
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
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
})