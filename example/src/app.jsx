import { $reactive, $ref, effect } from 'frame3'
import { Counter } from './counter'

export const App = () => {
  let $counters = $reactive([0, 1, 2])

  return (
    <div className="root">
      {$counters.map((i) => (
        <Counter init={i}></Counter>
      ))}
      <button onClick={() => $counters.reverse()}>reverse</button>
    </div>
  )
}
