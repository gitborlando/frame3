import { $computed, Router } from 'frame3'
import './app.css'

const Comp1 = ({ id }) => {
  return () => <h1>ABC-{id}</h1>
}
const Comp2 = () => () => <h2>CBD</h2>

export const App = () => {
  let $random = 0
  setInterval(() => {
    $random = Math.random() * 1000
  }, 100)
  return () => (
    <>
      <a href={'#abc/' + $random}>abc</a>
      <br></br>
      <a href="#cbd">cbd</a>
      <Router path="abc/:id">{Comp1}</Router>
      <Router path="cbd">{Comp2}</Router>
    </>
  )
}
