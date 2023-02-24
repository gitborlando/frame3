import { $reactive, computed, effect } from 'frame3'
import './counter.css'

export default () => {
  let $counter = $reactive(1)
  let $a = $reactive(0)
  effect(() => {
    const o = computed(() => ({}))
    window.o || (window.o = o.value)
    console.log(window.o === o.value, $a)
  })

  setInterval(() => {
    $a++
  }, 100)

  return (
    <div className="center container">
      <div className="center operator" onClick={() => $counter--}>
        -
      </div>
      {console.log(123)}
      <div className="center shower">{$counter}</div>
      {() => {}}
      <div className="center operator" onClick={() => $counter++}>
        +
      </div>
    </div>
  )
}
