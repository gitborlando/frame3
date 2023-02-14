import { computed, effect, reactive } from '../core/reactive'

describe('effect api', () => {
  test('{ value: 0 } => self plus', () => {
    let result
    const obj = reactive({ value: 0 })
    effect(() => {
      result = obj.value
    })
    obj.value++
    expect(result).toBe(1)
  })

  test('{ value: [1, 2, 3] } => push, pop, unshift, shift', () => {
    let result
    const obj = reactive({ value: [1, 2, 3] })
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
  test('{ value: 1 } => self multiply', () => {
    let result
    const obj = reactive({ value: 1 })
    const compute = computed(() => obj.value * 2)
    effect(() => {
      result = compute.value
    })
    obj.value++
    obj.value++
    expect(result).toBe(6)
  })
})
