import { IElementVnode, IFragmentVnode, IVnode } from './types'
import { mountVnode, unMountVnode, updateVnode } from './vnode'

export function diffVnodeChildren(
  prevVnode: IElementVnode | IFragmentVnode,
  currentVnode: IElementVnode | IFragmentVnode
) {
  if (prevVnode.children[0]?.key && currentVnode.children[0]?.key) {
    diffKeyedChildren(prevVnode.children, currentVnode.children)
  } else {
    diffUnKeyedChildren(prevVnode.children, currentVnode.children)
  }
}

function diffUnKeyedChildren(prevChildren: IVnode[], currentChildren: IVnode[]) {
  const prevChildrenLength = prevChildren.length
  const currentChildrenLength = currentChildren.length
  const minChildrenLength = Math.min(prevChildrenLength, currentChildrenLength)
  for (let i = 0; i < minChildrenLength; i++) {
    updateVnode(prevChildren[i], currentChildren[i])
  }
  if (currentChildrenLength > prevChildrenLength) {
    return currentChildren.slice(minChildrenLength).forEach((child) => mountVnode(child))
  }
  if (prevChildrenLength > currentChildrenLength) {
    return prevChildren.slice(minChildrenLength).forEach((child) => unMountVnode(child))
  }
}

function diffKeyedChildren(prevChildren: IVnode[], currentChildren: IVnode[]) {
  let headIndex = 0
  let prevChildrenTailIndex = prevChildren.length - 1
  let currentChildrenTailIndex = currentChildren.length - 1

  while (
    headIndex <= prevChildrenTailIndex &&
    headIndex <= currentChildrenTailIndex &&
    isSameTypeAndKey(prevChildren[headIndex], currentChildren[headIndex])
  ) {
    updateVnode(prevChildren[headIndex], currentChildren[headIndex])
    headIndex++
  }

  while (
    headIndex <= prevChildrenTailIndex &&
    headIndex <= currentChildrenTailIndex &&
    isSameTypeAndKey(prevChildren[prevChildrenTailIndex], currentChildren[currentChildrenTailIndex])
  ) {
    updateVnode(prevChildren[headIndex], currentChildren[headIndex])
    prevChildrenTailIndex--
    currentChildrenTailIndex--
  }

  if (headIndex > prevChildrenTailIndex) {
    for (let i = headIndex; i <= currentChildrenTailIndex; i++) {
      mountVnode(currentChildren[i])
    }
  }

  if (headIndex > currentChildrenTailIndex) {
    for (let i = headIndex; i <= currentChildrenTailIndex; i++) {
      unMountVnode(prevChildren[i])
    }
  }
}

function isSameTypeAndKey(prevVnode: IVnode, currentVnode: IVnode) {
  return prevVnode.type === currentVnode.type && prevVnode.key === currentVnode.key
}
