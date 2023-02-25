import { IComponentInstance, IComponentVnode, IVnodeProps } from './types'
import { effect } from './reactive'
import { updateVnode, mountVnode, specialDealVnodeChildren } from './vnode'

export function mountComponentVnode(componentVnode: IComponentVnode, parentDom: Element) {
  const { jsxTag: componentFunction, props } = componentVnode
  const componentInstance = (componentVnode.componentInstance = {
    isMounted: false,
    props,
  } as IComponentInstance)

  let renderVnodeFunction = componentFunction(props)

  componentInstance.update = () => {
    const currentSubVnode = renderVnodeFunction()
    currentSubVnode.children = specialDealVnodeChildren(currentSubVnode.children)
    if (!componentInstance.isMounted) {
      mountVnode(currentSubVnode, parentDom)
      componentInstance.isMounted = true
    } else {
      updateVnode(componentInstance.subVnode, currentSubVnode, parentDom)
    }
    componentInstance.subVnode = currentSubVnode
    componentVnode.el = currentSubVnode.el
  }

  componentInstance.passiveUpdate = (props: IVnodeProps) => {
    renderVnodeFunction = componentFunction(props)
    componentInstance.props = props
    componentInstance.update()
  }

  effect(componentInstance.update, {
    scheduler: (fn: any) => Promise.resolve().then(fn),
  })

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
