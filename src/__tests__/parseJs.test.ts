import generate from '@babel/generator'
import { parse } from '@babel/parser'
import { parseLabelStatement } from '../parse'

describe('parseLabel', () => {
  test('ref label', () => {
    expect(testParseLabel('ref: a = 0')).toBe('const a = frame.reactive(0);')
    expect(testParseLabel('ref: a = [1, 2, 3]')).toBe('const a = frame.reactive([1, 2, 3]);')
    expect(testParseLabel('ref: a = true')).toBe('const a = frame.reactive(true);')
    expect(testParseLabel('ref: a = "abcd"')).toBe('const a = frame.reactive("abcd");')
    expect(testParseLabel('ref: a = 0')).toBe('const a = frame.reactive(0);')
  })

  test('effect label', () => {
    expect(testParseLabel('effect: a = 0')).toBe('frame.effect(() => a = 0);')
    expect(testParseLabel('effect: a = [1, 2, 3]')).toBe('frame.effect(() => a = [1, 2, 3]);')
    expect(testParseLabel('effect: () => a = true')).toBe('frame.effect(() => a = true);')
  })

  test('computed label', () => {
    expect(testParseLabel('computed: b = a * 2')).toBe('const b = frame.computed(() => a * 2);')
    expect(
      testParseLabel(
        `computed: b = () => {
  let i = 10
  return a * i
}`
      )
    ).toBe(`const b = frame.computed(() => {
  let i = 10;
  return a * i;
});`)
  })
})

function testParseLabel(js: string): string {
  const ast = parse(js)
  parseLabelStatement(ast)
  return generate(ast).code
}
