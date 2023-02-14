import { computed, effect, reactive } from '../core/reactive'

describe('effect api', () => {
  test('0 => self plus', () => {
    let result
    const obj = reactive(0)
    effect(() => {
      result = obj.value
    })
    obj.value++
    expect(result).toBe(1)
  })

  test('[1, 2, 3] => push, pop, unshift, shift', () => {
    let result
    const obj = reactive([1, 2, 3])
    effect(() => {
      result = obj.value
    })
    obj.value.push(4)
    obj.value.pop()
    obj.value.unshift(0)
    obj.value.shift()
    expect(result).toEqual([1, 2, 3])
  })
})

describe('computed api', () => {
  test('1 => multiply 2', () => {
    let result
    const obj = reactive(1)
    const compute = computed(() => obj.value * 2)
    effect(() => {
      result = compute.value
    })
    obj.value++
    obj.value++
    expect(result).toBe(6)
  })
})
