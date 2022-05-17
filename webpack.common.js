const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Three.js Boilerplate',
      template: './src/index.html',
      filename: './index.html' //relative to root of the application
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    watchFiles: ["./src/**/*"],
    static: './dist',
  }
}
