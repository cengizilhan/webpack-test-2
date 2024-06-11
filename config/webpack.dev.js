// webpack.dev.js
const { merge } = require('webpack-merge')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
    open: true,
    hot: true,
    port: 9002,
    proxy: {
      '/api': 'http://localhost:9000'
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
})
