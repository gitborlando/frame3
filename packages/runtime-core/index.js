var m={element:"element",textNode:"textNode",fragment:"fragment",component:"component"},A={beforeMount:"beforeMount",mounted:"mounted",beforeUpdate:"beforeUpdate",updated:"updated",beforeUnMount:"beforeUnMount",unMounted:"unMounted"};var B=null;function C(e){B=e}function R(){return Object.fromEntries(Object.keys(A).map(e=>[e,new Set]))}function v(e){return n=>e.lifeCycles[n].forEach(t=>t())}function Z(e){I("beforeMount",e)}function ee(e){I("mounted",e)}function ne(e){I("beforeUpdate",e)}function te(e){I("updated",e)}function oe(e){I("beforeUnMount",e)}function re(e){I("unMounted",e)}function I(e,n){B?.lifeCycles[e].add(n)}var V=new Set,ce=Promise.resolve(),F="is next tick can add",H=null;function $(e){V.has(e)||(V.add(e),ie())}function ie(){F!=="this tick has added"&&(H=ce.then(ae),F="this tick has added")}function ae(){try{V.forEach(e=>e())}finally{F="is next tick can add",V.clear(),H=null}}var l={string:e=>Object.prototype.toString.call(e)==="[object String]",number:e=>Object.prototype.toString.call(e)==="[object Number]",boolean:e=>Object.prototype.toString.call(e)==="[object Boolean]",undefined:e=>Object.prototype.toString.call(e)==="[object Undefined]",null:e=>Object.prototype.toString.call(e)==="[object Null]",function:e=>Object.prototype.toString.call(e)==="[object Function]",object:e=>Object.prototype.toString.call(e)==="[object Object]",array:e=>Object.prototype.toString.call(e)==="[object Array]",multi(e,n){return n.split("|").some(t=>this[t.trim()]?.(e))}},u={component:e=>e?.type===m.component,fragment:e=>e?.type===m.fragment,element:e=>e?.type===m.element,textNode:e=>e?.type===m.textNode};function s(e){return function n(t){return new Proxy(t,{get(r,o){D(r,o);let c=Reflect.get(r,o);return typeof c=="object"?n(c):c},set(r,o,c){return Reflect.set(r,o,c),K(r,o),K(r,E),!0}})}({value:e})}function P(e){return e}var g,j=[],b=new WeakMap;function D(e,n){if(!g)return;if(l.array(e)){if(n==="length")return;n=n===E?n:"length"}b.get(e)||b.set(e,new Map);let t=b.get(e);t?.get(n)||t.set(n,new Set),t.get(n).add(g)}var E=Symbol("manual-track-object-key");function ue(e){return D(e,E),e}function K(e,n){if(!e.hasOwnProperty(n)||n==="length")return;if(l.array(e)){if(n==="length")return;n=n===E?n:"length"}b.get(e)?.get(n)?.forEach(o=>{o!==g&&(o.scheduler?o.scheduler(o):o())})}function x(e,n){let t=Object.assign(()=>{try{if(!t.active)return;j.push(g=t),e(n)}finally{j.pop(),g=j.slice(-1)[0]}},{active:!0,scheduler:n?.scheduler||$});return t(),t}function le(e){let n=s("");return x(()=>n.value=e()),n}function se(e){return e()}function pe(e){return s()}function de(e){return P()}function fe(e){return e}function L(e){let{componentFunction:n,props:t,children:r}=e,o=e.componentInstance={isMounted:!1,props:{...t,children:r},lifeCycles:R()};C(o);let c=n(o.props);o.update=x(()=>{let i=c(),a=v(o);i.children=M(i.children),o.isMounted?(a("beforeUpdate"),y(o.subVnode,i),a("updated")):(a("beforeMount"),p(i),a("mounted"),o.isMounted=!0),e.el=i.el,o.subVnode=i,C(null),me(t,e)}),o.passiveUpdate=(i,a)=>{o.props={...i,children:a},C(o),c=n(o.props),o.update()},t.hasOwnProperty("ref")&&(t.ref.value=o)}function me(e,n){n.el instanceof Element&&e.hasOwnProperty("scope-id")&&(e.hasOwnProperty("className")||e.hasOwnProperty("class"))&&n.el.setAttribute("scope-"+e["scope-id"],"")}function q(e,n){n.componentInstance=e.componentInstance,!Ie(e.props,n.props)&&n.componentInstance.passiveUpdate(n.props,n.children)}function J({componentInstance:e}){if(!e)return;let n=v(e);n("beforeUnMount"),h(e.subVnode),e.update.active=!1,n("unMounted")}function Ie(e,n){return Object.keys(n).every(t=>e[t]===n[t])}function S(e,n){e.children[0]?.key&&n.children[0]?.key?ye(e.children,n.children):xe(e.children,n.children)}function xe(e,n){let t=e.length,r=n.length,o=Math.min(t,r);for(let c=0;c<o;c++)y(e[c],n[c]);if(r>t)return n.slice(o).forEach(c=>p(c));if(t>r)return e.slice(o).forEach(c=>h(c))}function ye(e,n){let t=0,r=e.length-1,o=n.length-1;for(;t<=r&&t<=o&&Q(e[t],n[t]);)y(e[t],n[t]),t++;for(;t<=r&&t<=o&&Q(e[r],n[o]);)y(e[t],n[t]),r--,o--;if(t>r)for(let c=t;c<=o;c++)p(n[c]);if(t>o)for(let c=t;c<=o;c++)h(e[c])}function Q(e,n){return e.type===n.type&&e.key===n.key}function T(e){k?.insertBefore(e,O)}function W(e,n=k){n&&(n.textContent=e)}function N(e){e?.remove()}var k,O;function w(){return{currentParentEl:k,currentAnchor:O}}function d({currentParentEl:e,currentAnchor:n}){let{currentParentEl:t,currentAnchor:r}=w();return O=n||null,e&&(k=e),function(){d({currentParentEl:t,currentAnchor:r})}}function U(e,n,t){let r=e?e.props:{},o=n.props,c=Object.entries(o).map(([i,a])=>i in r?r[i]!==a?[i,a]:void 0:[i,a]).filter(Boolean);for(let[i,a]of c)if(i.startsWith("on"))t.addEventListener(i.slice(2).toLocaleLowerCase(),a);else if(i==="style"){let G=Object.entries(a).map(([X,Y])=>`${X}: ${Y}`).join(";");t.setAttribute("style",G)}else i==="ref"?a.value=t:i.match(/className|class/)?t.className=a:i==="scope-id"?t.setAttribute(`scope-${a}`,""):t.setAttribute(i,a)}function f(e,n={},t=[]){let r={props:n,children:t,el:null,key:n.key},{textNode:o,component:c,fragment:i,element:a}=m;return e===0?{type:o,...r}:(r.children=M(r.children),l.string(e)?{type:a,tagName:e,...r}:l.array(e)?{type:i,anchor:null,...r}:{type:c,componentFunction:e,componentInstance:null,...r})}function M(e){let n=[];return e.forEach(t=>{if(l.string(t)||l.number(t))return n.push(f(0,{},[t]));if([void 0,null,!1].includes(t))return n.push(f(0,{},[""]));if(l.array(t))return n.push(f([],{},M(t)));n.push(t)}),n}function p(e){if(u.component(e))return L(e);if(u.fragment(e))return ge(e);if(u.element(e))return Ve(e);if(u.textNode(e))return Ee(e)}function y(e,n){return u.component(n)&&u.component(e)?q(e,n):u.fragment(n)&&u.fragment(e)?Te(e,n):u.element(n)&&u.element(e)?be(e,n):u.textNode(n)&&u.textNode(e)?Me(e,n):he(e,n)}function he(e,n){let t=d({currentAnchor:e.el?.nextSibling});h(e),p(n),t()}function h(e){return u.component(e)?J(e):u.fragment(e)?Ce(e):N(e?.el)}function ge(e){let n=e.el=document.createTextNode(""),t=e.anchor=document.createTextNode("");T(n),T(t);let{currentParentEl:r}=w();for(let o of e.children){let c=d({currentAnchor:t,currentParentEl:r});p(o),c()}}function Te(e,n){let t=(n.el=e.el)?.parentElement,r=n.anchor=e.anchor,o=d({currentAnchor:r,currentParentEl:t});S(e,n),o()}function Ce(e){let{el:n,anchor:t}=e;for(;n!==t;){let r=n?.nextSibling;N(n),n=r}N(t)}function Ve(e){let n=document.createElement(e.tagName);U(null,e,n),T(e.el=n);for(let t of e.children)d({currentParentEl:n}),p(t)}function be(e,n){let t=n.el=e.el;if(!t)return;U(e,n,t);let r=d({currentParentEl:t});S(e,n),r()}function Ee(e){let n=document.createTextNode(e.children[0].toString());T(e.el=n)}function Me(e,n){let t=n.el=e.el,r=e.children[0].toString(),o=n.children[0].toString();!t||o===r||W(o,t)}function Ne(e,n){d({currentParentEl:n}),L(f(e,{},[]))}var _=s(z());window.addEventListener("hashchange",e=>{_.value=z()});function ke({path:e,component:n}){let t=s(),r=s(!1);return x(()=>{let{isMatch:o,params:c}=ve(e,_.value);r.value=o,t.value=c}),()=>f([],{},r.value?[f(n,t.value,[])]:[])}function ve(e,n){if(!/:\w+/.test(e))return{isMatch:e===n,params:{}};let t="",r=e.replace(/(.*)(:\w+)/,(c,i,a)=>(t=a.slice(1),i+"(.*)")),o=n.match(new RegExp(r));return{isMatch:!!o,params:{[t]:o?.[1]}}}function z(){return location.hash.slice(1).replace(/\/$/,"")}export{se as $computed,P as $reactive,de as $ref,ke as Router,le as computed,x as effect,f as h,ue as manualTrack,Ne as mount,fe as nv,Z as onBeforeMount,oe as onBeforeUnMount,ne as onBeforeUpdate,ee as onMounted,re as onUnMounted,te as onUpdated,s as reactive,pe as ref};
//# sourceMappingURL=index.js.map
