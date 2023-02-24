var r={string:e=>Object.prototype.toString.call(e)==="[object String]",number:e=>Object.prototype.toString.call(e)==="[object Number]",boolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",undefined:e=>Object.prototype.toString.call(e)==="[object Undefined]",null:e=>Object.prototype.toString.call(e)==="[object Null]",function:e=>Object.prototype.toString.call(e)==="[object Function]",object:e=>Object.prototype.toString.call(e)==="[object Object]",array:e=>Object.prototype.toString.call(e)==="[object Array]"};function E(e){return function n(t){return new Proxy(t,{get(o,l){C(o,l);let i=Reflect.get(o,l);return typeof i=="object"?n(i):i},set(o,l,i){return Reflect.set(o,l,i),j(o,l),j(o,k),!0}})}({value:e})}function B(e){return e}var f,b=[],T=new WeakMap;function C(e,n){if(!f)return;r.array(e)&&(n="length"),T.get(e)||T.set(e,new Map);let t=T.get(e);t?.get(n)||t.set(n,new Set),f.shouldTrack&&t.get(n).add(f)}var k=Symbol("manual-track-object-key");function A(e){return C(e,k),e}function j(e,n){if(!e.hasOwnProperty(n)||r.array(e)&&n==="length")return;n="length",T.get(e)?.get(n)?.forEach(l=>l())}function V(e,n){let t=Object.assign(()=>{try{b.push(f=t);let o=b.slice(-2,-1)[0];if(o&&!o.isFirstRun){f.shouldTrack=!1;return}e(n),f.isFirstRun=!1}finally{b.pop(),f=b.slice(-1)[0]}},{isFirstRun:!0,shouldTrack:!0,scheduler:n?.scheduler});t()}function K(e){let n=E("");return V(()=>n.value=e()),n}function L(e){return e()}var a={element:"element",textNode:"textNode",component:"component"};function h(e,n){let{jsxTag:t,props:o}=e,l=t(o),i={isMounted:!1};e.componentInstance=i,i.update=()=>{if(!i.isMounted){let m=l();return m.children=y(m.children),p(m,n),i.subVnode=m,e.el=m.el,i.isMounted=!0}let c=i.subVnode,s=l();s.children=y(s.children),I(c,s,n),i.subVnode=s,e.el=s.el},V(i.update)}function N(e,n,t){n.componentInstance=e.componentInstance,n.componentInstance?.update()}function S(e,n,t){if(u(e)||u(n)){if(u(e)&&u(n)&&(t.textContent=n.children[0].children[0]),u(e)&&!u(n))for(let o of n.children)p(o,t);!u(n)&&u(n)&&(x(e),t.textContent=n.children[0].children[0])}e.children[0].key&&n.children[0].key?U(e.children,n.children,t):J(e.children,n.children,t)}function u(e){return e.children.length===1&&e.children[0]?.type===a.textNode}function J(e,n,t){let o=e.length,l=n.length,i=Math.min(o,l);for(let c=0;c<i;c++)I(e[c],n[c],t);if(l>o)return n.slice(i).forEach(c=>p(c,t));if(o>l)return e.slice(i).forEach(c=>x(c))}function U(e,n,t){let o=0,l=e.length-1,i=n.length-1;for(;o<=l&&o<=i&&F(e[o],n[o]);)I(e[o],n[o],t),o++;for(;o<=l&&o<=i&&F(e[l],n[i]);)I(e[o],n[o],t),l--,i--;if(console.log(o,l,i),o>l)for(let c=o;c<=i;c++)p(n[c],t);if(o>i)for(let c=o;c<=i;c++)x(e[c])}function F(e,n){return e.type===n.type&&e.key===n.key}function P(e,n){let t=document.createElement(e.jsxTag);n.appendChild(e.el=t),M(null,e,t);for(let o of e.children)p(o,t)}function O(e,n,t){let o=n.el=e.el;o&&(M(e,n,o),S(e,n,o))}function v(e,n){let t=document.createTextNode(e.children[0].toString());n.appendChild(e.el=t)}function w(e,n,t){let o=n.el=e.el;o&&(o.textContent=n.children[0].toString())}function M(e,n,t){let o=e?e.props:{},l=n.props,i=Object.entries(l).map(([c,s])=>c in o?o[c]!==s?[c,s]:void 0:[c,s]).filter(Boolean);for(let[c,s]of i)if(c.startsWith("on"))console.log(s),t.addEventListener(c.slice(2).toLocaleLowerCase(),s);else if(c==="style"){let m=Object.entries(s).map(([$,R])=>`${$}: ${R}`).join(";");t.setAttribute("style",m)}else c==="className"?t.className=s:c==="scope-id"?t.setAttribute(`scope-${s}`,""):t.setAttribute(c,s)}function g(e,n={},t=[]){let o={props:n,children:t,el:null,componentInstance:null,key:n.key};return e===0?{type:a.textNode,jsxTag:e,...o}:r.string(e)?(o.children=y(o.children),{type:a.element,jsxTag:e,...o}):{type:a.component,jsxTag:e,...o}}function y(e){let n=[];return e.forEach(t=>{if(r.string(t)||r.number(t))return n.push(g(0,{},[t]));if(r.array(t))return n.push(...y(t));r.undefined(t)||r.null(t)||n.push(t)}),n}function W(e,n){h(g(typeof e=="function"?e:()=>()=>e,{},[]),n)}function p(e,n){if(d.component(e))return h(e,n);if(d.element(e))return P(e,n);if(d.textNode(e))return v(e,n)}function I(e,n,t){if(d.component(n)&&d.component(e))return N(e,n,t);if(d.element(n)&&d.element(e))return O(e,n,t);if(d.textNode(n)&&d.textNode(e))return w(e,n,t);x(e),p(n,t)}function x(e){d.component(e)&&e.componentInstance?x(e.componentInstance.subVnode):e.el?.remove()}var d={component:e=>e?.type===a.component,element:e=>e?.type===a.element,textNode:e=>e?.type===a.textNode};export{L as $computed,B as $reactive,A as $track,K as computed,V as effect,g as h,W as mount,E as reactive};
