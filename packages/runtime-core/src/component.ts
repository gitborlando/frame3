import { implementLifeCycles, initLifeCycles, setCurrentComponentInstance } from './life-cycles'
import { effect } from './reactive'
import { IComponentInstance, IComponentVnode, IVnodeProps } from './types'
import { mountVnode, specialDealVnodeChildren, unMountVnode, updateVnode } from './vnode'

/**
 * 首先明确两点, 以一个简单组件为例
 * ```ts
 * const App = () => {
 *  return <div>xxx</div>
 * }
 * ```
 * 它会被编译成这样
 * ```ts
 * const App = () => {
 *  return () => <div>xxx</div>
 * }
 * ```
 * 这个App的函数体是组件函数, 而这个编译后的`() => <div>xxx</div>`是渲染函数
 *
 * 也就是说组件函数执行会返回一个渲染函数, 渲染函数执行才返回vnode
 */
export function mountComponentVnode(componentVnode: IComponentVnode) {
  const { componentFunction, props, children } = componentVnode
  const componentInstance = (componentVnode.componentInstance = {
    props,
    isMounted: false,
    lifeCycles: initLifeCycles(),
  } as IComponentInstance)

  setCurrentComponentInstance(componentInstance)
  let renderVnodeFunction = componentFunction({ ...props, children })

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
    specialDealDeepScopedCss(props, componentVnode)
  })

  componentInstance.passiveUpdate = (props: IVnodeProps, children: any[]) => {
    componentInstance.props = props
    setCurrentComponentInstance(componentInstance)
    renderVnodeFunction = componentFunction({ ...props, children })
    componentInstance.update()
  }

  if (props.hasOwnProperty('ref') && !props.ref.value) props.ref.value = componentInstance
}

/**
 * 如果组件有className的话会把组件的scopeId继承给子组件的el上
 */
function specialDealDeepScopedCss(componentProps: IVnodeProps, componentVnode: IComponentVnode) {
  if (
    componentVnode.el instanceof Element &&
    componentProps.hasOwnProperty('scope-id') &&
    componentProps.hasOwnProperty('classes')
  ) {
    componentVnode.el.setAttribute('s-' + componentProps['scope-id'], '')
  }
}

/**
 * 由父组件触发的组件更新
 */
export function updateComponentVnode(preVnode: IComponentVnode, currentVnode: IComponentVnode) {
  currentVnode.el = preVnode.el!
  currentVnode.componentInstance = preVnode.componentInstance!
  if (propsAndChildrenAllEqual(preVnode, currentVnode)) return
  currentVnode.componentInstance.passiveUpdate(currentVnode.props, currentVnode.children)
}

/**
 * 主要是卸载其子集vnode, 将其自身的update回调设置为失效, 并同时执行相应的生命周期回调
 */
export function unMountComponentVnode({ componentInstance }: IComponentVnode) {
  if (!componentInstance) return

  const invokeLifeCycleCallbacks = implementLifeCycles(componentInstance)
  invokeLifeCycleCallbacks('beforeUnMount')
  unMountVnode(componentInstance.subVnode)
  componentInstance.update.active = false
  invokeLifeCycleCallbacks('unMounted')
}

/**
 * 浅对比前后两个vnode的props和children, 有不同的才会更新
 */
function propsAndChildrenAllEqual(preVnode: IComponentVnode, currentVnode: IComponentVnode) {
  const { props: prevProps, children: prevChildren } = preVnode
  const { props: currentProps, children: currentChildren } = currentVnode
  return (
    Object.keys(currentProps).every((key) => prevProps[key] === currentProps[key]) &&
    Object.keys(currentChildren).every((key) => prevChildren[+key] === currentChildren[+key])
  )
}
