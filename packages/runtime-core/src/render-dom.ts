import { IElementVnode } from './types'

export function createElement(tagName: string) {
  return document.createElement(tagName)
}

export function createTextNode(content: string) {
  return document.createTextNode(content)
}

export function insertChild(el: Element | Text) {
  currentParentEl?.insertBefore(el, currentAnchor)
}

export function setTextContent(textContent: any, el: Element | Text = currentParentEl) {
  el && (el.textContent = textContent)
}

export function remove(el?: Element | Text | null) {
  el?.remove()
}

let currentParentEl: Element
let currentAnchor: Node | null

export function getCurrentRenderContext() {
  return { currentParentEl, currentAnchor }
}

export function setCurrentRenderContext({
  currentParentEl: parentEl,
  currentAnchor: anchorEl,
}: {
  currentParentEl?: Element
  currentAnchor?: Node | null
}) {
  const { currentParentEl: prevParentEl, currentAnchor: prevAnchor } = getCurrentRenderContext()
  currentAnchor = anchorEl || null
  if (parentEl) currentParentEl = parentEl
  return function setBack() {
    setCurrentRenderContext({ currentParentEl: prevParentEl, currentAnchor: prevAnchor })
  }
}

export function setVnodePropsToDomAttribute(preVnode: IElementVnode | null, currentVnode: IElementVnode, el: Element) {
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
    } else if (propkey === 'ref') {
      propValue.value = el
    } else if (propkey.match(/className|class/)) {
      el.className = propValue
    } else if (propkey === 'scope-id') {
      el.setAttribute(`scope-${propValue}`, '')
    } else {
      el.setAttribute(propkey, propValue)
    }
  }
}
