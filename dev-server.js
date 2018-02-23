const express = require('express')
const webpack = require('webpack')
const merge = require('webpack-merge')
const proxy = require('http-proxy-middleware')

const webpackConfig = require('./webpack.dev.config')
const proxyTable = require('./config').dev.proxyTable
const PORT = require('./config').dev.port

const app = express()

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxy(options.filter || context, options))
  // app.use(context, proxy(options))
})


const compiler = webpack(webpackConfig)
app.use(require('webpack-dev-middleware')(compiler))
app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static('.'))

app.listen(PORT, () => {
  console.log(`http service in ${PORT}`)
})