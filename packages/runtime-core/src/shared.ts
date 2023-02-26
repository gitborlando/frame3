export const is = {
  string: (obj: any): obj is string => Object.prototype.toString.call(obj) === '[object String]',
  number: (obj: any): obj is number => Object.prototype.toString.call(obj) === '[object Number]',
  boolean: (obj: any): obj is boolean => Object.prototype.toString.call(obj) === '[object Boolean]',
  undefined: (obj: any): obj is undefined => Object.prototype.toString.call(obj) === '[object Undefined]',
  null: (obj: any): obj is undefined => Object.prototype.toString.call(obj) === '[object Null]',
  function: (obj: any): obj is Function => Object.prototype.toString.call(obj) === '[object Function]',
  object: (obj: any): obj is object => Object.prototype.toString.call(obj) === '[object Object]',
  array: (obj: any): obj is any[] => Object.prototype.toString.call(obj) === '[object Array]',
  multi(obj: any, types: string): boolean {
    // @ts-ignore
    return types.split('|').some((type) => this[type.trim()]?.(obj))
  },
}
