const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const commonPaths = require('./commonPaths');

module.exports = {
  mode: 'development',
  entry: [
    "babel-polyfill", `${commonPaths.appEntry}/index.js`
  ],
  output: {
    filename: '[name].[hash].js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    hot: true,
    contentBase: './dist',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
  ]
}
