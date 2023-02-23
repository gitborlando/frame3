import { reactive } from '../../lib'

export function useCounter() {
  let $counter = reactive(1)

  const setCounter = (n) => ($counter = n)
  return { $counter, setCounter }
}
