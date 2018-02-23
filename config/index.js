const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    proxyTable: {
      '/api': {
        target: 'http://localhost:3000',
        // target: 'http://test.com/',
        changeOrigin: true,
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
    assetsSubDir: 'static',
    assetsPublicPath: ''
  }
}