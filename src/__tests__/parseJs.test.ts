import generate from '@babel/generator'
import { parse } from '@babel/parser'
import { parseLabel } from '../parse'

describe('parsejs', () => {
  test('parseLabel', () => {
    expect(testParseLabel('ref: a = 0')).toBe('const a = frame.reactive(0);')
    expect(testParseLabel('ref: a = [1, 2, 3]')).toBe('const a = frame.reactive([1, 2, 3]);')
    expect(testParseLabel('ref: a = true')).toBe('const a = frame.reactive(true);')
    expect(testParseLabel('ref: a = "abcd"')).toBe('const a = frame.reactive("abcd");')
    expect(testParseLabel('ref: a = 0')).toBe('const a = frame.reactive(0);')
  })
})

function testParseLabel(js: string): string {
  const ast = parse(js)
  parseLabel(ast, 'browser')
  return generate(ast).code
}
