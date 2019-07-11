const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseHref = '/';
const resolvePaths = folder => {
  return path.resolve(__dirname, `../src/${folder}/`);
};

module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
      components: resolvePaths('components'),
      constants: resolvePaths('constants'),
      lib: resolvePaths('lib'),
      pages: resolvePaths('pages'),
      services: resolvePaths('services'),
      store: resolvePaths('store'),
      styles: resolvePaths('styles'),
      utils: resolvePaths('utils'),
    },
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new BaseHrefWebpackPlugin({ baseHref: baseHref }),
    new CopyWebpackPlugin(
      [
        {
          from: 'src/assets',
          to: 'assets',
        },
        {
          from: 'env.js',
        },
        {
          from: 'canvasToBlob.js',
        },
      ],
      {
        force: true,
        flatten: true,
      },
    ),
  ],
  node: {
    fs: 'empty',
  },
};
