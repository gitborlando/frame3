import { $reactive, $ref, effect } from 'frame3'
import './counter.css'

export const Counter = ({ $counter }) => {
  effect(() => {
    console.log('props', $counter)
  })

  let $div = $ref('div')

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
