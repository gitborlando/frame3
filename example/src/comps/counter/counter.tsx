import { $computed } from 'frame3'
import { $size, setSize } from '../../store/size'
import { Flex } from '../flex/flex'
import './counter.css'

export const Counter = () => {
  let $outOfBound = $computed(() => $size <= 0)

  return (
    <>
      {$outOfBound && <span className="outOfBound">out of bound</span>}
      <Flex className={`container ${$outOfBound && 'outOfBound'}`}>
        <Flex className="operator" onClick={() => !$outOfBound && setSize($size - 1)}>
          -
        </Flex>
        <Flex className="shower">{$size}</Flex>
        <Flex className="operator" onClick={() => setSize($size + 1)}>
          +
        </Flex>
      </Flex>
    </>
  )
}
