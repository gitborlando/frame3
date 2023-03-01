import { Router } from 'frame3'
import './app.css'
import { Counter } from './counter'

export const App = () => {
  return (
    <>
      <Router path="abc/:init" component={Counter} />
    </>
  )
}
