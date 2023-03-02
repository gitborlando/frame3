/** vnode类型 */
export const VnodeType = {
  /** 元素节点类型 */
  element: 'element',
  /** 文本节点类型 */
  textNode: 'textNode',
  /** 片段节点类型 */
  fragment: 'fragment',
  /** 组件节点类型 */
  component: 'component',
} as const

/** jsx的tag标签, 可以是
 * - Function(组件)
 * - string(html标签)
 * - 0(document.createTextNode)
 * - \[\](jsx的这个`<></>`东东)
 */
export type IVnodeJsxTag = IComponentFunction | [] | string | 0
export type IVnodeType = (typeof VnodeType)[keyof typeof VnodeType]
export type IVnodeProps = Record<string, any> & { children?: any[] }

/**
 * 组件函数执行会返回一个渲染函数, 即这个`() => IVnode`.
 * 这个渲染函数每次更新都会执行, 并重新生成新的vnode.
 * 而组件函数本身则相当于`setup`函数, 只会执行一次.
 */
export type IComponentFunction = (props: IVnodeProps) => () => IVnode

/** 虚拟dom对象 */
export interface IVnodeBase {
  /** tag标签 例如input Dialog等 可以是函数或者字符串 */
  jsxTag: IVnodeJsxTag
  /** vnode的类型, 比如是dom节点还是组件或者其他啥的 */
  type: IVnodeType
  props: IVnodeProps
  key: any
}

export type IVnode = IComponentVnode | IFragmentVnode | IElementVnode | ITextNodeVnode

export type IComponentVnode = Omit<IVnodeBase, 'jsxTag'> & {
  /** 类似App, Button等的组件function */
  jsxTag: IComponentFunction
  el: Element | Text | null
  children: any[]
  componentInstance: IComponentInstance | null
}
export type IElementVnode = Omit<IVnodeBase, 'jsxTag'> & {
  /** dom的tag标签 */
  jsxTag: string
  el: Element | null
  children: IVnode[]
}
export type ITextNodeVnode = Omit<IVnodeBase, 'jsxTag'> & {
  /** textNode类型 */
  jsxTag: 0
  el: Text | null
  children: string[]
}
export type IFragmentVnode = Omit<IVnodeBase, 'jsxTag'> & {
  /** jsx里的`<></>`东东 */
  jsxTag: []
  el: Text | null
  anchor: Text | null
  children: any[]
}

export const LifeCycle = {
  beforeMount: 'beforeMount',
  mounted: 'mounted',
  beforeUpdate: 'beforeUpdate',
  updated: 'updated',
  beforeUnMount: 'beforeUnMount',
  unMounted: 'unMounted',
} as const

/** 六个生命周期类型 */
export type ILifeCycleTypes = (typeof LifeCycle)[keyof typeof LifeCycle]

/**
 * 组件实例
 */
export interface IComponentInstance {
  isMounted: boolean
  subVnode: IVnode
  props: IVnodeProps
  lifeCycles: Record<ILifeCycleTypes, Set<Function>>
  update: IEffectCallback
  /** 父组件更新导致的被动更新 */
  passiveUpdate(props: IVnodeProps, children: any): void
}

export interface IEffectCallback {
  (): void
  active: boolean
  scheduler?: Function
}
