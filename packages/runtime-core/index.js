var l={element:"element",textNode:"textNode",fragment:"fragment",component:"component"};var u={string:e=>Object.prototype.toString.call(e)==="[object String]",number:e=>Object.prototype.toString.call(e)==="[object Number]",boolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",undefined:e=>Object.prototype.toString.call(e)==="[object Undefined]",null:e=>Object.prototype.toString.call(e)==="[object Null]",function:e=>Object.prototype.toString.call(e)==="[object Function]",object:e=>Object.prototype.toString.call(e)==="[object Object]",array:e=>Object.prototype.toString.call(e)==="[object Array]",multi(e,n){return n.split("|").some(t=>this[t.trim()]?.(e))}},i={component:e=>e?.type===l.component,fragment:e=>e?.type===l.fragment,element:e=>e?.type===l.element,textNode:e=>e?.type===l.textNode};var y=new Set,W=Promise.resolve(),M="Leaved a Tick",R=null;function O(e){y.has(e)||(y.add(e),_())}function _(){M!=="Entered a Tick"&&(R=W.then(z),M="Entered a Tick")}function z(){try{y.forEach(e=>e())}finally{M="Leaved a Tick",y.clear(),R=null}}function p(e){return function n(t){return new Proxy(t,{get(r,o){A(r,o);let a=Reflect.get(r,o);return typeof a=="object"?n(a):a},set(r,o,a){return Reflect.set(r,o,a),w(r,o),w(r,E),!0}})}({value:e})}function v(e){return e}var f,N=[],V=new WeakMap;function A(e,n){if(!f)return;if(u.array(e)){if(n==="length")return;n=n===E?n:"length"}V.get(e)||V.set(e,new Map);let t=V.get(e);t?.get(n)||t.set(n,new Set),f.shouldTrack&&t.get(n).add(f)}var E=Symbol("manual-track-object-key");function G(e){return A(e,E),e}function w(e,n){if(!e.hasOwnProperty(n)||n==="length")return;if(u.array(e)){if(n==="length")return;n=n===E?n:"length"}V.get(e)?.get(n)?.forEach(o=>{o!==f&&(o.scheduler?o.scheduler(o):o())})}function x(e,n){let t=Object.assign(()=>{try{N.push(f=t),e(n),f.isFirstRun=!1}finally{N.pop(),f=N.slice(-1)[0]}},{isFirstRun:!0,shouldTrack:!0,scheduler:n?.scheduler||O});t()}function X(e){let n=p("");return x(()=>n.value=e()),n}function Y(e){return e()}function Z(e){return p()}function ee(e){return v()}function P(e){let{jsxTag:n,props:t,children:r}=e,o=e.componentInstance={isMounted:!1,props:{...t,children:r}},a=n(o.props);o.update=()=>{let c=a();c.children=b(c.children),o.isMounted?T(o.subVnode,c):(d(c),o.isMounted=!0),o.subVnode=c,e.el=c.el},o.passiveUpdate=(c,s)=>{o.props={...c,children:s},a=n(o.props),o.update()},t.hasOwnProperty("ref")&&(t.ref.value=o),x(o.update)}function H(e,n){n.componentInstance=e.componentInstance,!ne(e.props,n.props)&&n.componentInstance.passiveUpdate(n.props,n.children)}function $(e){e.componentInstance&&g(e.componentInstance.subVnode)}function ne(e,n){return Object.keys(n).every(t=>e[t]===n[t])}function h(e){j?.insertBefore(e,k)}function K(e,n=j){n&&(n.textContent=e)}function C(e){e?.remove()}var j,k;function F(){return{currentParentEl:j,currentAnchorEl:k}}function I({currentParentEl:e,currentAnchorEl:n}){let{currentParentEl:t,currentAnchorEl:r}=F();return e&&(j=e),k=n||null,function(){I({currentParentEl:t,currentAnchorEl:r})}}function S(e,n,t){let r=e?e.props:{},o=n.props,a=Object.entries(o).map(([c,s])=>c in r?r[c]!==s?[c,s]:void 0:[c,s]).filter(Boolean);for(let[c,s]of a)if(c.startsWith("on"))t.addEventListener(c.slice(2).toLocaleLowerCase(),s);else if(c==="style"){let J=Object.entries(s).map(([q,Q])=>`${q}: ${Q}`).join(";");t.setAttribute("style",J)}else c==="ref"?s.value=t:c.match(/className|class/)?t.className=s:c==="scope-id"?t.setAttribute(`scope-${s}`,""):t.setAttribute(c,s)}function L(e,n){e.children[0]?.key&&n.children[0]?.key?oe(e.children,n.children):te(e.children,n.children)}function te(e,n){let t=e.length,r=n.length,o=Math.min(t,r);for(let a=0;a<o;a++)T(e[a],n[a]);if(r>t)return n.slice(o).forEach(a=>d(a));if(t>r)return e.slice(o).forEach(a=>g(a))}function oe(e,n){let t=0,r=e.length-1,o=n.length-1;for(;t<=r&&t<=o&&B(e[t],n[t]);)T(e[t],n[t]),t++;for(;t<=r&&t<=o&&B(e[r],n[o]);)T(e[t],n[t]),r--,o--;if(t>r)for(let a=t;a<=o;a++)d(n[a]);if(t>o)for(let a=t;a<=o;a++)g(e[a])}function B(e,n){return e.type===n.type&&e.key===n.key}function m(e,n={},t=[]){let r={props:n,children:t,el:null,key:n.key};return e===0?{type:l.textNode,jsxTag:e,...r}:u.function(e)?{type:l.component,jsxTag:e,componentInstance:null,...r}:(r.children=b(r.children),u.array(e)?{type:l.fragment,jsxTag:e,anchor:null,...r}:{type:l.element,jsxTag:e,...r})}function b(e){let n=[];return e.forEach(t=>{if(u.multi(t,"string|number"))return n.push(m(0,{},[t]));if(u.multi(t,"undefined|null"))return n.push(m(0,{},[""]));if(u.array(t))return n.push(m([],{},b(t)));n.push(t)}),n}function d(e){if(i.component(e))return P(e);if(i.fragment(e))return re(e);if(i.element(e))return ie(e);if(i.textNode(e))return le(e)}function T(e,n){if(i.component(n)&&i.component(e))return H(e,n);if(i.fragment(n)&&i.fragment(e))return ae(e,n);if(i.element(n)&&i.element(e))return se(e,n);if(i.textNode(n)&&i.textNode(e))return ue(e,n);g(e),d(n)}function g(e){return i.component(e)?$(e):i.fragment(e)?ce(e):C(e?.el)}function re(e){let n=e.el=document.createTextNode(""),t=e.anchor=document.createTextNode("");h(n),h(t);let{currentParentEl:r}=F();for(let o of e.children)I({currentAnchorEl:t,currentParentEl:r}),d(o)}function ae(e,n){let t=(n.el=e.el)?.parentElement,r=n.anchor=e.anchor,o=I({currentAnchorEl:r,currentParentEl:t});L(e,n),o()}function ce(e){let{el:n,anchor:t}=e;for(;n!==t;){let r=n?.nextSibling;C(n),n=r}C(t)}function ie(e){let n=document.createElement(e.jsxTag);S(null,e,n),h(e.el=n);for(let t of e.children)I({currentParentEl:n}),d(t)}function se(e,n){let t=n.el=e.el;if(!t)return;S(e,n,t);let r=I({currentParentEl:t});L(e,n),r()}function le(e){let n=document.createTextNode(e.children[0].toString());h(e.el=n)}function ue(e,n){let t=n.el=e.el,r=e.children[0].toString(),o=n.children[0].toString();o!==r&&K(o,t||void 0)}function pe(e,n){I({currentParentEl:n}),P(m(e,{},[]))}var U=p(D());window.addEventListener("hashchange",e=>{U.value=D()});function de({path:e,component:n}){let t=p(),r=p(!1);return x(()=>{let{isMatch:o,params:a}=me(e,U.value);r.value=o,t.value=a}),()=>m([],{},r.value?[m(n,t.value,[])]:[])}function me(e,n){if(!/:\w+/.test(e))return{isMatch:e===n,params:{}};let t="",r=e.replace(/(.*)(:\w+)/,(a,c,s)=>(t=s.slice(1),c+"(.*)")),o=n.match(new RegExp(r));return{isMatch:!!o,params:{[t]:o?.[1]}}}function D(){return location.hash.slice(1).replace(/\/$/,"")}export{Y as $computed,v as $reactive,ee as $ref,de as Router,X as computed,x as effect,m as h,G as manualTrack,pe as mount,p as reactive,Z as ref};
