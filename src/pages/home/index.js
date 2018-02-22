import $ from 'jquery'

let render = require('./body/template.art')
// var template = require('art-template')
// var template = require('../../../node_modules/art-template/lib/')
// require('../main.css')
// $(() => {
  console.log(`home页--`)
  var html = render({
    list: [1,2,3,4],
    msg: 'hello world'
  })
  console.log(html)
  $('.home-wrapper').html(html)

  // template('./body/template.art', {
  //   list: [1, 2, 3]
  // })
// })


// 为了支持模块热替换
if (module.hot) {
  module.hot.accept();
}