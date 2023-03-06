import './app.css'
import { Counter } from './comps/counter/counter'
import { Frame3 } from './comps/frame3/frame3'

export const App = () => {
  return (
    <div classes={'app'}>
      <Frame3 />
      <Counter />
    </div>
  )
}
