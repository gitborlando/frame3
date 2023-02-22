import { effect } from '../../lib/index'
import { useCounter } from './counter.hook'

const { counter, setCounter } = useCounter()

effect(() => {
  console.log(counter.value)
})

jsx: <div className="center container">
  <div className="center operator" onClick={() => setCounter(counter.value - 1)}>
    -
  </div>
  {console.log('child render')}
  <div className="center shower">{counter.value}</div>
  <div className="center operator" onClick={() => setCounter(counter.value + 1)}>
    +
  </div>
</div>
