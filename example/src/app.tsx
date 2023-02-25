import { h } from 'frame3'
import { Counter } from './counter'

export const App = () => {
  let $counters = [0, 1, 2]

  let $res = ''
  fetch('http://localhost:8888').then(async (r) => {
    $res = await r.text()
    console.log('fetch')
  })

  return (
    <div>
      {$counters.map((i) => (
        <Counter init={i}></Counter>
      ))}
      {console.log('rendered')}
      <h1>res: {$res}</h1>
      <button onClick={() => $counters.reverse()}>reverse</button>
    </div>
  )
}
