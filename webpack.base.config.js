const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

const { WebPlugin, AutoWebPlugin } = require('web-webpack-plugin');

const config = require('./config/')
const utils = require('./utils')

// const autoPlugin = new AutoWebPlugin(path.resolve('..', 'src/pages'), {
const autoPlugin = new AutoWebPlugin('./src/pages', {
  template: pagename => {
    return path.resolve(__dirname, './src/pages', pagename, 'template.html')
  },
  // these chunk entrys will be injected to htmls automatically 
  // preEntrys: ['./src/pages/main.css', './src/pages/main.js'],
  // preEntrys: ['./src/pages/main.css', 'babel-polyfill'],
  preEntrys: ['./src/pages/main.css'],
  entry: {}
})
// console.log(autoPlugin.entry())
let webpackConfig = {
  // context: path.resolve(__dirname, '../'),
  entry: autoPlugin.entry({
    // these chunk entrys will not be injected to htmls automatically
    app: './src/pages/main.js'
  }),
  output: {
    // server模式下不能使用chunkhash？
    filename: '[name].js',
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css$/,
        // HMR is not work on style updated when useing extract-text-webpack-plugin 
        // minimize开启cssnano
        use: ['style-loader', 'css-loader?minimize'],
      },
      {
        test: /\.styl$/,
        use: 'style-loader|css-loader?minimize|stylus-loader'.split('|')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 500 * 1024,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.art$/,
        use: ['art-template-loader']
      }
    ]
  },
  plugins: [
    autoPlugin
  ]
}
// customize parts of entrys added to some output html files
webpackConfig.entry.home.unshift(`./src/pages/main.js`)

module.exports = webpackConfig
