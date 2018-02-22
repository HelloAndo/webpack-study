const webpack = require('webpack')
const path = require('path')
const rm = require('rimraf')

const webpackConfig = require('./webpack.prod.config')
const config = require('./config/')

rm(config.build.assetsRoot, err => {
  if (err) throw err
  // fallback is needed
  webpack(webpackConfig, () => {})
})