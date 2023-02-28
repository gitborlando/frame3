```ts
import { effect } from 'frame3'

let $arr = [1, 2, 3]
let $arr2 = [100, 200, 300]

effect(() => {
  $arr.map((i) => {
    console.log(i)
  })
})
effect(() => {
  $arr2.map((i) => {
    console.log(i)
  })
})

setTimeout(() => {
  $arr.reverse()
  $arr2.reverse()
}, 1000)
```
