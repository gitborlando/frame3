import { effect, reactive } from './reactive'
import { h } from './vnode'

interface IRouter {
  path: string
  component: any
}

const hash = reactive(getHash())
window.addEventListener('hashchange', (e) => {
  hash.value = getHash()
})

export function Router({ path, component }: IRouter) {
  const props = reactive<Record<string, any>>()
  const shouldRender = reactive(false)
  effect(() => {
    const { isMatch, params } = matchPath(path, hash.value)
    shouldRender.value = isMatch
    props.value = params
  })
  return () => h([], {}, shouldRender.value ? [h(component, props.value, [])] : [])
}

function matchPath(path: string, hash: string) {
  if (!/:\w+/.test(path)) return { isMatch: path === hash, params: {} }

  let paramName = ''
  let reString = path.replace(/(.*)(:\w+)/, (_, $1, $2) => {
    paramName = $2.slice(1)
    return $1 + '(.*)'
  })
  const matchRes = hash.match(new RegExp(reString))
  return {
    isMatch: !!matchRes,
    params: { [paramName]: matchRes?.[1] },
  }
}

function getHash() {
  return location.hash.slice(1).replace(/\/$/, '')
}
