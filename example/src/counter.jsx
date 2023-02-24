import { $reactive, computed, effect } from 'frame3'
import './counter.css'

export default () => {
  let $counter = $reactive(1)

  effect(() => {
    console.log($counter)
  })

  return (
    <div className="center container">
      <div className="center operator" onClick={() => $counter--}>
        -
      </div>
      <div className="center shower">{$counter}</div>
      <div className="center operator" onClick={() => $counter++}>
        +
      </div>
    </div>
  )
}
