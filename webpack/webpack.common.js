const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseHref = "/";

module.exports = {
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader','sass-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new BaseHrefWebpackPlugin({baseHref: baseHref}),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }, {
        from: 'env.js'
    }], {
      force: true,
      flatten: true
    })
  ],
  node: {
    fs: 'empty'
  }
};
