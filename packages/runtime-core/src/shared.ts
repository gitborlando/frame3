import { IComponentVnode, IElementVnode, IFragmentVnode, ITextNodeVnode, IVnode, VnodeType } from './types'

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

export const vnodeIs = {
  component: (vnode: IVnode | null): vnode is IComponentVnode => vnode?.type === VnodeType.component,
  fragment: (vnode: IVnode | null): vnode is IFragmentVnode => vnode?.type === VnodeType.fragment,
  element: (vnode: IVnode | null): vnode is IElementVnode => vnode?.type === VnodeType.element,
  textNode: (vnode: IVnode | null): vnode is ITextNodeVnode => vnode?.type === VnodeType.textNode,
}
