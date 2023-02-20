import { IElementVnode, ITextNodeVnode, IVnode } from '../types'
import { diffElementVnodeChildren } from './diff'
import { mountVnode } from './vnode'

export function mountElement(elementVnode: IElementVnode, parentDom: Element) {
  const el = document.createElement(elementVnode.jsxTag)
  parentDom.appendChild((elementVnode.el = el))

  setDomAttributeFromVnodeProps(null, elementVnode, el)
  for (const childVnode of elementVnode.children) {
    mountVnode(childVnode, el)
  }
}

export function updateElement(preVnode: IElementVnode, currentVnode: IElementVnode, parentDom: Element) {
  const el = (currentVnode.el = preVnode.el)
  if (!el) return

  setDomAttributeFromVnodeProps(preVnode, currentVnode, el)
  diffElementVnodeChildren(preVnode, currentVnode, el)
}

export function mountTextNode(textNodeVnode: ITextNodeVnode, parentDom: Element) {
  const el = document.createTextNode(textNodeVnode.children[0].toString())
  parentDom.appendChild((textNodeVnode.el = el))
}

export function updateTextNode(preVnode: IVnode, currentVnode: IVnode, parentDom: Element) {
  const el = (currentVnode.el = preVnode.el)
  el && (el.textContent = currentVnode.children[0].toString())
}

function setDomAttributeFromVnodeProps(preVnode: IElementVnode | null, currentVnode: IElementVnode, el: Element) {
  const prevProps = preVnode ? preVnode.props : {}
  const currentProps = currentVnode.props
  const diffedProps = Object.entries(currentProps)
    .map(([propKey, currentPropValue]) =>
      !(propKey in prevProps)
        ? [propKey, currentPropValue]
        : prevProps[propKey] !== currentPropValue
        ? [propKey, currentPropValue]
        : undefined
    )
    .filter(Boolean) as [string, any][]

  for (const [propkey, propValue] of diffedProps) {
    if (propkey.startsWith('on')) {
      el.addEventListener(propkey.slice(2).toLocaleLowerCase(), propValue)
    } else if (propkey === 'style') {
      const styleString = Object.entries(propValue)
        .map(([csskey, cssValue]) => `${csskey}: ${cssValue}`)
        .join(';')
      el.setAttribute('style', styleString)
    } else if (propkey === 'className') {
      el.className = propValue
    } else if (propkey === 'scope-id') {
      el.setAttribute(`scope-${propValue}`, '')
    } else {
      el.setAttribute(propkey, propValue)
    }
  }
}
