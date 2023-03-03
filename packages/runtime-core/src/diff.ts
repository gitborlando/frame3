import { IElementVnode, IFragmentVnode, IVnode } from './types'
import { mountVnode, unMountVnode, updateVnode } from './vnode'

/**
 * 比对前后两个vnode的子集, 分为带key的和不带key的
 */
export function diffVnodeChildren(
  prevVnode: IElementVnode | IFragmentVnode,
  currentVnode: IElementVnode | IFragmentVnode
) {
  // 简单认为第一个子节点有key就都有key
  if (prevVnode.children[0]?.key && currentVnode.children[0]?.key) {
    diffKeyedChildren(prevVnode.children, currentVnode.children)
  } else {
    diffUnKeyedChildren(prevVnode.children, currentVnode.children)
  }
}

/**
 * 对比没有key的子集, 是最常见的情况
 * 以最短的子集作为基准, 一个个去对比
 * 最后多出来的, 新子集多了就挂载, 老子集多了就卸载
 */
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
