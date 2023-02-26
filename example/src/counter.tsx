import { effect } from 'frame3'
import './counter.css'

interface ICounterProps {
  init: number
}

export const Counter = ({ init }: ICounterProps) => {
  let $counter = init
  effect(() => console.log('props', $counter))

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
