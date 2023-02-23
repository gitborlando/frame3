import { reactive } from '../../lib'

export default ({ name }) => {
  const $a = reactive()
  return <div>i am child, my name is {name}</div>
}
