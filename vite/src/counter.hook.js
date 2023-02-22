import { reactive } from '../../lib/index'

export function useCounter() {
  const counter = reactive(0)
  const setCounter = (n) => (counter.value = n)
  return { counter, setCounter }
}
