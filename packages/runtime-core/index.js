var r={string:e=>Object.prototype.toString.call(e)==="[object String]",number:e=>Object.prototype.toString.call(e)==="[object Number]",boolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",undefined:e=>Object.prototype.toString.call(e)==="[object Undefined]",null:e=>Object.prototype.toString.call(e)==="[object Null]",function:e=>Object.prototype.toString.call(e)==="[object Function]",object:e=>Object.prototype.toString.call(e)==="[object Object]",array:e=>Object.prototype.toString.call(e)==="[object Array]"};function C(e){return function n(t){return new Proxy(t,{get(o,l){k(o,l);let c=Reflect.get(o,l);return typeof c=="object"?n(c):c},set(o,l,c){return Reflect.set(o,l,c),E(o,l),E(o,V),!0}})}({value:e})}function B(e){return e}var f,y=[],T=new WeakMap;function k(e,n){if(!f)return;if(r.array(e)){if(n==="length")return;n=n===V?n:"length"}T.get(e)||T.set(e,new Map);let t=T.get(e);t?.get(n)||t.set(n,new Set),f.shouldTrack&&t.get(n).add(f)}var V=Symbol("manual-track-object-key");function A(e){return k(e,V),e}function E(e,n){if(!e.hasOwnProperty(n)||n==="length")return;if(r.array(e)){if(n==="length")return;n=n===V?n:"length"}T.get(e)?.get(n)?.forEach(l=>l())}function h(e,n){let t=Object.assign(()=>{try{y.push(f=t);let o=y.slice(-2,-1)[0];if(o&&!o.isFirstRun){f.shouldTrack=!1;return}e(n),f.isFirstRun=!1}finally{y.pop(),f=y.slice(-1)[0]}},{isFirstRun:!0,shouldTrack:!0,scheduler:n?.scheduler});t()}function K(e){let n=C("");return h(()=>n.value=e()),n}function L(e){return e()}var a={element:"element",textNode:"textNode",component:"component"};function g(e,n){let{jsxTag:t,props:o}=e,l=t(o),c={isMounted:!1};e.componentInstance=c,c.update=()=>{if(!c.isMounted){let m=l();return m.children=b(m.children),p(m,n),c.subVnode=m,e.el=m.el,c.isMounted=!0}let i=c.subVnode,s=l();s.children=b(s.children),I(i,s,n),c.subVnode=s,e.el=s.el},h(c.update)}function N(e,n,t){n.componentInstance=e.componentInstance,n.componentInstance?.update()}function S(e,n,t){if(u(e)||u(n)){if(u(e)&&u(n)&&(t.textContent=n.children[0].children[0]),u(e)&&!u(n))for(let o of n.children)p(o,t);!u(n)&&u(n)&&(x(e),t.textContent=n.children[0].children[0])}e.children[0].key&&n.children[0].key?U(e.children,n.children,t):J(e.children,n.children,t)}function u(e){return e.children.length===1&&e.children[0]?.type===a.textNode}function J(e,n,t){let o=e.length,l=n.length,c=Math.min(o,l);for(let i=0;i<c;i++)I(e[i],n[i],t);if(l>o)return n.slice(c).forEach(i=>p(i,t));if(o>l)return e.slice(c).forEach(i=>x(i))}function U(e,n,t){let o=0,l=e.length-1,c=n.length-1;for(;o<=l&&o<=c&&F(e[o],n[o]);)I(e[o],n[o],t),o++;for(;o<=l&&o<=c&&F(e[l],n[c]);)I(e[o],n[o],t),l--,c--;if(console.log(o,l,c),o>l)for(let i=o;i<=c;i++)p(n[i],t);if(o>c)for(let i=o;i<=c;i++)x(e[i])}function F(e,n){return e.type===n.type&&e.key===n.key}function P(e,n){let t=document.createElement(e.jsxTag);n.appendChild(e.el=t),M(null,e,t);for(let o of e.children)p(o,t)}function O(e,n,t){let o=n.el=e.el;o&&(M(e,n,o),S(e,n,o))}function v(e,n){let t=document.createTextNode(e.children[0].toString());n.appendChild(e.el=t)}function w(e,n,t){let o=n.el=e.el;o&&(o.textContent=n.children[0].toString())}function M(e,n,t){let o=e?e.props:{},l=n.props,c=Object.entries(l).map(([i,s])=>i in o?o[i]!==s?[i,s]:void 0:[i,s]).filter(Boolean);for(let[i,s]of c)if(i.startsWith("on"))t.addEventListener(i.slice(2).toLocaleLowerCase(),s);else if(i==="style"){let m=Object.entries(s).map(([$,R])=>`${$}: ${R}`).join(";");t.setAttribute("style",m)}else i==="className"?t.className=s:i==="scope-id"?t.setAttribute(`scope-${s}`,""):t.setAttribute(i,s)}function j(e,n={},t=[]){let o={props:n,children:t,el:null,componentInstance:null,key:n.key};return e===0?{type:a.textNode,jsxTag:e,...o}:r.string(e)?(o.children=b(o.children),{type:a.element,jsxTag:e,...o}):{type:a.component,jsxTag:e,...o}}function b(e){let n=[];return e.forEach(t=>{if(r.string(t)||r.number(t))return n.push(j(0,{},[t]));if(r.array(t))return n.push(...b(t));r.undefined(t)||r.null(t)||n.push(t)}),n}function W(e,n){g(j(typeof e=="function"?e:()=>()=>e,{},[]),n)}function p(e,n){if(d.component(e))return g(e,n);if(d.element(e))return P(e,n);if(d.textNode(e))return v(e,n)}function I(e,n,t){if(d.component(n)&&d.component(e))return N(e,n,t);if(d.element(n)&&d.element(e))return O(e,n,t);if(d.textNode(n)&&d.textNode(e))return w(e,n,t);x(e),p(n,t)}function x(e){d.component(e)&&e.componentInstance?x(e.componentInstance.subVnode):e.el?.remove()}var d={component:e=>e?.type===a.component,element:e=>e?.type===a.element,textNode:e=>e?.type===a.textNode};export{L as $computed,B as $reactive,A as $track,K as computed,h as effect,j as h,W as mount,C as reactive};
