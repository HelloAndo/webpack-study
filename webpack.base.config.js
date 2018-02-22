const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

const { WebPlugin, AutoWebPlugin } = require('web-webpack-plugin');

// const autoPlugin = new AutoWebPlugin(path.resolve('..', 'src/pages'), {
const autoPlugin = new AutoWebPlugin('./src/pages', {
  template: pagename => {
    return path.resolve(__dirname, './src/pages', pagename, 'template.html')
  },
  // these chunk entrys will be injected to htmls automatically 
  // preEntrys: ['./src/pages/main.css', './src/pages/main.js'],
  preEntrys: ['./src/pages/main.css'],
  entry: {}
})
// console.log(autoPlugin.entry())
let config = {
  entry: autoPlugin.entry({
    // these chunk entrys will not be injected to htmls automatically
    app: './src/pages/main.js'
  }),
  output: {
    // server模式下不能使用chunkhash？
    filename: '[name]_[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
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
        // use: ExtractTextPlugin.extract({
          use: ['style-loader', 'css-loader'],
          // use: ['css-loader'],
        // })
      },
      {
        test: /\.art$/,
        use: ['art-template-loader']
      }
    ]
  },
  plugins: [
    autoPlugin,
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css`
    })
  ]
}
// customize parts of entrys added to some output html files
config.entry.home.unshift(`./src/pages/main.js`)

module.exports = config

// console.log(`------`, config.entry)