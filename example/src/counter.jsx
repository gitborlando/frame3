import { $ref, effect } from 'frame3'
import './counter.css'

export const Counter = ({ $counter }) => {
  effect(() => {
    console.log($counter)
  })

  let $div = $ref('div')

  return (
    <div ref={$div} className="center container">
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
