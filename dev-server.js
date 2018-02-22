const express = require('express')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.dev.config')

const PORT = 3300

const app = express()
const compiler = webpack(webpackConfig)
app.use(require('webpack-dev-middleware')(compiler))
app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static('.'))

app.listen(PORT, () => {
  console.log(`http service in ${PORT}`)
})