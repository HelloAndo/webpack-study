const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const baseWebpackConfig = require('./webpack.base.config')
const config = require('./config/')

let webpackConfig = merge(baseWebpackConfig, {
  output: {
    filename: '[name]_[chunkhash:8].js',
    // path: config.build.assetsRoot,
    // publicPath: config.build.assetsPublicPath
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css`
    }),
    new DefinePlugin({
      'process.env': require('./config/prod.env')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      // sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // new ParallelUglifyPlugin({
    //   uglifyJS: {
    //     output: {
    //       beautify: false,
    //       comments: false
    //     },
    //     compress: {
    //       warnings: false,
    //       drop_console: true,
    //       collapse_vars: true,
    //       reduce_vars: true
    //     }
    //   }
    // })
  ]
})

module.exports = webpackConfig

console.log(webpackConfig)