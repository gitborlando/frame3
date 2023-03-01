import './app.css'
import { Counter } from './pages/counter/counter'
import { Frame3 } from './pages/frame3/frame3'

export const App = () => {
  return (
    <div class="app">
      <Frame3 />
      <Counter />
    </div>
  )
}
