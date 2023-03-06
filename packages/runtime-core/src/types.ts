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

/** 四个vnode类型 */
export type IVnodeType = (typeof VnodeType)[keyof typeof VnodeType]
export type IVnodeProps = Record<string, any>

/**
 * 组件函数执行会返回一个渲染函数, 即这个`() => IVnode`.
 * 这个渲染函数每次更新都会执行, 并重新生成新的vnode.
 * 而组件函数本身则相当于`setup`函数, 只会执行一次.
 */
export type IComponentFunction = (props: IVnodeProps) => () => IVnode

/** 虚拟dom对象 */
export type IVnodeBase = {
  /** vnode的类型, 比如是dom节点还是组件或者其他啥的 */
  type: IVnodeType
  props: IVnodeProps
  key: any
}

/** 组件vnode | <></>vnode | 原生element vnode | 文本节点vnode */
export type IVnode = IComponentVnode | IFragmentVnode | IElementVnode | ITextNodeVnode

/** 组件vnode */
export type IComponentVnode = Omit<IVnodeBase, 'jsxTag'> & {
  /**
   * 类似App, Button等, 其执行会返回一个渲染函数, 由渲染函数生成vnode
   */
  componentFunction: IComponentFunction
  componentInstance: IComponentInstance | null
  el: Element | Text | null
  children: any[]
}
/** 原生element vnode */
export type IElementVnode = Omit<IVnodeBase, 'jsxTag'> & {
  /** 原生的 html 标签 */
  tagName: string
  el: Element | null
  children: IVnode[]
}
/** 文本节点vnode */
export type ITextNodeVnode = Omit<IVnodeBase, 'jsxTag'> & {
  el: Text | null
  children: string[]
}
/**
 * jsx里的`<></>`这种东东, 文档片段vnode
 *
 * 由于是文档片段, 所以其并没有一个"独享的"父真实节点, 而是和其他vnode共享一个父真实节点.
 * 所以需要一前一后连个空的textNode节点来确定位置(空的textNode在其父节点内真实存在, 但不会被绘制到页面上).
 */
export type IFragmentVnode = Omit<IVnodeBase, 'jsxTag'> & {
  /** 空textNode */
  el: Text | null
  /** 空textNode */
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

/** 组件实例 */
export type IComponentInstance = {
  isMounted: boolean
  /** 子级 vnode */
  subVnode: IVnode
  /** 组件函数的arguments(一个对象) */
  props: IVnodeProps
  lifeCycles: Record<ILifeCycleTypes, Set<Function>>
  /** 组件更新, 如果vnode没挂载就挂载, 挂载了就更新 */
  update: IEffectCallback
  /**
   * 父组件更新导致的被动更新. 会传入新的props和children,
   * 并重新执行组件函数生成新的渲染函数, 渲染函数执行生成新的vnode
   */
  passiveUpdate(props: IVnodeProps, children: any): void
}

/** 在effect api调用时传入的回调, 不过经过了特殊处理 */
export type IEffectCallback = {
  (): void
  /** 组件卸载时置为false, false了的回调不再执行 */
  active: boolean
  /** 调度器 */
  scheduler?: Function
}
