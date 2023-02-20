import { IComponentInstance, IComponentVnode } from '../types'
import { effect } from './reactive'
import { updateVnode, mountVnode, specialDealVnodeChildren } from './vnode'

export function mountComponentVnode(componentVnode: IComponentVnode, parentDom: Element) {
  const { jsxTag: componentFunction, props } = componentVnode
  const componentInstance = {
    isMounted: false,
  } as IComponentInstance
  const renderFunction = componentFunction(props)

  componentInstance.update = () => {
    if (!componentInstance.isMounted) {
      const currentSubVnode = renderFunction()
      currentSubVnode.children = specialDealVnodeChildren(currentSubVnode.children)
      mountVnode(currentSubVnode, parentDom)
      componentInstance.subVnode = currentSubVnode
      componentVnode.el = currentSubVnode.el
      return (componentInstance.isMounted = true)
    }
    const prevSubVnode = componentInstance.subVnode
    const currentSubVnode = renderFunction()
    currentSubVnode.children = specialDealVnodeChildren(currentSubVnode.children)
    updateVnode(prevSubVnode, currentSubVnode, parentDom)
    componentInstance.subVnode = currentSubVnode
    componentVnode.el = currentSubVnode.el
  }

  effect(componentInstance.update)
}

export function passiveUpdateComponent(preVnode: IComponentVnode, currentVnode: IComponentVnode, parentDom: Element) {
  currentVnode.componentInstance = preVnode.componentInstance
  currentVnode.componentInstance?.update()
}
