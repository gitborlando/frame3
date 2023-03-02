import { $computed } from 'frame3'
import { $size, setSize } from '../../store/size'
import './counter.css'

export const Counter = () => {
  let $outOfBound = $computed(() => $size <= 0)

  return (
    <>
      {$outOfBound && <span className="outOfBound">out of bound</span>}
      <div className={`center container ${$outOfBound && 'outOfBound'}`}>
        <div className="center operator" onClick={() => !$outOfBound && setSize($size - 1)}>
          -
        </div>
        <div className="center shower">{$size}</div>
        <div className="center operator" onClick={() => setSize($size + 1)}>
          +
        </div>
      </div>
    </>
  )
}
