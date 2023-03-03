import { $size } from '~/store/size'
import shiyangyang from '../../assets/shiyangyang.jpeg'
import './frame3.css'

export const Frame3 = () => {
  cssVariables: $size
  return (
    <div class="frame3">
      <img class="image" src={shiyangyang}></img>
      <h1>Frame3</h1>
    </div>
  )
}
