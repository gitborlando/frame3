import {
  IComponentFunction,
  IComponentVnode,
  IElementVnode,
  ITextNodeVnode,
  IVnode,
  IVnodeJsxTag,
  IVnodeProps,
  VnodeType,
} from './types'
import { is, vnodeIs } from '../shared/utils'
import { mountComponentVnode as mountComponentVnode, passiveUpdateComponent } from './component'
import {
  mountElement as mountElementVnode,
  mountTextNode as mountTextNodeVnode,
  updateElement,
  updateTextNode,
} from './render-dom'

/**
 * @description 生成 vnode 的函数
 * @param jsxTag jsx的tag, 比如div, App等
 * @param props 函数组件的props作为vnode的props
 * @param children jsx的子节点
 * @returns 返回vnode
 */
export function h(jsxTag: 0, props: IVnodeProps, children: any[]): ITextNodeVnode
export function h(jsxTag: string, props: IVnodeProps, children: any[]): IElementVnode
export function h(jsxTag: IComponentFunction, props: IVnodeProps, children: never[]): IComponentVnode
export function h(jsxTag: IVnodeJsxTag, props: IVnodeProps, children: any[]): IVnode {
  const vnodeBase = {
    props,
    children,
    el: null,
    componentInstance: null,
    key: props.key,
  }

  if (jsxTag === 0) {
    return { type: VnodeType.textNode, jsxTag, ...vnodeBase }
  }
  if (is.string(jsxTag)) {
    vnodeBase.children = specialDealVnodeChildren(vnodeBase.children)
    return { type: VnodeType.element, jsxTag, ...vnodeBase }
  }
  return { type: VnodeType.component, jsxTag, ...vnodeBase }
}

/**
 * @description 将类型为字符串和数字的child包裹成`h(0('textNode'),{},[])`的形式
 * @param child vnode的children
 */
export function specialDealVnodeChildren(children: any[]): IVnode[] {
  const newVnodeChildren: IVnode[] = []
  children.forEach((child) => {
    if (is.string(child) || is.number(child)) return newVnodeChildren.push(h(0, {}, [child]))
    if (is.array(child)) return newVnodeChildren.push(...specialDealVnodeChildren(child))
    if (is.undefined(child) || is.null(child)) return
    newVnodeChildren.push(child)
  })
  return newVnodeChildren
}

export function mount(vnode: IVnode, parentDom: Element): void
export function mount(componentFunction: IComponentFunction, parentDom: Element): void
export function mount(toMount: IVnode | IComponentFunction, parentDom: Element): void {
  const componentFunction = typeof toMount === 'function' ? toMount : () => () => toMount
  mountComponentVnode(h(componentFunction, {}, []), parentDom)
}

/**
 * @description 从虚拟dom中创建真实dom节点并挂载到目标dom节点
 * @param vnode 虚拟dom对象
 * @param parentDom 真实dom节点
 * @returns
 */
export function mountVnode(vnode: IVnode, parentDom: Element) {
  if (vnodeIs.component(vnode)) {
    return mountComponentVnode(vnode, parentDom)
  }
  if (vnodeIs.element(vnode)) {
    return mountElementVnode(vnode, parentDom)
  }
  if (vnodeIs.textNode(vnode)) {
    return mountTextNodeVnode(vnode, parentDom)
  }
}

export function updateVnode(preVnode: IVnode, currentVnode: IVnode, parentDom: Element) {
  if (vnodeIs.component(currentVnode) && vnodeIs.component(preVnode)) {
    return passiveUpdateComponent(preVnode, currentVnode, parentDom)
  }
  if (vnodeIs.element(currentVnode) && vnodeIs.element(preVnode)) {
    return updateElement(preVnode, currentVnode, parentDom)
  }
  if (vnodeIs.textNode(currentVnode) && vnodeIs.textNode(preVnode)) {
    return updateTextNode(preVnode, currentVnode, parentDom)
  }

  unmountVnode(preVnode)
  mountVnode(currentVnode, parentDom)
}

export function unmountVnode(vnode: IVnode) {
  if (vnodeIs.component(vnode) && vnode.componentInstance) {
    unmountVnode(vnode.componentInstance.subVnode)
  } else {
    vnode.el?.remove()
  }
}
