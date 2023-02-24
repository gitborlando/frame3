/** vnode类型 */
export const VnodeType = {
  /** 元素节点类型 */
  element: 'element' as const,
  /** 文本节点类型 */
  textNode: 'textNode' as const,
  /** 组件节点类型 */
  component: 'component' as const,
}

/** jsx的tag标签, 可以是Fuction(组件), string(html标签), 0(document.createTextNode) */
export type IVnodeJsxTag = IComponentFunction | string | 0
export type IVnodeType = typeof VnodeType[keyof typeof VnodeType]
export type IVnodeProps = Record<string, any>
export type IComponentFunction<P extends IVnodeProps = {}> = (props: P) => () => IVnode

/** 虚拟dom对象 */
export interface IVnodeBase {
  /** tag标签 例如input Dialog等 可以是函数或者字符串 */
  jsxTag: IVnodeJsxTag
  /** vnode的类型, 比如是dom节点还是组件或者其他啥的 */
  type: IVnodeType
  props: IVnodeProps
  componentInstance: IComponentInstance | null
  key: any
}

export type IVnode = IComponentVnode | IElementVnode | ITextNodeVnode

export type IComponentVnode = Omit<IVnodeBase, 'jsxTag'> & {
  /** 类似App, Button等的组件function */
  jsxTag: IComponentFunction
  el: Element | Text | null
  children: any[]
}
export type IElementVnode = Omit<IVnodeBase, 'jsxTag' | 'el' | 'componentInstance'> & {
  /** dom的tag标签 */
  jsxTag: string
  el: Element | null
  children: IVnode[]
}
export type ITextNodeVnode = Omit<IVnodeBase, 'jsxTag' | 'el' | 'componentInstance' | 'children'> & {
  /** dom的tag标签 */
  jsxTag: 0
  el: Text | null
  children: string[]
}

export interface IComponentInstance {
  update(): void
  isMounted: boolean
  subVnode: IVnode
}
