const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const commonPaths = require('./commonPaths');
const SriPlugin = require('webpack-subresource-integrity');

module.exports = {
  mode: 'production',
  entry: {
    app: [`${commonPaths.appEntry}/index.js`],
  },
  output: {
    filename: '[name].[hash].js',
    crossOriginLoading: 'anonymous',
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true,
    }),
  ],
};