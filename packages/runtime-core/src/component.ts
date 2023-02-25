import { IComponentInstance, IComponentVnode, IVnodeProps } from './types'
import { effect } from './reactive'
import { updateVnode, mountVnode, specialDealVnodeChildren } from './vnode'

export function mountComponentVnode(componentVnode: IComponentVnode, parentDom: Element) {
  const { jsxTag: componentFunction, props } = componentVnode
  const componentInstance = {
    isMounted: false,
    props,
  } as IComponentInstance
  componentVnode.componentInstance = componentInstance
  let renderVnodeFunction = componentFunction(props)

  componentInstance.update = () => {
    if (!componentInstance.isMounted) {
      const currentSubVnode = renderVnodeFunction()
      currentSubVnode.children = specialDealVnodeChildren(currentSubVnode.children)
      mountVnode(currentSubVnode, parentDom)
      componentInstance.subVnode = currentSubVnode
      componentVnode.el = currentSubVnode.el
      return (componentInstance.isMounted = true)
    }
    const prevSubVnode = componentInstance.subVnode
    const currentSubVnode = renderVnodeFunction()
    currentSubVnode.children = specialDealVnodeChildren(currentSubVnode.children)
    updateVnode(prevSubVnode, currentSubVnode, parentDom)
    componentInstance.subVnode = currentSubVnode
    componentVnode.el = currentSubVnode.el
  }

  componentInstance.passiveUpdate = (props: IVnodeProps) => {
    renderVnodeFunction = componentFunction(props)
    componentInstance.props = props
    componentInstance.update()
  }

  effect(componentInstance.update)
  if (props.hasOwnProperty('ref')) props.ref.value = componentInstance
}

export function passiveUpdateComponent(preVnode: IComponentVnode, currentVnode: IComponentVnode, parentDom: Element) {
  currentVnode.componentInstance = preVnode.componentInstance!
  if (propsIsEqual(preVnode.props, currentVnode.props)) return
  currentVnode.componentInstance.passiveUpdate(currentVnode.props)
}

function propsIsEqual(prevProps: IVnodeProps, currentProps: IVnodeProps) {
  return Object.keys(currentProps).every((key) => prevProps[key] === currentProps[key])
}
