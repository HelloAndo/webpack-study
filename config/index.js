const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: '',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: 'localhost',
    port: 3300
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDir: './static',
    assetsPublicPath: './'
  }
}