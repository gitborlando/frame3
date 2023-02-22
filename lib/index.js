var r = { element: 'element', textNode: 'textNode', component: 'component' }
var p = {
    string: (e) => Object.prototype.toString.call(e) === '[object String]',
    number: (e) => Object.prototype.toString.call(e) === '[object Number]',
    boolean: (e) => Object.prototype.toString.call(e) === '[object Boolean]',
    undefined: (e) => Object.prototype.toString.call(e) === '[object Undefined]',
    null: (e) => Object.prototype.toString.call(e) === '[object Null]',
    function: (e) => Object.prototype.toString.call(e) === '[object Function]',
    object: (e) => Object.prototype.toString.call(e) === '[object Object]',
    array: (e) => Object.prototype.toString.call(e) === '[object Array]',
  },
  d = {
    component: (e) => e?.type === r.component,
    element: (e) => e?.type === r.element,
    textNode: (e) => e?.type === r.textNode,
  }
function E(e) {
  return (function n(t) {
    return new Proxy(t, {
      get(o, c) {
        M(o, c)
        let l = Reflect.get(o, c)
        return typeof l == 'object' ? n(l) : l
      },
      set(o, c, l) {
        return Reflect.set(o, c, l), B(o, c), !0
      },
    })
  })({ value: e })
}
var a,
  I = [],
  V = new WeakMap()
function M(e, n) {
  if (!a) return
  p.array(e) && (n = 'length'), V.get(e) || V.set(e, new Map())
  let t = V.get(e)
  t?.get(n) || t.set(n, new Set()), a.shouldTrack && t.get(n).add(a)
}
function B(e, n) {
  if (!e.hasOwnProperty(n)) return
  p.array(e) && (n = 'length'),
    V.get(e)
      ?.get(n)
      ?.forEach((c) => c())
}
function h(e, n) {
  let t = () => {
    try {
      ;(a = t), I.push(a)
      let o = I[I.length - 2]
      if (a.isFirstRun && o && !o.isFirstRun) {
        a.shouldTrack = !1
        return
      }
      e(n), (a.isFirstRun = !1)
    } finally {
      I.pop(), (a = I[I.length - 1])
    }
  }
  return (t.isFirstRun = !0), (t.shouldTrack = !0), (t.scheduler = n?.scheduler), t(), t
}
function A(e) {
  let n = E()
  return h(() => (n.value = e())), n
}
function T(e, n) {
  let { jsxTag: t, props: o } = e,
    c = t(o),
    l = { isMounted: !1 }
  ;(e.componentInstance = l),
    (l.update = () => {
      if (!l.isMounted) {
        let f = c()
        return (f.children = b(f.children)), m(f, n), (l.subVnode = f), (e.el = f.el), (l.isMounted = !0)
      }
      let i = l.subVnode,
        s = c()
      ;(s.children = b(s.children)), x(i, s, n), (l.subVnode = s), (e.el = s.el)
    }),
    h(l.update)
}
function j(e, n, t) {
  ;(n.componentInstance = e.componentInstance), n.componentInstance?.update()
}
function N(e, n, t) {
  if (u(e) || u(n)) {
    if ((u(e) && u(n) && (t.textContent = n.children[0].children[0]), u(e) && !u(n))) for (let o of n.children) m(o, t)
    !u(n) && u(n) && (y(e), (t.textContent = n.children[0].children[0]))
  }
  e.children[0].key && n.children[0].key ? L(e.children, n.children, t) : K(e.children, n.children, t)
}
function u(e) {
  return e.children.length === 1 && e.children[0]?.type === r.textNode
}
function K(e, n, t) {
  let o = e.length,
    c = n.length,
    l = Math.min(o, c)
  for (let i = 0; i < l; i++) x(e[i], n[i], t)
  if (c > o) return n.slice(l).forEach((i) => m(i, t))
  if (o > c) return e.slice(l).forEach((i) => y(i))
}
function L(e, n, t) {
  let o = 0,
    c = e.length - 1,
    l = n.length - 1
  for (; o <= c && o <= l && C(e[o], n[o]); ) x(e[o], n[o], t), o++
  for (; o <= c && o <= l && C(e[c], n[l]); ) x(e[o], n[o], t), c--, l--
  if ((console.log(o, c, l), o > c)) for (let i = o; i <= l; i++) m(n[i], t)
  if (o > l) for (let i = o; i <= l; i++) y(e[i])
}
function C(e, n) {
  return e.type === n.type && e.key === n.key
}
function k(e, n) {
  let t = document.createElement(e.jsxTag)
  n.appendChild((e.el = t)), P(null, e, t)
  for (let o of e.children) m(o, t)
}
function O(e, n, t) {
  let o = (n.el = e.el)
  o && (P(e, n, o), N(e, n, o))
}
function F(e, n) {
  let t = document.createTextNode(e.children[0].toString())
  n.appendChild((e.el = t))
}
function S(e, n, t) {
  let o = (n.el = e.el)
  o && (o.textContent = n.children[0].toString())
}
function P(e, n, t) {
  let o = e ? e.props : {},
    c = n.props,
    l = Object.entries(c)
      .map(([i, s]) => (i in o ? (o[i] !== s ? [i, s] : void 0) : [i, s]))
      .filter(Boolean)
  for (let [i, s] of l)
    if (i.startsWith('on')) t.addEventListener(i.slice(2).toLocaleLowerCase(), s)
    else if (i === 'style') {
      let f = Object.entries(s)
        .map(([w, R]) => `${w}: ${R}`)
        .join(';')
      t.setAttribute('style', f)
    } else
      i === 'className' ? (t.className = s) : i === 'scope-id' ? t.setAttribute(`scope-${s}`, '') : t.setAttribute(i, s)
}
function g(e, n, t) {
  let o = { props: n, children: t, el: null, componentInstance: null, key: n.key }
  return e === 0
    ? { type: r.textNode, jsxTag: e, ...o }
    : p.string(e)
    ? ((o.children = b(o.children)), { type: r.element, jsxTag: e, ...o })
    : { type: r.component, jsxTag: e, ...o }
}
function b(e) {
  let n = []
  return (
    e.forEach((t) => {
      if (p.string(t) || p.number(t)) return n.push(g(0, {}, [t]))
      if (p.array(t)) return n.push(...b(t))
      p.undefined(t) || p.null(t) || n.push(t)
    }),
    n
  )
}
function v(e, n) {
  T(g(typeof e == 'function' ? e : () => () => e, {}, []), n)
}
function m(e, n) {
  if (d.component(e)) return T(e, n)
  if (d.element(e)) return k(e, n)
  if (d.textNode(e)) return F(e, n)
}
function x(e, n, t) {
  if (d.component(n) && d.component(e)) return j(e, n, t)
  if (d.element(n) && d.element(e)) return O(e, n, t)
  if (d.textNode(n) && d.textNode(e)) return S(e, n, t)
  y(e), m(n, t)
}
function y(e) {
  d.component(e) && e.componentInstance ? y(e.componentInstance.subVnode) : e.el?.remove()
}
export { A as computed, h as effect, g as h, v as mount, E as reactive }
//# sourceMappingURL=index.js.map
