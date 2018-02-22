const webpack = require('webpack')
const merge = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const baseWebpackConfig = require('./webpack.base.config')

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr';

Object.keys(baseWebpackConfig.entry).forEach(name => {
  // HMR client
  // let _val = baseWebpackConfig.entry[name]
  // baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client'].concat(baseWebpackConfig.entry[name])
  baseWebpackConfig.entry[name] = [`${hotMiddlewareScript}&name=${name}`].concat(baseWebpackConfig.entry[name])
})
console.log(baseWebpackConfig.entry)
const config = merge(baseWebpackConfig, {
  plugins: [
    new HotModuleReplacementPlugin()
  ]
})

module.exports = config






