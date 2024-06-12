// webpack.dev.js
const { merge } = require('webpack-merge')
const path = require('path')
const paths = require('./paths')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '/')
    },
    compress: true,
    historyApiFallback: true,
    https: false,
    //open: true,
    hot: true,
    port: 9002,
    proxy: {
      '/api': 'http://localhost:9000'
    },
    // devMiddleware: {
    //   writeToDisk: true,
    // },
    // watch changes in the files for live reload
    // to see generated files in serv mode, open http://localhost:9002/webpack-dev-server
    watchFiles: {
      paths: ['Static/src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
})
