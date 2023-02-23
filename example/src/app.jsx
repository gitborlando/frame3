import { computed, effect, reactive, h } from '../../lib'
import Child from './child'
import './counter.css'
import { useCounter } from './counter.hook'

export default () => {
  let { $counter, setCounter } = useCounter()

  let $sizeRate = computed(() => $counter)
  let $name = reactive(['jack', 'Mike', 'Alice'])

  effect(() => {
    console.log($counter)
  })

  return (
    <div className="center container">
      <div className="center operator" onClick={() => setCounter($counter - 1)}>
        -
      </div>
      <div className="center shower">{$counter}</div>
      <div className="center operator" onClick={() => setCounter($counter + 1)}>
        +
      </div>
      {$name.map((i) => (
        <Child name={i}></Child>
      ))}
    </div>
  )
}
