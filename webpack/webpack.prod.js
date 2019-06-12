const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const commonPaths = require('./commonPaths');
const SriPlugin = require('webpack-subresource-integrity');

module.exports = {
  mode: 'production',
  entry: [
    "babel-polyfill", `${commonPaths.appEntry}/index.js`
  ],
  output: {
    filename: '[name].[hash].js',
    crossOriginLoading: 'anonymous',
  },
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    hot: true,
    contentBase: './dist',
    publicPath: '/',
    public: process.env.DOMAIN_NAME,
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      uglifyOptions: {
        warnings: false,
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,
        },
        output: {
          comments: false,
        },
      }
    }),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true,
    }),
  ],
};
