const webpack = require('webpack')
const merge = require('webpack-merge')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

const config = require('./config')
const baseWebpackConfig = require('./webpack.base.config')

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr';
// const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=10000';

Object.keys(baseWebpackConfig.entry).forEach(name => {
  // HMR client
  baseWebpackConfig.entry[name] = [`${hotMiddlewareScript}&name=${name}`].concat(baseWebpackConfig.entry[name])
})
// console.log(baseWebpackConfig.entry)
const webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': require('./config/dev.env')
    })
  ]
})

module.exports = webpackConfig





