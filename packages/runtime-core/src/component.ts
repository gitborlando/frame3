import { IComponentInstance, IComponentVnode, IVnodeProps } from './types'
import { effect } from './reactive'
import { updateVnode, mountVnode, specialDealVnodeChildren } from './vnode'

/**
 * 挂载组件
 * @param componentVnode 组件vnode
 * @param parentDom
 */
export function mountComponentVnode(componentVnode: IComponentVnode) {
  const { jsxTag: componentFunction, props, children } = componentVnode
  const componentInstance = (componentVnode.componentInstance = {
    isMounted: false,
    props: { ...props, children },
  } as IComponentInstance)

  let renderVnodeFunction = componentFunction(componentInstance.props)

  componentInstance.update = () => {
    const currentSubVnode = renderVnodeFunction()
    currentSubVnode.children = specialDealVnodeChildren(currentSubVnode.children)

    if (!componentInstance.isMounted) {
      mountVnode(currentSubVnode)
      componentInstance.isMounted = true
    } else {
      updateVnode(componentInstance.subVnode, currentSubVnode)
    }
    componentInstance.subVnode = currentSubVnode
    componentVnode.el = currentSubVnode.el
  }

  componentInstance.passiveUpdate = (props: IVnodeProps, children: any[]) => {
    componentInstance.props = { ...props, children }
    renderVnodeFunction = componentFunction(componentInstance.props)
    componentInstance.update()
  }

  if (props.hasOwnProperty('ref')) props.ref.value = componentInstance
  effect(componentInstance.update)
}

export function passiveUpdateComponent(preVnode: IComponentVnode, currentVnode: IComponentVnode) {
  currentVnode.componentInstance = preVnode.componentInstance!
  if (propsIsEqual(preVnode.props, currentVnode.props)) return
  currentVnode.componentInstance.passiveUpdate(currentVnode.props, currentVnode.children)
}

function propsIsEqual(prevProps: IVnodeProps, currentProps: IVnodeProps) {
  return Object.keys(currentProps).every((key) => prevProps[key] === currentProps[key])
}
