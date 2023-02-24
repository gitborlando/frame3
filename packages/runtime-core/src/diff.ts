import { IElementVnode, ITextNodeVnode, IVnode, VnodeType } from './types'
import { mountVnode, unmountVnode, updateVnode } from './vnode'

export function diffElementVnodeChildren(prevVnode: IElementVnode, currentVnode: IElementVnode, parentDom: Element) {
  //
  if (isElementWithOneTextNodeChild(prevVnode) || isElementWithOneTextNodeChild(currentVnode)) {
    if (isElementWithOneTextNodeChild(prevVnode) && isElementWithOneTextNodeChild(currentVnode)) {
      parentDom.textContent = currentVnode.children[0].children[0]
    }
    if (isElementWithOneTextNodeChild(prevVnode) && !isElementWithOneTextNodeChild(currentVnode)) {
      for (const child of currentVnode.children) mountVnode(child, parentDom)
    }
    if (!isElementWithOneTextNodeChild(currentVnode) && isElementWithOneTextNodeChild(currentVnode)) {
      unmountVnode(prevVnode)
      parentDom.textContent = currentVnode.children[0].children[0]
    }
  }

  if (prevVnode.children[0].key && currentVnode.children[0].key) {
    diffKeyedChildren(prevVnode.children, currentVnode.children, parentDom)
  } else {
    diffUnKeyedChildren(prevVnode.children, currentVnode.children, parentDom)
  }
}

function isElementWithOneTextNodeChild(
  vnode: IVnode
): vnode is Omit<IElementVnode, 'children'> & { children: ITextNodeVnode[] } {
  return vnode.children.length === 1 && vnode.children[0]?.type === VnodeType.textNode
}

function diffUnKeyedChildren(prevChildren: IVnode[], currentChildren: IVnode[], parentDom: Element) {
  const prevChildrenLength = prevChildren.length
  const currentChildrenLength = currentChildren.length
  const minChildrenLength = Math.min(prevChildrenLength, currentChildrenLength)
  for (let i = 0; i < minChildrenLength; i++) {
    updateVnode(prevChildren[i], currentChildren[i], parentDom)
  }
  if (currentChildrenLength > prevChildrenLength) {
    return currentChildren.slice(minChildrenLength).forEach((child) => mountVnode(child, parentDom))
  }
  if (prevChildrenLength > currentChildrenLength) {
    return prevChildren.slice(minChildrenLength).forEach((child) => unmountVnode(child))
  }
}

function diffKeyedChildren(prevChildren: IVnode[], currentChildren: IVnode[], parentDom: Element) {
  let headIndex = 0
  let prevChildrenTailIndex = prevChildren.length - 1
  let currentChildrenTailIndex = currentChildren.length - 1

  while (
    headIndex <= prevChildrenTailIndex &&
    headIndex <= currentChildrenTailIndex &&
    isSameTypeAndKey(prevChildren[headIndex], currentChildren[headIndex])
  ) {
    updateVnode(prevChildren[headIndex], currentChildren[headIndex], parentDom)
    headIndex++
  }

  while (
    headIndex <= prevChildrenTailIndex &&
    headIndex <= currentChildrenTailIndex &&
    isSameTypeAndKey(prevChildren[prevChildrenTailIndex], currentChildren[currentChildrenTailIndex])
  ) {
    updateVnode(prevChildren[headIndex], currentChildren[headIndex], parentDom)
    prevChildrenTailIndex--
    currentChildrenTailIndex--
  }

  console.log(headIndex, prevChildrenTailIndex, currentChildrenTailIndex)

  if (headIndex > prevChildrenTailIndex) {
    for (let i = headIndex; i <= currentChildrenTailIndex; i++) {
      mountVnode(currentChildren[i], parentDom)
    }
  }

  if (headIndex > currentChildrenTailIndex) {
    for (let i = headIndex; i <= currentChildrenTailIndex; i++) {
      unmountVnode(prevChildren[i])
    }
  }
}

function isSameTypeAndKey(prevVnode: IVnode, currentVnode: IVnode) {
  return prevVnode.type === currentVnode.type && prevVnode.key === currentVnode.key
}
