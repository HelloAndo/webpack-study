const express = require('express')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.dev.config')

const PORT = require('./config').dev.port

const app = express()
const compiler = webpack(webpackConfig)


var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

app.use(require('webpack-dev-middleware')(compiler))
// app.use(require('webpack-hot-middleware')(compiler))
app.use(hotMiddleware)

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(express.static('.'))

app.listen(PORT, () => {
  console.log(`http service in ${PORT}`)
})