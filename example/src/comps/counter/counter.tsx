import { $computed } from 'frame3'
import { $size, setSize } from '../../store/size'
import { Flex } from '../flex/flex'
import './counter.css'

export const Counter = () => {
  let $outOfBound = $computed(() => $size <= 0)

  return (
    <>
      <span style-show={$outOfBound} classes={'outOfBound'}>
        out of bound
      </span>
      <Flex classes={['container', $outOfBound && 'outOfBound']}>
        <Flex classes={'operator'} onClick={() => !$outOfBound && setSize($size - 1)}>
          -
        </Flex>
        <Flex classes={'shower'}>{$size}</Flex>
        <Flex classes={'operator'} onClick={() => setSize($size + 1)}>
          +
        </Flex>
      </Flex>
    </>
  )
}
