import { IComponentInstance, IComponentVnode, IVnodeProps } from './types'
import { effect } from './reactive'
import { updateVnode, mountVnode, specialDealVnodeChildren } from './vnode'

export function mountComponentVnode(componentVnode: IComponentVnode, parentDom: Element) {
  const { jsxTag: componentFunction, props } = componentVnode
  const renderFunction = componentFunction(props)
  const componentInstance = (componentVnode.componentInstance = {
    isMounted: false,
    props,
  } as IComponentInstance)

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
  if (props.hasOwnProperty('ref')) props.ref.value = componentInstance
}

export function passiveUpdateComponent(preVnode: IComponentVnode, currentVnode: IComponentVnode, parentDom: Element) {
  currentVnode.componentInstance = preVnode.componentInstance!
  if (propsIsEqual(preVnode.props, currentVnode.props)) return
  currentVnode.componentInstance.props = preVnode.props
  currentVnode.componentInstance?.update()
}

function propsIsEqual(prevProps: IVnodeProps, currentProps: IVnodeProps) {
  return Object.keys(currentProps).every((key) => prevProps[key] === currentProps[key])
}
