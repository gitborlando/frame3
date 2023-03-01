import { $reactive } from 'frame3'
import './counter.css'

interface ICounterProps {
  init: number
}

export const Counter = ({ init }: ICounterProps) => {
  let $counter = init
  let $ref = $reactive<HTMLDivElement>()
  return (
    <div ref={$ref} className="center container">
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
