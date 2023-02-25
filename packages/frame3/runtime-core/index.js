var r={string:e=>Object.prototype.toString.call(e)==="[object String]",number:e=>Object.prototype.toString.call(e)==="[object Number]",boolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",undefined:e=>Object.prototype.toString.call(e)==="[object Undefined]",null:e=>Object.prototype.toString.call(e)==="[object Null]",function:e=>Object.prototype.toString.call(e)==="[object Function]",object:e=>Object.prototype.toString.call(e)==="[object Object]",array:e=>Object.prototype.toString.call(e)==="[object Array]"};function E(e){return function n(t){return new Proxy(t,{get(o,l){k(o,l);let c=Reflect.get(o,l);return typeof c=="object"?n(c):c},set(o,l,c){return Reflect.set(o,l,c),N(o,l),N(o,V),!0}})}({value:e})}function g(e){return e}var f,y=[],b=new WeakMap;function k(e,n){if(!f)return;if(r.array(e)){if(n==="length")return;n=n===V?n:"length"}b.get(e)||b.set(e,new Map);let t=b.get(e);t?.get(n)||t.set(n,new Set),f.shouldTrack&&t.get(n).add(f)}var V=Symbol("manual-track-object-key");function H(e){return k(e,V),e}function N(e,n){if(!e.hasOwnProperty(n)||n==="length")return;if(r.array(e)){if(n==="length")return;n=n===V?n:"length"}b.get(e)?.get(n)?.forEach(l=>l())}function h(e,n){let t=Object.assign(()=>{try{y.push(f=t);let o=y.slice(-2,-1)[0];if(o&&!o.isFirstRun){f.shouldTrack=!1;return}e(n),f.isFirstRun=!1}finally{y.pop(),f=y.slice(-1)[0]}},{isFirstRun:!0,shouldTrack:!0,scheduler:n?.scheduler});t()}function R(e){let n=E("");return h(()=>n.value=e()),n}function B(e){return e()}function A(e){return E()}function J(e){return g()}var d={element:"element",textNode:"textNode",component:"component"};function j(e,n){let{jsxTag:t,props:o}=e,l=t(o),c=e.componentInstance={isMounted:!1};c.update=()=>{if(!c.isMounted){let m=l();return m.children=T(m.children),p(m,n),c.subVnode=m,e.el=m.el,c.isMounted=!0}let i=c.subVnode,a=l();a.children=T(a.children),I(i,a,n),c.subVnode=a,e.el=a.el},h(c.update),o.hasOwnProperty("ref")&&(o.ref.value=c)}function P(e,n,t){n.componentInstance=e.componentInstance,n.componentInstance?.update()}function F(e,n,t){if(u(e)||u(n)){if(u(e)&&u(n)&&(t.textContent=n.children[0].children[0]),u(e)&&!u(n))for(let o of n.children)p(o,t);!u(n)&&u(n)&&(x(e),t.textContent=n.children[0].children[0])}e.children[0].key&&n.children[0].key?W(e.children,n.children,t):U(e.children,n.children,t)}function u(e){return e.children.length===1&&e.children[0]?.type===d.textNode}function U(e,n,t){let o=e.length,l=n.length,c=Math.min(o,l);for(let i=0;i<c;i++)I(e[i],n[i],t);if(l>o)return n.slice(c).forEach(i=>p(i,t));if(o>l)return e.slice(c).forEach(i=>x(i))}function W(e,n,t){let o=0,l=e.length-1,c=n.length-1;for(;o<=l&&o<=c&&M(e[o],n[o]);)I(e[o],n[o],t),o++;for(;o<=l&&o<=c&&M(e[l],n[c]);)I(e[o],n[o],t),l--,c--;if(console.log(o,l,c),o>l)for(let i=o;i<=c;i++)p(n[i],t);if(o>c)for(let i=o;i<=c;i++)x(e[i])}function M(e,n){return e.type===n.type&&e.key===n.key}function S(e,n){let t=document.createElement(e.jsxTag);n.appendChild(e.el=t),K(null,e,t);for(let o of e.children)p(o,t)}function O(e,n,t){let o=n.el=e.el;o&&(K(e,n,o),F(e,n,o))}function L(e,n){let t=document.createTextNode(e.children[0].toString());n.appendChild(e.el=t)}function v(e,n,t){let o=n.el=e.el;o&&(o.textContent=n.children[0].toString())}function K(e,n,t){let o=e?e.props:{},l=n.props,c=Object.entries(l).map(([i,a])=>i in o?o[i]!==a?[i,a]:void 0:[i,a]).filter(Boolean);for(let[i,a]of c)if(i.startsWith("on"))t.addEventListener(i.slice(2).toLocaleLowerCase(),a);else if(i==="style"){let m=Object.entries(a).map(([$,w])=>`${$}: ${w}`).join(";");t.setAttribute("style",m)}else i==="ref"?a.value=t:i==="className"?t.className=a:i==="scope-id"?t.setAttribute(`scope-${a}`,""):t.setAttribute(i,a)}function C(e,n={},t=[]){let o={props:n,children:t,el:null,componentInstance:null,key:n.key};return e===0?{type:d.textNode,jsxTag:e,...o}:r.string(e)?(o.children=T(o.children),{type:d.element,jsxTag:e,...o}):{type:d.component,jsxTag:e,...o}}function T(e){let n=[];return e.forEach(t=>{if(r.string(t)||r.number(t))return n.push(C(0,{},[t]));if(r.array(t))return n.push(...T(t));r.undefined(t)||r.null(t)||n.push(t)}),n}function q(e,n){j(C(typeof e=="function"?e:()=>()=>e,{},[]),n)}function p(e,n){if(s.component(e))return j(e,n);if(s.element(e))return S(e,n);if(s.textNode(e))return L(e,n)}function I(e,n,t){if(s.component(n)&&s.component(e))return P(e,n,t);if(s.element(n)&&s.element(e))return O(e,n,t);if(s.textNode(n)&&s.textNode(e))return v(e,n,t);x(e),p(n,t)}function x(e){s.component(e)&&e.componentInstance?x(e.componentInstance.subVnode):e.el?.remove()}var s={component:e=>e?.type===d.component,element:e=>e?.type===d.element,textNode:e=>e?.type===d.textNode};export{B as $computed,g as $reactive,J as $ref,R as computed,h as effect,C as h,H as manualTrack,q as mount,E as reactive,A as ref};
