import { IComponentVnode, IElementVnode, ITextNodeVnode, IVnode, VnodeType } from '../runtime/types'

export const isBrowser = () => !!globalThis.window

export const NAME = 'frame3'

export const is = {
  string: (obj: any): obj is string => Object.prototype.toString.call(obj) === '[object String]',
  number: (obj: any): obj is number => Object.prototype.toString.call(obj) === '[object Number]',
  boolean: (obj: any): obj is boolean => Object.prototype.toString.call(obj) === '[object Boolean]',
  undefined: (obj: any): obj is undefined => Object.prototype.toString.call(obj) === '[object Undefined]',
  null: (obj: any): obj is undefined => Object.prototype.toString.call(obj) === '[object Null]',
  function: (obj: any): obj is Function => Object.prototype.toString.call(obj) === '[object Function]',
  object: (obj: any): obj is object => Object.prototype.toString.call(obj) === '[object Object]',
  array: (obj: any): obj is any[] => Object.prototype.toString.call(obj) === '[object Array]',
}

export const vnodeIs = {
  component: (vnode: IVnode | null): vnode is IComponentVnode => vnode?.type === VnodeType.component,
  element: (vnode: IVnode | null): vnode is IElementVnode => vnode?.type === VnodeType.element,
  textNode: (vnode: IVnode | null): vnode is ITextNodeVnode => vnode?.type === VnodeType.textNode,
}
