import { mountComponentVnode, unMountComponentVnode, updateComponentVnode } from './component'
import { diffVnodeChildren } from './diff'
import {
  getCurrentRenderContext,
  insertChild,
  remove,
  setCurrentRenderContext,
  setTextContent,
  setVnodePropsToDomAttribute,
} from './render-dom'
import { is, vnodeIs } from './shared'
import {
  IComponentFunction,
  IComponentVnode,
  IElementVnode,
  IFragmentVnode,
  ITextNodeVnode,
  IVnode,
  IVnodeJsxTag,
  IVnodeProps,
  VnodeType,
} from './types'

/**
 * @description 生成 vnode 的函数
 * @param jsxTag jsx的tag, 比如div, App等, 可以是函数, 字符串, 空数组, 或 0
 * @param props 函数组件的props作为vnode的props
 * @param children jsx的子节点
 * @returns 返回vnode
 */
export function h(jsxTag: 0, props?: IVnodeProps, children?: any[]): ITextNodeVnode
export function h(jsxTag: [], props?: IVnodeProps, children?: any[]): IFragmentVnode
export function h(jsxTag: string, props?: IVnodeProps, children?: any[]): IElementVnode
export function h(jsxTag: IComponentFunction, props?: IVnodeProps, children?: any[]): IComponentVnode
export function h(jsxTag: IVnodeJsxTag, props: IVnodeProps = {}, children: any[] = []): IVnode {
  const vnodeBase = { props, children, el: null, key: props.key }
  const { textNode, component, fragment, element } = VnodeType

  if (jsxTag === 0) return { type: textNode, ...vnodeBase }
  else vnodeBase.children = specialDealVnodeChildren(vnodeBase.children)

  if (is.string(jsxTag)) return { type: element, tagName: jsxTag, ...vnodeBase }
  if (is.array(jsxTag)) return { type: fragment, anchor: null, ...vnodeBase }
  return { type: component, componentFunction: jsxTag, componentInstance: null, ...vnodeBase }
}

/**
 * 包装子集, 将string | number | undefined | null | false类型全处理成文本vnode,
 * 将数组类型的包装成 fragment vnode
 */
export function specialDealVnodeChildren(children: any[]): IVnode[] {
  const newVnodeChildren: IVnode[] = []
  children.forEach((child) => {
    if (is.string(child) || is.number(child)) return newVnodeChildren.push(h(0, {}, [child]))
    if ([undefined, null, false].includes(child)) return newVnodeChildren.push(h(0, {}, ['']))
    if (is.array(child)) return newVnodeChildren.push(h([], {}, specialDealVnodeChildren(child)))
    newVnodeChildren.push(child)
  })
  return newVnodeChildren
}

/**
 * 从虚拟dom中创建真实dom节点并挂载到目标dom节点
 */
export function mountVnode(vnode: IVnode) {
  if (vnodeIs.component(vnode)) return mountComponentVnode(vnode)
  if (vnodeIs.fragment(vnode)) return mountFragmentVnode(vnode)
  if (vnodeIs.element(vnode)) return mountElementVnode(vnode)
  if (vnodeIs.textNode(vnode)) return mountTextNodeVnode(vnode)
}

/**
 * 如果前后vnode类型相同就进行比对更新, 不相同就替换
 */
export function updateVnode(preVnode: IVnode, currentVnode: IVnode) {
  if (vnodeIs.component(currentVnode) && vnodeIs.component(preVnode))
    return updateComponentVnode(preVnode, currentVnode)
  if (vnodeIs.fragment(currentVnode) && vnodeIs.fragment(preVnode)) return updateFragmentVnode(preVnode, currentVnode)
  if (vnodeIs.element(currentVnode) && vnodeIs.element(preVnode)) return updateElementVnode(preVnode, currentVnode)
  if (vnodeIs.textNode(currentVnode) && vnodeIs.textNode(preVnode)) return updateTextNodeVnode(preVnode, currentVnode)
  return replaceVnode(preVnode, currentVnode)
}

/**
 * 卸载前一个vnode, 挂载当前的vnode
 */
export function replaceVnode(preVnode: IVnode, currentVnode: IVnode) {
  const setBack = setCurrentRenderContext({ currentAnchor: preVnode.el?.nextSibling })
  unMountVnode(preVnode)
  mountVnode(currentVnode)
  setBack()
}

/**
 * 如果是component或fragment就走特殊流程, element或textNode就直接移除
 */
export function unMountVnode(vnode: IVnode): void {
  if (vnodeIs.component(vnode)) return unMountComponentVnode(vnode)
  if (vnodeIs.fragment(vnode)) return unMountFragmentVnode(vnode)
  return remove(vnode?.el)
}

export function mountFragmentVnode(fragmentVnode: IFragmentVnode) {
  const el = (fragmentVnode.el = document.createTextNode(''))
  const anchor = (fragmentVnode.anchor = document.createTextNode(''))
  insertChild(el)
  insertChild(anchor)

  const { currentParentEl } = getCurrentRenderContext()
  for (const childVnode of fragmentVnode.children) {
    const setBack = setCurrentRenderContext({ currentAnchor: anchor, currentParentEl })
    mountVnode(childVnode)
    setBack()
  }
}

export function updateFragmentVnode(preVnode: IFragmentVnode, currentVnode: IFragmentVnode) {
  const currentParentEl = (currentVnode.el = preVnode.el)?.parentElement!
  const currentAnchorEl = (currentVnode.anchor = preVnode.anchor)
  const setBack = setCurrentRenderContext({ currentAnchor: currentAnchorEl, currentParentEl })

  diffVnodeChildren(preVnode, currentVnode)
  setBack()
}

export function unMountFragmentVnode(fragmentVnode: IFragmentVnode) {
  let { el, anchor } = fragmentVnode
  // 循环找出夹在el和anchor中间的节点删除掉
  while (el !== anchor) {
    let nextSibling = el?.nextSibling as any
    remove(el)
    el = nextSibling
  }
  remove(anchor)
}

export function mountElementVnode(elementVnode: IElementVnode) {
  const el = document.createElement(elementVnode.tagName)
  setVnodePropsToDomAttribute(null, elementVnode, el)
  insertChild((elementVnode.el = el))

  for (const childVnode of elementVnode.children) {
    setCurrentRenderContext({ currentParentEl: el })
    mountVnode(childVnode)
  }
}

export function updateElementVnode(preVnode: IElementVnode, currentVnode: IElementVnode) {
  const el = (currentVnode.el = preVnode.el)
  if (!el) return

  setVnodePropsToDomAttribute(preVnode, currentVnode, el)
  const setBack = setCurrentRenderContext({ currentParentEl: el })
  diffVnodeChildren(preVnode, currentVnode)
  setBack()
}

export function mountTextNodeVnode(textNodeVnode: ITextNodeVnode) {
  const textNode = document.createTextNode(textNodeVnode.children[0].toString())
  insertChild((textNodeVnode.el = textNode))
}

export function updateTextNodeVnode(preVnode: IVnode, currentVnode: IVnode) {
  const el = (currentVnode.el = preVnode.el)
  const prevText = preVnode.children[0].toString()
  const currentText = currentVnode.children[0].toString()
  if (!el || currentText === prevText) return

  setTextContent(currentText, el)
}

export function mount(componentFunction: Function, parentDom: Element): void {
  setCurrentRenderContext({ currentParentEl: parentDom })
  mountComponentVnode(h(componentFunction as IComponentFunction, {}, []))
}
