// import { mount } from 'frame3'
// import App from './app'

import { reactive, effect, computed, $reactive, $computed } from 'frame3'
// import { $goods } from './store'

// mount(App, document.body)
// let $a = $reactive(0)

// effect(() => {
//   const $o = $computed(() => {
//     // console.log('%cgit@index::11', 'color:deeppink;font-weight:600', $a)
//     return { aa: 'oo' }
//   })
//   console.log(window.o, $o)
//   if (!window.o) window.o = $o
//   console.log(window.o, $o)
//   console.log(window.o === $o)

//   console.log($a, 'a')
// })

// // setInterval(() => {
// //   $a++
// // }, 500)
// $a++
// $a++

export let $goods = $reactive([])

effect(() => {
  console.log($goods)
})

$goods[0] = 1
$goods.push(2)
