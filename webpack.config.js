const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: "bundle.js",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, loader: "ts-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Three.js Boilerplate',
      template: './src/index.html',
      filename: './index.html' //relative to root of the application
    }),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
    new EslintWebpackPlugin(),
    new WriteFileWebpackPlugin(),
    new CopyPlugin({ // only works if webpack mode is set to production!
      patterns: [
        {
          from: './src/fonts',
          to: './fonts/',
          context: path.resolve(__dirname),
          force: true,
        }
      ],
    }),
  ],
  devServer: {
    watchFiles: ["./src/**/*"],
    static: './dist',
  }
}
