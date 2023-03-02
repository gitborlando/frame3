import { implementLifeCycles, initLifeCycles, setCurrentComponentInstance } from './life-cycles'
import { effect } from './reactive'
import { IComponentInstance, IComponentVnode, IVnodeProps } from './types'
import { mountVnode, specialDealVnodeChildren, unMountVnode, updateVnode } from './vnode'

/**
 * 挂载组件
 * @param componentVnode 组件vnode
 */
export function mountComponentVnode(componentVnode: IComponentVnode) {
  const { jsxTag: componentFunction, props, children } = componentVnode
  const componentInstance = (componentVnode.componentInstance = {
    isMounted: false,
    props: { ...props, children },
    lifeCycles: initLifeCycles(),
  } as IComponentInstance)

  setCurrentComponentInstance(componentInstance)
  let renderVnodeFunction = componentFunction(componentInstance.props)

  componentInstance.update = effect(() => {
    const currentSubVnode = renderVnodeFunction()
    const invokeLifeCycleCallbacks = implementLifeCycles(componentInstance)
    currentSubVnode.children = specialDealVnodeChildren(currentSubVnode.children)

    if (!componentInstance.isMounted) {
      invokeLifeCycleCallbacks('beforeMount')
      mountVnode(currentSubVnode)
      invokeLifeCycleCallbacks('mounted')
      componentInstance.isMounted = true
    } else {
      invokeLifeCycleCallbacks('beforeUpdate')
      updateVnode(componentInstance.subVnode, currentSubVnode)
      invokeLifeCycleCallbacks('updated')
    }

    componentVnode.el = currentSubVnode.el
    componentInstance.subVnode = currentSubVnode
    setCurrentComponentInstance(null)
  })

  componentInstance.passiveUpdate = (props: IVnodeProps, children: any[]) => {
    componentInstance.props = { ...props, children }
    setCurrentComponentInstance(componentInstance)
    renderVnodeFunction = componentFunction(componentInstance.props)
    componentInstance.update()
  }

  if (props.hasOwnProperty('ref')) props.ref.value = componentInstance
}

export function updateComponentVnode(preVnode: IComponentVnode, currentVnode: IComponentVnode) {
  currentVnode.componentInstance = preVnode.componentInstance!
  if (propsIsEqual(preVnode.props, currentVnode.props)) return
  currentVnode.componentInstance.passiveUpdate(currentVnode.props, currentVnode.children)
}

export function unMountComponentVnode({ componentInstance }: IComponentVnode) {
  if (!componentInstance) return

  const invokeLifeCycleCallbacks = implementLifeCycles(componentInstance)
  invokeLifeCycleCallbacks('beforeUnMount')
  unMountVnode(componentInstance.subVnode)
  componentInstance.update.active = false
  invokeLifeCycleCallbacks('unMounted')
}

function propsIsEqual(prevProps: IVnodeProps, currentProps: IVnodeProps) {
  return Object.keys(currentProps).every((key) => prevProps[key] === currentProps[key])
}
