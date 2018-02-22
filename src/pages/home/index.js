// require('babel-polyfill')

import $ from 'jquery'

let render = require('./body/template.art')
// require('../main.css')
require('./index.styl')


let delay = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time} later ...`)
    }, time);
  })
}

$(() => {
  console.log(`home页--`)

  // art-template
  var html = render({
    list: [1,2,3,4],
    msg: 'hello world'
  })
  $('.home-wrapper').html(html)

  // es7
  // ;(async () => {
  //   let time1 = await delay(200)
  //   let time2 = await delay(800)
  //   let time3 = await delay(1500)
  //   console.log(time1)
  //   console.log(time2)
  //   console.log(time3)
  // })()



  // es6
  // let _flag = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve('time up')
  //   }, 2000);
  // })
  // // let _flag = Promise.resolve('time up')
  // _flag.then(data => {
  //   console.log(data)
  // })

  // let o = {a: 'a'}
  // let _obj = Object.assign(o, {b: 'b'})
  // console.log(_obj)


  // var arrayLike = {
  //   '0': 1,
  //   '1': 2,
  //   '2': 3,
  //   length: 3
  // };
  // // Array.from为ES6新添加的方法
  // var arr2 = Array.from(arrayLike, x => x + x);
  // console.log(arr2); // [2, 4, 6]


})


// 为了支持模块热替换
if (module.hot) {
  module.hot.accept();
}