import { Counter } from './counter'

export const App = () => {
  abc()
  return (
    <div>
      <Counter init={0}></Counter>
    </div>
  )
}
