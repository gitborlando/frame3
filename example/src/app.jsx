import { $reactive, $ref, effect } from 'frame3'
import { Counter } from './counter'

export const App = () => {
  let $counter = $reactive(1)
  let $child = $ref(Counter)

  effect(() => console.log('child', { ...$child }))

  return (
    <div className="root">
      parent is {$counter}
      <Counter ref={$child} $counter></Counter>
    </div>
  )
}
