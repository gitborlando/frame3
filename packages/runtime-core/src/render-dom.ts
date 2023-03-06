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

/**
 * 当前的父真实节点, 用于作为insertBefore()的父节点, 在mount根组件时被赋值为根dom节点
 */
let currentParentEl: Element
/**
 * 当前的锚点节点, 用于作为insertBefore()的锚点
 */
let currentAnchor: Node | null

/**
 * 返回当前的父真实节点和当前的锚点节点
 */
export function getCurrentRenderContext() {
  return {
    /** 当前的父真实节点, 用于作为insertBefore()的父节点 */
    currentParentEl,
    /** 当前的锚点节点, 用于作为insertBefore()的锚点 */
    currentAnchor,
  }
}

/**
 * 首先声明下我觉得这是一个很好的设计
 *
 * 这个函数的功能很简单, 就是设置(或者叫更新)当前的父节点和锚点, 然后返回一个`setBack`函数, 调用它可以再次设置回去
 *
 * 具体作用就是mount或update子集的时候调用它, 设置子节点要挂载的父节点和插入的锚点(一般就是设置为自己).
 * 待子节点处理完后又回到当前函数, 调用`setBack`设置回之前的父节点和锚点
 *
 * 这样做的好处就是不用往mount或update子集的函数多塞两个参数(parentNode, anchorNode), 避免业务一旦复杂
 * 函数参数数量就直接爆炸的情况, 我见过太多10几个参数的函数了, 很多时候即使根本没用上, 只是因为子函数需要也要留在那里,
 * 导致代码极难维护. 想象一下, 你看到许多10几个参数的函数调用, 而这10几个参数都不知道啥意思会是什么感受.
 * 而这些教训也直接体现在frame3的源码里, frame3的每个函数入参都不超过三个, 并且函数 tsdoc 99%覆盖, 就是为了避免这种情况
 */
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
  /** 子节点处理完后又回到当前函数, 设置回之前的父节点和锚点 */
  return function setBack() {
    setCurrentRenderContext({ currentParentEl: prevParentEl, currentAnchor: prevAnchor })
  }
}

/**
 * 设置element节点的attribute. 比对前一个vnode的props和后一个vnode的props
 * 找出不同的, 然后再分别设置上去
 */
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
    } else if (propkey === 'classes') {
      el.className = ''
      const classes = Array.isArray(propValue) ? propValue : [propValue]
      classes.filter(Boolean).forEach((_class) => el.classList.add(_class))
    } else if (propkey === 'scope-id') {
      el.setAttribute(`scope-${propValue}`, '')
    } else {
      el.setAttribute(propkey, propValue)
    }
  }
}
