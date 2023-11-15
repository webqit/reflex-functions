(()=>{var Vt=Object.defineProperty;var Zt=(n,t,e)=>t in n?Vt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var _t=(n,t)=>{for(var e in t)Vt(n,e,{get:t[e],enumerable:!0})};var N=(n,t,e)=>(Zt(n,typeof t!="symbol"?t+"":t,e),e);var Mt={};_t(Mt,{Observer:()=>h,QuantumAsyncFunction:()=>Ae,QuantumAsyncScript:()=>at,QuantumModule:()=>ft,State:()=>K});var Nt={};_t(Nt,{apply:()=>dt,batch:()=>xt,construct:()=>Ct,defineProperties:()=>we,defineProperty:()=>nt,deleteProperties:()=>_e,deleteProperty:()=>it,get:()=>I,getOwnPropertyDescriptor:()=>yt,getOwnPropertyDescriptors:()=>xe,getPrototypeOf:()=>jt,has:()=>gt,intercept:()=>ge,isExtensible:()=>kt,observe:()=>It,ownKeys:()=>rt,path:()=>ye,preventExtensions:()=>Rt,read:()=>be,reduce:()=>Ft,set:()=>L,setPrototypeOf:()=>St});function P(n){return!Array.isArray(n)&&typeof n=="object"&&n}function J(n){return typeof n}function T(n){return Array.isArray(n)}function vt(n,t,e=null){return T(t)?n.filter(r=>e?t.filter(i=>e(r,i)).length:t.indexOf(r)!==-1):[]}function lt(n,...t){if(globalThis.webqit||(globalThis.webqit={}),globalThis.webqit.refs||Object.defineProperty(globalThis.webqit,"refs",{value:new Y}),!arguments.length)return globalThis.webqit.refs;let e=globalThis.webqit.refs.get(n);e||(e=new Y,globalThis.webqit.refs.set(n,e));let r,i;for(;r=t.shift();)(i=e)&&!(e=e.get(r))&&(e=new Y,i.set(r,e));return e}var Y=class extends Map{constructor(...t){super(...t),this.observers=new Set}set(t,e){let r=super.set(t,e);return this.fire("set",t,e,t),r}delete(t){let e=super.delete(t);return this.fire("delete",t),e}has(t){return this.fire("has",t),super.has(t)}get(t){return this.fire("get",t),super.get(t)}keyNames(){return Array.from(super.keys())}observe(t,e,r){let i={type:t,key:e,callback:r};return this.observers.add(i),()=>this.observers.delete(i)}unobserve(t,e,r){if(Array.isArray(t)||Array.isArray(e))throw new Error('The "type" and "key" arguments can only be strings.');for(let i of this.observers)!(ct([t,"*"],i.type)&&ct([e,"*"],i.key)&&i.callback===r)||this.observers.delete(i)}fire(t,e,...r){for(let i of this.observers)!(ct([t,"*"],i.type)&&ct([e,"*"],i.key))||i.callback(...r)}},ct=(n,t)=>Array.isArray(t)?vt(n,t).length:n.includes(t);function G(n){return typeof n=="function"}function Ot(n){return n===null||n===""}function z(n){return arguments.length&&(n===void 0||typeof n>"u")}function E(n){return Array.isArray(n)||typeof n=="object"&&n||G(n)}function Pt(n){return Ot(n)||z(n)||n===!1||n===0||E(n)&&!Object.keys(n).length}function R(n){return G(n)||n&&{}.toString.call(n)==="[object function]"}function pt(n){return n instanceof String||typeof n=="string"&&n!==null}function Et(n){return!pt(n)&&!z(n.length)}function q(n,t=!0){return T(n)?n:!t&&P(n)?[n]:n!==!1&&n!==0&&Pt(n)?[]:Et(n)?Array.prototype.slice.call(n):P(n)?Object.values(n):[n]}var x=(...n)=>lt("observer-api",...n),Q=(n,t)=>n instanceof Promise?n.then(t):t(n),ht={};var M=class{constructor(t,e){this.registry=t,Object.assign(this,{...e,target:t.target}),this.params.signal&&this.params.signal.addEventListener("abort",()=>this.remove())}remove(){return this.removed=!0,this.registry.removeRegistration(this)}};var Z=class extends M{constructor(){super(...arguments),this.emit.currentRegistration=this,Object.defineProperty(this,"abortController",{value:new AbortController}),Object.defineProperty(this,"signal",{value:this.abortController.signal}),ht.setMaxListeners?.(0,this.signal)}remove(){this.abortController.abort(),super.remove()}fire(t){if(this.emit.recursionTarget&&!["inject","force-async","force-sync"].includes(this.params.recursions))return;let e=t,r=this.filter;if(r!==1/0&&(r=q(r,!1))&&(e=t.filter(i=>r.includes(i.key))),this.params.diff&&(e=e.filter(i=>i.type!=="set"||i.value!==i.oldValue)),e.length){if(this.emit.recursionTarget&&this.params.recursions!=="force-sync"){this.emit.recursionTarget.push(...e);return}this.emit.recursionTarget=this.params.recursions==="inject"?e:[];let i=this.filter===1/0||Array.isArray(this.filter)?this.emit(e,this):this.emit(e[0],this);return Q(i,s=>{let o=this.emit.recursionTarget;return delete this.emit.recursionTarget,this.params.recursions==="force-async"&&o.length?this.emit.currentRegistration.fire(o):s})}}};var V=class{constructor(t){this.target=t,this.entries=[]}addRegistration(t){return this.entries.push(t),t}removeRegistration(t){this.entries=this.entries.filter(e=>e!==t)}static _getInstance(t,e,r=!0,i=this.__namespace){if(!E(e))throw new Error(`Subject must be of type object; "${J(e)}" given!`);let s=this;return i&&x("namespaces").has(t+"-"+i)&&(s=x("namespaces").get(t+"-"+i),t+="-"+i),!x(e,"registry").has(t)&&r&&x(e,"registry").set(t,new s(e)),x(e,"registry").get(t)}static _namespace(t,e,r=null){if(t+="-"+e,arguments.length===2)return x("namespaces").get(t);if(!(r.prototype instanceof this))throw new Error(`The implementation of the namespace ${this.name}.${e} must be a subclass of ${this.name}.`);x("namespaces").set(t,r),r.__namespace=e}};var $=class{constructor(t,e){if(this.target=t,!e.operation)throw new Error("Descriptor operation must be given in definition!");Object.assign(this,e)}};var D=class extends V{static getInstance(t,e=!0,r=null){return super._getInstance("listeners",...arguments)}static namespace(t,e=null){return super._namespace("listeners",...arguments)}constructor(t){super(t),this.batches=[]}addRegistration(t,e,r){return super.addRegistration(new Z(this,{filter:t,emit:e,params:r}))}emit(t,e=!1){if(this.batches.length){this.batches[0].snapshots.push({events:[...t],isPropertyDescriptors:e});return}this.$emit(this.entries,[{events:t,isPropertyDescriptors:e}])}$emit(t,e){let r=t.filter(f=>f.params.withPropertyDescriptors).length,i=e.some(f=>f.isPropertyDescriptors),s=[],o=[],u=t.length;e.forEach(f=>{(r||!i)&&s.push(...f.events),r!==u&&i&&(f.isPropertyDescriptors?o.push(...f.events.map(a=>{let{target:c,type:l,...p}=a,m=new $(c,{type:"set",...p});return Object.defineProperty(m,"value","get"in p.value?{get:()=>p.value.get()}:{value:p.value.value}),p.oldValue&&Object.defineProperty(m,"oldValue","get"in p.oldValue?{get:()=>p.oldValue.get()}:{value:p.oldValue.value}),m})):o.push(...f.events))}),t.forEach(f=>{f.params.withPropertyDescriptors?f.fire(s.length?s:o):f.fire(o.length?o:s)})}batch(t){this.batches.unshift({entries:[...this.entries],snapshots:[]});let e=t();return Q(e,r=>{let i=this.batches.shift();return i.snapshots.length&&this.$emit(i.entries,i.snapshots),r})}};var tt=class extends M{exec(t,e,r){return this.running||!this.traps[t.operation]?e(...Array.prototype.slice.call(arguments,2)):(this.running=!0,this.traps[t.operation](t,r,(...i)=>(this.running=!1,e(...i))))}};var F=class extends V{static getInstance(t,e=!0,r=null){return super._getInstance("traps",...arguments)}static namespace(t,e=null){return super._namespace("traps",...arguments)}addRegistration(t){return super.addRegistration(new tt(this,t))}emit(t,e=null){let r=this;return function i(s,...o){let u=r.entries[s];return u?u.exec(t,(...f)=>i(s+1,...f),...o):e?e(t,...o):o[0]}(0)}};var Tt={};_t(Tt,{accessorize:()=>me,proxy:()=>Ht,unaccessorize:()=>de,unproxy:()=>et});function me(n,t,e={}){n=mt(n);let r=x(n,"accessorizedProps");function i(f){let a,c=n;do a=Object.getOwnPropertyDescriptor(c,f);while(!a&&(c=Object.getPrototypeOf(c)));return a?{proto:c,descriptor:a}:{descriptor:{value:void 0,configurable:!0,enumerable:!0,writable:!0}}}function s(f){if(r.has(f+""))return!0;let a=i(f);a.getValue=function(p=!1){return p?this.descriptor:this.descriptor.get?this.descriptor.get():this.descriptor.value},a.setValue=function(p,m=!1){if(this.dirty=!0,m){this.descriptor=p;return}return this.descriptor.set?this.descriptor.set(p)!==!1:(this.descriptor.value=p,!0)},a.intact=function(){let p=Object.getOwnPropertyDescriptor(n,f);return p?.get===l.get&&p?.set===l.set&&r.get(f+"")===this},a.restore=function(){return this.intact()?(this.proto&&this.proto!==n||!this.proto&&!this.dirty?delete n[f]:Object.defineProperty(n,f,this.descriptor),r.delete(f+""),!0):!1},r.set(isNaN(f)?f:parseInt(f),a);let{enumerable:c=!0}=a.descriptor,l={enumerable:c,configurable:!0};("value"in a.descriptor||a.descriptor.set)&&(l.set=function(p){return L(this,f,p,e)}),("value"in a.descriptor||a.descriptor.get)&&(l.get=function(){return I(this,f,e)});try{return Object.defineProperty(n,f,l),!0}catch{return r.delete(f+""),!1}}let u=(Array.isArray(t)?t:t===void 0?Object.keys(n):[t]).map(s);return t===void 0||Array.isArray(t)?u:u[0]}function de(n,t,e={}){n=mt(n);let r=x(n,"accessorizedProps");function i(u){return r.has(u+"")?r.get(u+"").restore():!0}let o=(Array.isArray(t)?t:t===void 0?Object.keys(n):[t]).map(i);return t===void 0||Array.isArray(t)?o:o[0]}function Ht(n,t={},e=void 0){let r=mt(n);if(typeof t.membrane=="boolean")throw new Error("The params.membrane parameter cannot be of type boolean.");if(t.membrane&&x(r,"membraneRef").has(t.membrane))return x(r,"membraneRef").get(t.membrane);let i={apply(u,f,a){if(Array.isArray(f)){let c=mt(f);return x(c).set("$length",c.length),xt(c,()=>dt(u,f,a))}return dt(u,et(f),a)},construct:(u,f,a=null)=>Ct(u,f,a,t),defineProperty:(u,f,a)=>nt(u,f,a,t),deleteProperty:(u,f)=>it(u,f,t),get:(u,f,a=null)=>{let c={...t,receiver:a};Array.isArray(u)&&f==="length"&&x(u).has("$length")&&(c.forceValue=x(u).get("$length"));let l=I(u,f,c);return Array.isArray(u)&&typeof l=="function"?Ht(l,{...t,membrane:a}):l},getOwnPropertyDescriptor:(u,f)=>yt(u,f,t),getPrototypeOf:u=>jt(u,t),has:(u,f)=>gt(u,f,t),isExtensible:u=>kt(u,t),ownKeys:u=>rt(u,t),preventExtensions:u=>Rt(u,t),set:(u,f,a,c=null)=>{let l={...t,receiver:c};return Array.isArray(u)&&f==="length"&&(l.forceOldValue=x(u).get("$length"),x(u).set("$length",a)),L(u,f,a,l)},setPrototypeOf:(u,f)=>St(u,f,t)},s=e?.(i)||i,o=new Proxy(r,s);return t.membrane&&x(r,"membraneRef").set(t.membrane,o),x(o).set(o,r),o}function et(n){return x(n).get(n)||n}function mt(n){if(!n||!E(n))throw new Error("Target must be of type object!");return et(n)}var ot=class extends Array{};function ye(...n){return new ot(...n)}function Ft(n,t,e,r=s=>s,i={}){if(!!t.length)return function s(o,u,f){let a=u[f.level],c=f.level===u.length-1;return o instanceof $&&o.operation!=="get"?f={...f,probe:"always"}:f.probe!=="always"&&(f={...f,probe:!c}),e(o,a,(l,...p)=>{let m=d=>{d instanceof $&&(d.path=[d.key],o instanceof $&&(d.path=o.path.concat(d.key),Object.defineProperty(d,"context",{get:()=>o,configurable:!0})))},v=d=>{let _=k(d,!1);return Q(_,y=>{d instanceof $?d.value=y:d=y;let g=p[0]||{};return s(d,u,{...f,...g,level:f.level+1})})};return bt(a)&&Array.isArray(l)?(l.forEach(m),c?r(l,...p):l.map(v)):(m(l),c?r(l,...p):v(l))},f)}(n,t.slice(0),{...i,level:0})}function It(n,t,e,r={}){if(n=k(n,!r.level),R(arguments[1])&&([,e,r={}]=arguments,t=1/0),!R(e))throw new Error(`Handler must be a function; "${J(e)}" given!`);if(t instanceof ot)return Ft(n,t,It,e,r);if(r={...r,descripted:!0},delete r.live,!E(n))return r.probe&&I(n,t,e,r);let i=Jt(n,t,e,r);return r.probe?I(n,t,i,r):i()}function ge(n,t,e={}){return n=k(n),P(t)||([,,,e={}]=arguments,t={[arguments[1]]:arguments[2]}),F.getInstance(n,!0,e.namespace).addRegistration({traps:t,params:e})}function yt(n,t,e=i=>i,r={}){return C(n,"getOwnPropertyDescriptor",{key:t},e,r)}function xe(n,t,e=i=>i,r={}){return C(n,"getOwnPropertyDescriptors",{key:t},e,r)}function jt(n,t=r=>r,e={}){return C(n,"getPrototypeOf",{},t,e)}function kt(n,t=r=>r,e={}){return C(n,"isExtensible",{},t,e)}function rt(n,t=r=>r,e={}){return C(n,"ownKeys",{},t,e)}function gt(n,t,e=i=>i,r={}){return C(n,"has",{key:t},e,r)}function I(n,t,e=i=>i,r={}){let i,s=k(n,!r.level);return P(e)?[r,e]=[e,o=>o]:r.live&&(i=!0),t instanceof ot?Ft(s,t,I,e,r):ve(s,t,o=>{let u=[...o];return function f(a,c,l){if(!c.length)return l(a);let p=c.shift();if(!["string","number","symbol"].includes(typeof p))throw new Error(`Property name/key ${p} invalid.`);function m(_,y=void 0){let g=w=>(_.value=w,f([...a,r.live||r.descripted?_:w],c,l));if(arguments.length>1)return g(y);if(!E(s))return g(s?.[_.key]);let b=x(s,"accessorizedProps",!1),O=b&&b.get(_.key);if(O&&O.intact())return g(O.getValue(r.withPropertyDescriptors));if(r.withPropertyDescriptors){let w=Object.getOwnPropertyDescriptor(s,_.key);return"forceValue"in r&&"value"in w&&(w.value=r.forceValue),g(w)}return"forceValue"in r?g(r.forceValue):g(Reflect.get(s,_.key,...r.receiver?[r.receiver]:[]))}let v=new $(s,{type:"get",key:p,value:void 0,operation:"get",related:u});if(!E(s))return m(v);let d=F.getInstance(s,!1,r.namespace);return d?d.emit(v,m):m(v)}([],o.slice(0),f=>{let a=bt(t)?f:f[0];return i&&E(s)?Jt(s,t,e,r)(a):e(a)})},r)}function xt(n,t,e={}){return n=k(n),D.getInstance(n,!0,e.namespace).batch(t)}function be(n,t,e={}){t=k(t),n=k(n);let r=(e.only||[]).slice(0),i=(e.except||[]).slice(0),s=rt(e.spread?[...n]:n).map(a=>isNaN(a)?a:parseInt(a)),o=r.length?r.filter(a=>s.includes(a)):s.filter(a=>!i.includes(a)),u=a=>!Array.isArray(t)||isNaN(a)?a:a-i.filter(c=>c<a).length,f=a=>{let c=yt(n,a,e);"value"in c&&c.writable&&c.enumerable&&c.configurable?L(t,u(a),c.value,e):(c.enumerable||e.onlyEnumerable===!1)&&nt(t,a,{...c,configurable:!0},e)};return xt(t,()=>{o.forEach(f)}),It(n,a=>{a.filter(c=>r.length?r.includes(c.key):!i.includes(c.key)).forEach(c=>{if(c.operation==="deleteProperty")return it(t,u(c.key),e);if(c.operation==="defineProperty"){(c.value.enumerable||e.onlyEnumerable===!1)&&nt(t,u(c.key),{...c.value,configurable:!0},e);return}f(c.key)})},{...e,withPropertyDescriptors:!0})}function L(n,t,e,r=o=>o,i={},s=!1){let o=k(n),u=[[t,e]];P(t)&&([,,r=a=>a,i={},s=!1]=arguments,u=Object.entries(t)),P(r)&&([s,i,r]=[typeof i=="boolean"?i:s,r,a=>a]);let f=u.map(([a])=>a);return function a(c,l,p){if(!l.length)return p(c);let[m,v]=l.shift();function d(y,g=void 0){let b=Yt=>(y.status=Yt,a(c.concat(y),l,p));if(arguments.length>1)return b(y,g);let O=x(o,"accessorizedProps",!1),w=O&&O.get(y.key);return y.operation==="defineProperty"?(w&&!w.restore()&&b(!1),Object.defineProperty(o,y.key,y.value),b(!0)):w&&w.intact()?b(w.setValue(y.value)):b(Reflect.set(o,y.key,y.value))}function _(y,g){if(i.diff&&v===g)return a(c,l,p);let b=new $(o,{type:s?"def":"set",key:m,value:v,isUpdate:y,oldValue:g,related:[...f],operation:s?"defineProperty":"set",detail:i.detail}),O=F.getInstance(o,!1,i.namespace);return O?O.emit(b,d):d(b)}return gt(o,m,y=>{if(!y)return _(y);let g={...i,withPropertyDescriptors:s};return"forceOldValue"in i&&(g.forceValue=i.forceOldValue),I(o,m,b=>_(y,b),g)},i)}([],u.slice(0),a=>{let c=D.getInstance(o,!1,i.namespace);return c&&c.emit(a,s),r(bt(t)?a.map(l=>l.status):a[0]?.status)})}function nt(n,t,e,r=s=>s,i={}){return L(n,t,e,r,i,!0)}function we(n,t,e=i=>i,r={}){return L(n,t,e,r,!0)}function it(n,t,e=i=>i,r={}){n=k(n),P(e)&&([r,e]=[e,o=>o]);let i=q(t,!1),s=[...i];return function o(u,f,a){if(!f.length)return a(u);let c=f.shift();function l(m,v=void 0){let d=g=>(m.status=g,o(u.concat(m),f,a));if(arguments.length>1)return d(m,v);let _=x(n,"accessorizedProps",!1),y=_&&_.get(m.key);return y&&!y.restore()&&d(!1),d(Reflect.deleteProperty(n,m.key))}function p(m){let v=new $(n,{type:"delete",key:c,oldValue:m,related:[...s],operation:"deleteProperty",detail:r.detail}),d=F.getInstance(n,!1,r.namespace);return d?d.emit(v,l):l(v)}return I(n,c,p,r)}([],i.slice(0),o=>{let u=D.getInstance(n,!1,r.namespace);return u&&u.emit(o),e(bt(t)?o.map(f=>f.status):o[0].status)})}function _e(n,t,e=i=>i,r={}){return it(...arguments)}function Ct(n,t,e=null,r=s=>s,i={}){return C(n,"construct",arguments.length>2?{argumentsList:t,newTarget:e}:{argumentsList:t},r,i)}function dt(n,t,e,r=s=>s,i={}){return C(n,"apply",{thisArgument:t,argumentsList:e},r,i)}function St(n,t,e=i=>i,r={}){return C(n,"setPrototypeOf",{proto:t},e,r)}function Rt(n,t=r=>r,e={}){return C(n,"preventExtensions",{},t,e)}function Jt(n,t,e,r={}){let i;r.signal||(i=new AbortController,r={...r,signal:i.signal},ht.setMaxListeners?.(0,i.signal));let s=D.getInstance(n,!0,r.namespace);return function o(u,f=null){f?.remove();let c={signal:s.addRegistration(t,o,r).signal};if(arguments.length){let l=e(u,c);if(arguments.length>1)return l}return i}}function C(n,t,e={},r=s=>s,i={}){n=k(n),P(r)&&([i,r]=[r,f=>f]);function s(f,a){return arguments.length>1?r(a):r((Reflect[t]||Object[t])(n,...Object.values(e)))}let o=new $(n,{operation:t,...e}),u=F.getInstance(n,!1,i.namespace);return u?u.emit(o,s):s(o)}function bt(n){return n===1/0||Array.isArray(n)}function k(n,t=!0){if((!n||!E(n))&&t)throw new Error(`Object must be of type object or array! "${J(n)}" given.`);return n instanceof $&&(n=n.value),n&&et(n)}function ve(n,t,e,r={}){return t===1/0?r.level&&!E(n)?e([]):rt(n,e,r):e(q(t,!1))}var Oe={...Nt,...Tt},h=Oe;var qt=(n,...t)=>{let e=t.pop();return n.constructor.name==="AsyncFunction"?j(n.call(...t),e):e(n.call(...t))},j=(n,t)=>n instanceof Promise?n.then(t):t(n),Dt=n=>typeof n=="object"&&n||typeof n=="function";function Gt(n){let t=typeof n[n.length-1]=="object"?n.pop():{},e=n.pop()||"";return t.functionParams=n,{source:e,params:t}}var Qt={};function Xt(...n){let t,e={runtimeParams:$e,compilerParams:Ee,parserParams:Pe};for(;t=n.shift();){let{runtimeParams:r={},compilerParams:{globalsNoObserve:i=[],globalsOnlyPathsExcept:s=[],...o}={},parserParams:u={}}=t;e={runtimeParams:{...e.runtimeParams,...r},compilerParams:{...e.compilerParams,globalsNoObserve:[...e.compilerParams.globalsNoObserve,...i],globalsOnlyPathsExcept:[...e.compilerParams.globalsOnlyPathsExcept,...s],...o},parserParams:{...e.parserParams,...u}},n.devMode}return e}var Pe={ecmaVersion:"latest",allowReturnOutsideFunction:!0,allowAwaitOutsideFunction:!1,allowSuperOutsideMethod:!1,preserveParens:!1,locations:!0},Ee={globalsNoObserve:["arguments","debugger"],globalsOnlyPathsExcept:[],originalSource:!0,locations:!0,compact:2},$e={apiVersion:3};var st=Object.create(null);var U=class extends EventTarget{managedAlways=new Set;managedOnce=new Set;constructor(){super(),Qt.setMaxListeners?.(0,this)}fire(t){return this.dispatchEvent(new Event(t,{cancelable:!0}))}on(...t){return this.addEventListener(...t),()=>this.removeEventListener(...t)}abort(t=!1){this.managedAlways.forEach(e=>e.abort?e.abort(t):e(t)),this.managedOnce.forEach(e=>e.abort?e.abort(t):e(t)),this.managedOnce.clear(),this.fire("abort")}manage(t){this.managedAlways.add(t)}once(t){this.managedOnce.add(t)}};var W=class extends U{subscribers=new Set;signals=new Map;constructor(t,e,r){super(),this.context=t,this.context?.once(()=>this.abort()),this.once(()=>this.watchMode(!1)),this.type=e,this.state=r}get name(){return[...this.context?.signals.keys()||[]].find(t=>this.context.signals.get(t)===this)}signal(t,e="prop"){let r=this.signals.get(t);return r||(r=new W(this,e,e==="object"?t:Dt(this.state)?h.get(this.state,t):void 0),this.signals.set(t,r),this.signals.size===1&&this.watchMode(),r.once(()=>{this.signals.delete(t),this.signals.size||this.watchMode(!1)})),r}subscribe(t){this.subscribers.add(t),t.once(()=>{this.subscribers.delete(t),this.subscribers.size||this.abort()})}watchMode(t=!0){this.mutationsWatch?.abort(),!(!t||!this.signals.size||!Dt(this.state))&&(this.mutationsWatch=h.observe(this.state,e=>{let r={map:new Map,add(s,o){for(let u of s)u.spec.beforeSchedule?.(o)!==!1&&(this.map.has(u.runtime)||this.map.set(u.runtime,new Set),this.map.get(u.runtime).add(u))}};for(let s of e){let o=this.signals.get(s.key);!o||(r.add(o.subscribers,s),o.refresh(s.value))}let i=r.map.size?[...r.map].sort((s,o)=>s.$serial>o.$serial?-1:1):r.map;for(let[s,o]of i)s.state!=="aborted"&&s.schedule(...o)},{recursions:"force-sync"}))}refresh(t){this.state=t;for(let[e,r]of this.signals)r.refresh(h.get(this.state??{},e));this.watchMode()}};var A=class extends W{symbols=new Map;constructor(t,e,r=void 0){super(t,e,r||Object.create(null))}};var S=class extends U{state;constructor(t,e,r,i,s,o){super(),t?.once(this),this.context=t,this.type=e,this.spec=r,this.scope=s,t?.scope!==s&&this.manage(s),this.serial=i,o&&(this.closure=o),t?.type==="iteration"?this.path=t.path.concat(this.spec.index):t?.type==="round"?this.path=t.path.concat(this.serial):this.path=(t?.path||[]).slice(0,-1).concat(this.serial),this.flowControl=new Map}get runtime(){return this.context.runtime}contains(t){return this===t.context||t.context&&this.contains(t.context)}order(t){if(!t)return this;let[e,r]=t.path.length<this.path.length?[t,this]:[this,t];return e.path.reduce((i,s,o)=>i&&s<=r.path[o],!0)&&e||r}beforeExecute(){this.state="running";let t=this.flowControl;return this.flowControl=new Map,t}execute(t=null){try{return this.runtime.thread.unshift(this),j(this.beforeExecute(),e=>qt(this.closure,this,this,r=>(this.spec.complete&&(r=this.spec.complete(r,this)),this.afterExecute(e),this.runtime.thread.shift(),t?t(r,this):r)))}catch(e){if(e.cause)throw e;let r=`${e.message||e}`;this.runtime.throw(r,[this.serial,this.context?.serial],globalThis[e.name])}}afterExecute(t){this.state="complete";let e=this.flowControl;this.handleDownstream(e.size,t.size),this.handleRightstream(e.size,t.size);for(let r of["break","continue","return"])e.has(r)&&!e.get(r).endpoint?this.hoistFlowControl(r,e.get(r).arg):t.has(r)&&!t.get(r).endpoint&&this.hoistFlowControl(r,t.get(r).arg,!0)}typed(t,e,r=void 0){let i=Array.isArray(e)?"array":e===null?"null":typeof e;if(i===t||t==="iterable"&&e?.[Symbol.iterator]||t==="desctructurable"&&!["undefined","null"].includes(i))return e;throw t==="iterable"?new Error("value is not iterable."):t==="desctructurable"?new Error((r?`Cannot access ${r}; `:"")+"object not desctructurable."):new Error(`value must be of type ${t}.`)}let(t,e,r,i={}){return this.var(t,e,r,{...i,kind:"let"})}const(t,e,r,i={}){return this.var(t,e,r,{...i,kind:"const"})}var(t,e,r,i={}){i={kind:"var",...i},r||(r=()=>{});let s=i.restOf?(...u)=>{try{return r(...u)}catch(f){throw new Error(`Cannot declare ${t}; ${f.message}`)}}:r,o=(u,f)=>{let a=i.kind==="var"?this.runtime.scope:f.scope;for(;i.kind==="var"&&!["module","function"].includes(a.type)&&!h.has(a.state,t)&&a.context;)a=a.context;let c=a.symbols.get(t);if(c&&(c.kind!==i.kind||i.kind==="let"&&c.serial!==e))throw new Error(`Identifier "${t}" has already been declared.`);c?.reader?.abort(),c={serial:e,kind:i.kind};let l=u;return i.restOf&&(i.type==="array"?l=[]:l={},c.reader=h.read(u,l,{except:i.restOf,spread:i.type==="array"}),f.once(c.reader)),a.symbols.set(t,c),h.set(a.state,t,l),l};return this.autorun(i.kind,{complete:o,...i},e,s)}update(t,e,r={}){let i=this.scope;for(;i&&!h.has(i.state,t);)i=i.context;if(!i)throw new ReferenceError(`${t} is not defined.`);let s=i.symbols.get(t);if(s?.kind==="const")throw new ReferenceError(`Assignment to constant variable "${t}".`);let o=h.get(i.state,t),u=r.restOf?(...f)=>{try{return e(...f)}catch(a){throw new Error(`Cannot update ${t}; ${a.message}`)}}:e;return qt(u,void 0,o,f=>{s?.reader?.abort();let a=f;return r.restOf&&(s=s||{},r.type==="array"?a=[]:a={},s.reader=h.read(f,a,{except:r.restOf,spread:r.type==="array"}),this.once(s.reader)),h.set(i.state,t,a),["postinc","postdec"].includes(r.kind)?o:a})}ref(t,...e){let r=0,i={};typeof e[0]=="number"?(r=e.shift(),i=e.shift()||{}):typeof e[0]=="object"&&(i=e.shift());let s=this.scope;for(;s&&!h.has(s.state,t);)s=s.context;if(!s){if(i.isTypeCheck)return;throw new Error(`${t} is not defined.`)}let o=s.symbols.get(t)?.kind,u=s.signal(t,o);return i.typed&&this.typed(i.typed,u.state,t),this.autobind(u,r,i)}obj(t,...e){let r=0,i={};return typeof e[0]=="number"?(r=e.shift(),i=e.shift()||{}):typeof e[0]=="object"&&(i=e.shift()),this.autobind(this.runtime.$objects.signal(t,"object"),r,i)}autobind(t,e,r){let i=this.runtime.$params.isQuantumFunction,s=t.type==="const",o=this===this.runtime,u=this.state==="aborted",f=this;return function a(c,l){if(i&&!s&&!o&&!u&&c.subscribe(f),!l||!c.state||typeof c.state!="object"){let m=c.state;return typeof c.state=="function"&&(m=h.proxy(c.state,{membrane:c})),m}let p;return h.proxy(c.state,{},m=>({...m,get(v,d,_=null){return p?m.get(v,d,_):(p=!0,a(c.signal(d),l-1))}}))}(t,e)}autorun(t,...e){let r=e.pop(),i=e.pop(),s=e.pop()||{},o=S,u=this.scope;if(t==="iteration"){let a=this.runtime.constructor;o=r.constructor.name==="AsyncFunction"?a.AutoAsyncIterator:a.AutoIterator}["block","iteration"].includes(t)&&(u=new A(u,t));let f=new o(this,t,s,i,u,r);if(!(t==="downstream"&&(this.downstream=f,this.flowControlApplied())))return f.execute()}function(t,e,r,i){t&&h.set(this.scope.state,i.name,i);let s=this;return Object.defineProperty(i,"toString",{value:function(o=!1){if(o&&e)return Function.prototype.toString.call(i);let u=s.runtime.extractSource(r);return u.startsWith("static ")?u.replace("static ",""):u}}),i}class(t,e,r){return t&&h.set(this.scope.state,e.name,e),r.forEach(({name:i,static:s,isQuantumFunction:o,serial:u})=>{this.function(!1,o,u,s?e[i]:e.prototype[i])}),e}async import(...t){return this.runtime.import(...t)}async export(...t){return this.runtime.export(...t)}continue(t){return this.applyFlowControl("continue",t)}break(t){return this.applyFlowControl("break",t)}return(t){return this.applyFlowControl("return",t)}applyFlowControl(t,e,r=!1){let i=this.flowControl.size;if(r?this.flowControl.delete(t):this.flowControl.set(t,{arg:e}),this.type==="round"&&(this.context.breakpoint=this),this.type==="round"&&["break","continue"].includes(t)&&e===this.context?.spec.label){r||(this.flowControl.get(t).endpoint=!0),this.state!=="running"&&this.handleRightstream(this.flowControl.size,i);return}this.state!=="running"&&(this.handleDownstream(this.flowControl.size,i),this.hoistFlowControl(...arguments))}hoistFlowControl(...t){return this.context?.applyFlowControl(...t)}flowControlApplied(t,e){return arguments.length?arguments.length===1?this.flowControl.has(t):this.flowControl.get(t)?.arg===e:this.flowControl.size||!1}handleDownstream(t,e){let r;this.type!=="block"||!(r=this.context?.downstream)||(t?r.abort():e&&(r.state="resuming",this.runtime.schedule(r)))}handleRightstream(t,e){if(this.type!=="round")return;let r=this,i=new Set;for(;r=r.nextRound;)t?r.abort():e&&r.state!=="inert"&&(r.state="resuming",i.add(r));i.size&&this.runtime.schedule(...i),!t&&e&&this.runtime.on("reflection",()=>{this.context.iterating||this.context.iterate()},{once:!0})}abort(t=!1){return t&&(this.context?.breakpoint===this&&delete this.context.breakpoint,this.flowControl.clear()),this.state=t?"inert":"aborted",super.abort(t)}};var B=class extends S{rounds=new Map;constructor(t,e,r,i,s,o){r.$closure=o,super(t,e,r,i,s),this.manage(()=>{delete this.breakpoint,this.rounds.clear()})}pseudorun(t){return this.runtime.iThread.unshift(this),j(t(),e=>(this.runtime.iThread.pop(),e))}createIterator(){return this.spec.kind==="for-in"?function*(){for(let t in this.iteratee)yield t}.call(this):this.spec.kind==="for-of"?function*(){for(let t of this.iteratee)yield t}.call(this):{next:()=>({done:!this.pseudorun(()=>this.spec.test(this))})}}closure(){["for-of","for-in"].includes(this.spec.kind)?([this.production,this.iteratee]=this.spec.parameters(this),this.iterator=this.createIterator(),this.iterator.original=!0,this.watchMode()):(this.spec.kind==="for"&&this.spec.init(this),this.iterator=this.createIterator()),this.iterate()}terminated(){return this.breakpoint&&!this.breakpoint.flowControlApplied("continue",this.spec.label)&&this.breakpoint.flowControlApplied()}advance(){this.spec.kind==="for"&&this.pseudorun(()=>this.spec.advance(this))}iterate(){this.iterating=!0;let t=()=>!this.terminated()&&!(this.cursor=this.iterator.next()).done,e=()=>{this.createRound(this.cursor.value).execute(),this.advance()};if(this.spec.kind==="do-while")do e();while(t());else for(;t();)e();this.iterating=!1}createRound(t){let e=this.rounds.size,r={index:e},i=["for-in","for-of"].includes(this.spec.kind)?{[this.production]:t}:{...this.scope.state},s=new A(this.scope,"round",i);this.scope.symbols.forEach((f,a)=>{s.symbols.set(a,f)});let o=new S(this,"round",r,this.serial,s,this.spec.$closure),u=this.spec.kind==="for-in"?t:e;return this.rounds.set(u,o),this.lastRound&&(this.lastRound.nextRound=o,o.prevRound=this.lastRound),this.lastRound=o,o}watchMode(){let t=(e,r)=>{let i=new Set,s=new Set;for(let o of e){if(Array.isArray(this.iteratee)&&o.key==="length")continue;let u=this.spec.kind==="for-in"?o.key:o.value,f=this.spec.kind==="for-in"?o.key:parseInt(o.key),a=this.rounds.get(f);if(a)h.set(a.scope.state,this.production,u),o.type==="delete"&&(this.rounds.set(f,void 0),a.prevRound&&(a.prevRound.nextRound=a.nextRound),a.nextRound&&(a.nextRound.prevRound=a.prevRound),i.add(a));else if(o.type!=="delete"&&!o.isUpdate){if(this.spec.kind==="for-of"&&this.iterator.original&&!r.done)continue;s.add(u)}}this.runtime.on("reflection",()=>{i.forEach(o=>o.abort(!0))},{once:!0}),s.size&&(this.iterator=function*(o){yield*o,yield*s}(this.iterator),r.done&&this.iterate())};this.once(h.observe(this.iteratee,e=>{j(this.cursor,r=>t(e,r))}))}};var ut=class extends B{async createIterator(){return this.spec.kind==="for-in"?function*(){for(let t in this.iteratee)yield t}.call(this):this.spec.kind==="for-of"?function*(){for(let t of this.iteratee)yield t}.call(this):{next:async()=>({done:!await this.pseudorun(()=>this.spec.test(this))})}}async closure(){["for-of","for-in"].includes(this.spec.kind)?([this.production,this.iteratee]=await this.spec.parameters(this),this.iterator=await this.createIterator(),this.iterator.original=!0,this.watchMode()):(this.spec.kind==="for"&&await this.spec.init(this),this.iterator=await this.createIterator()),await this.iterate()}async iterate(){let t;this.iterating=!0;let e=async()=>!this.terminated()&&(this.cursor=this.iterator.next())&&(t=await this.cursor)&&!t.done,r=async()=>{await this.createRound(t.value).execute(),await this.advance()};if(this.spec.kind==="do-while")do await r();while(await e());else for(;await e();)await r();this.iterating=!1}};var K=class{constructor(t){Object.defineProperty(this,"runtime",{value:t});let e={statechange:()=>{h.defineProperty(this,"value",{value:t.flowControl.get("return")?.arg,enumerable:!0,configurable:!0})}};for(let r in e)t.on(r,e[r]),e[r]();t.$params.sourceType==="module"&&Object.defineProperty(this,"exports",{value:t.exports})}dispose(){return this.runtime.abort(!0)}};var H=class extends S{locations=[];queue=new Set;thread=[];iThread=[];constructor(t,e,r,i,s){super(t,e,{},-1,i,s);let{$serial:o=0,...u}=r;this.$serial=o,this.$params=u,this.$objects=new A(void 0,"objects"),this.manage(this.$objects),this.exports=Object.create(null),this.$promises={imports:[],exports:[]},this.manage(()=>{h.deleteProperties(this.exports,Object.keys(this.exports)),this.$promises.imports.splice(0),this.$promises.exports.splice(0)})}extractSource(t,e=!1){let[[r,i,s],[o]]=this.locations[t],u=this.$params.originalSource.slice(r,o);return e?{expr:u,line:i,column:s}:u}throw(t,e,r=null,i=null){let s,o=i!==null?`[${i}]: ${t}`:t,u=e.map(a=>a!==-1&&this.extractSource(a,!0)).filter(a=>a);u.push({source:this.$params.originalSource}),s=new(r||Error)(o,{cause:u});let f=this.$params.sourceType==="module"&&this.$params.experimentalFeatures!==!1&&this.$params.exportNamespace||this.$params.fileName;throw f&&(s.fileName=f),i&&(s.code=i),s}get runtime(){return this}get nowRunning(){return this.thread[0]}schedule(...t){let e=this.queue.size;for(let r of t)this.queue.add(r);if(!e)return this.flowControlDirty=!1,function r(i,s){let o;for(let u of this.queue){if(s&&s.order(u)!==s||["aborted","running"].includes(u.state)||this.iThread[0]?.contains(u)){this.queue.delete(u);continue}o=o?o.order(u):u,s||(s=o)}return o?(o.abort(),o.execute(u=>(this.queue.delete(o),r.call(this,u,o)))):(this.fire("reflection"),this.flowControlApplied()&&this.fire("statechange"),i)}.call(this,void 0,this.nowRunning)}execute(t=null){return super.execute(e=>{let r=this.$params.isQuantumFunction?new K(this):e;return t?t(r,this):r})}spawn(t,e,r){let i=this.nowRunning||this,s={...this.$params,$serial:this.$serial+1,isQuantumFunction:t},o=new A(i.scope,"function",{this:e});return new this.constructor(i,"function",s,o,r).execute()}async import(...t){let e=t.pop(),r=typeof e=="string"?{source:e}:e,i=o=>{if(r.forExport||r.isDynamic)return o;this.assignModules(t,this.scope.state,o,e.serial)};if(this.$params.experimentalFeatures!==!1&&st[r.source])return i(st[r.source]);let s=(async()=>{let o=this.$params.sourceType==="module"&&this.$params.experimentalFeatures!==!1&&this.$params.exportNamespace||this.$params.fileName;try{return i(await import(r.source))}catch(u){throw u.code==="ERR_MODULE_NOT_FOUND"&&this.throw(`Cannot find package "${r.source}"${o?` imported at "${o}"`:""}.`,[r.serial],null,u.code),u}})();return r.isDynamic||this.$promises[r.forExport?"exports":"imports"].push(s),s}async export(...t){let e=Array.isArray(t[t.length-1])?null:t.pop(),r=e?await this.import({...e,forExport:!0}):this.scope.state;this.assignModules(t,this.exports,r,e?.serial)}assignModules(t,e,r,i=null){let s=[];for(let[o,u,f]of t){if(o==="*"&&f){h.set(e,f,r);continue}h.has(r,o)||this.throw(`The requested module does not provide an export named "${o}".`,[u,i]),h.set(e,f||o,h.get(r,o)),s.push([o,u,f])}!s.length||this.once(h.observe(r,o=>{for(let[u,,f]of s)for(let a of o)u==="*"?h.set(e,a.key,a.value):a.key===u&&h.set(e,f||u,a.value)}))}afterExecute(...t){return this.$params.sourceType==="module"&&this.$params.experimentalFeatures!==!1&&this.$params.exportNamespace&&(st[this.$params.exportNamespace]=this.exports,this.once(()=>{delete st[this.$params.exportNamespace]})),super.afterExecute(...t)}};N(H,"AutoAsyncIterator",ut),N(H,"AutoIterator",B);function wt(n,t,e,r){let{env:i,functionParams:s=[],exportNamespace:o,fileName:u}=r,{parserParams:f,compilerParams:a,runtimeParams:c}=Xt(r);if(n==="module")f.sourceType=n,f.allowAwaitOutsideFunction=!0;else if(["function","async-function"].includes(n)){let p="  "+e.split(`
`).join(`
  `);e=`return ${n==="async-function"?"async ":""}function**(${s.join(", ")}) {
${p}
}`,a.startStatic=!0}else if(!["script","async-script"].includes(n))throw new Error(`Unrecognized sourceType specified: "${n}".`);a.sourceType=n;let l=t(e,{parserParams:f,compilerParams:a});if(l instanceof Promise&&!["async-function","async-script","module"].includes(n))throw new Error("Parse-compile can only return a Promise for sourceTypes: async-function, async-script, module.");return c.sourceType=n,c.exportNamespace=o,c.fileName=u,j(l,p=>{let m=["async-script","module"].includes(n),d=((g,b)=>c.compileFunction?c.compileFunction(b,g):new(m?async function(){}.constructor:Function)(...g.concat(b)))([p.identifier+""],p+""),_=["function","async-function"].includes(n),y=g=>{let b=d;g&&(b=b.bind(g));let O="global",w=new A(void 0,O,globalThis);return(n.endsWith("script")||i)&&(O="env",w=new A(w,O,i)),n==="module"&&(O="module",w=new A(w,O)),typeof g<"u"&&(w=new A(w,"this",{this:g})),new H(void 0,O,{...c,originalSource:p.originalSource,isQuantumFunction:!_},w,b)};return _?y().execute():{createRuntime:y,compiledSource:p}})}var X=class{constructor(...t){let e=this.constructor,r=typeof t[t.length-1]=="object"?t.pop():{},i=t.pop()||"";this.$program=wt(e.sourceType,e.parseCompileCallback,i,r)}execute(){return j(this.$program,({createRuntime:t})=>t().execute())}bind(t){return j(this.$program,({createRuntime:e})=>e(t))}toString(t=!1){return j(this.$program,({compiledSource:e})=>t?e+"":e.originalSource)}};function Ae(...n){let{source:t,params:e}=Gt(n),r=wt("async-function",zt,t,e);if(!(r instanceof Promise))return r;let i=async function(...s){return(await r).call(this,...s)};return Object.defineProperty(i,"toString",{value:async function(...s){return(await r).toString(...s)}}),i}var at=class extends X{};N(at,"sourceType","async-script"),N(at,"parseCompileCallback",zt);var ft=class extends X{};N(ft,"sourceType","module"),N(ft,"parseCompileCallback",zt);function zt(...n){let t=typeof n[n.length-1]=="object"?n.pop():{},e=n.pop()||"";if(globalThis.webqit?.$qCompiler){let{parse:r,compile:i}=globalThis.webqit.$qCompiler,s=r(e,t.parserParams);return i(s,t.compilerParams)}if(globalThis.webqit=globalThis.webqit||{},!globalThis.webqit.$qCompilerWorker){let s=`
        const compilerUrls = [ '${(document.querySelector('meta[name="$q-compiler-url"]')?.content.split(",")||[]).concat("https://unpkg.com/@webqit/quantum-js/dist/compiler.js").join("','")}' ];
        ( function importScript() {
            try { importScripts( compilerUrls.shift().trim() ) } catch( e ) { if ( compilerUrls.length ) { importScript(); } }
        } )();
        const { parse, compile } = globalThis.webqit.$qCompiler;
        globalThis.onmessage = e => {
            const { source, params } = e.data;
            const ast = parse( source, params.parserParams );
            const compilation = compile( ast, params.compilerParams );
            e.ports[ 0 ]?.postMessage( {
                identifier: compilation.identifier,
                originalSource: compilation.originalSource,
                compiledSource: compilation + '',
                topLevelAwait: compilation.topLevelAwait
            } );
        };`;globalThis.webqit.$qCompilerWorker=new Worker(`data:text/javascript;base64,${btoa(s)}`)}return new Promise(r=>{let i=new MessageChannel;webqit.$qCompilerWorker.postMessage({source:e,params:t},[i.port2]),i.port1.onmessage=s=>{let{compiledSource:o,...u}=s.data;Object.defineProperty(u,"toString",{value:()=>o}),r(u)}})}globalThis.webqit||(self.webqit={});Object.assign(globalThis.webqit,Mt);})();
//# sourceMappingURL=main.async.js.map
