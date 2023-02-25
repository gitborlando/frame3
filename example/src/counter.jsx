import { $reactive, effect } from 'frame3'
import './counter.css'

export const Counter = ({ init }) => {
  let $counter = $reactive(init)
  effect(() => {
    console.log('props', $counter)
  })

  return (
    <div className="center container">
      {/* {console.log('child render')} */}
      <div className="center operator" onClick={() => $counter--}>
        -
      </div>
      {console.log('child render')}
      <div className="center shower">{$counter}</div>
      <div className="center operator" onClick={() => $counter++}>
        +
      </div>
    </div>
  )
}
