import { $reactive, $ref, effect } from 'frame3'
import { Counter } from './counter'

export const App = () => {
  let $counter = $reactive(1)

  setInterval(() => {
    $counter++
  }, 100)

  return (
    <div className="root">
      parent is {$counter}
      <Counter $counter></Counter>
    </div>
  )
}
