(()=>{function v(...f){let t={runtimeParams:A,compilerParams:I,parserParams:E},e;for(;e=f.shift();){let{runtimeParams:r={},compilerParams:{globalsNoObserve:i=[],globalsOnlyPathsExcept:n=[],...s}={},parserParams:o={}}=e;t={runtimeParams:{...t.runtimeParams,...r},compilerParams:{...t.compilerParams,globalsNoObserve:[...t.compilerParams.globalsNoObserve,...i],globalsOnlyPathsExcept:[...t.compilerParams.globalsOnlyPathsExcept,...n],...s},parserParams:{...t.parserParams,...o}},f.devMode}return t}var E={ecmaVersion:"2020",allowReturnOutsideFunction:!0,allowAwaitOutsideFunction:!0,allowSuperOutsideMethod:!0,preserveParens:!1,locations:!1},I={globalsNoObserve:["globalThis","arguments","console","debugger"],globalsOnlyPathsExcept:[],originalSource:!0,locations:!0,compact:2},A={apiVersion:1};function O(f,t=!1){let e=f.split(/\n/g);if(e.length>1){for(;!e[0].trim().length;)e.shift();let r=e[t?1:0].split(/[^\s]/)[0].length;if(r)return e.map((i,n)=>{let s=i.substring(0,r);return s.trim().length?s.trim()==="}"&&n===e.length-1?"}":i:i.substring(r)}).join(`
`)}return f}var g=(f,t)=>f instanceof Promise?f.then(t):t(f);var j=new Map;function x(f,t,e=void 0){let r=j.get(f);if(arguments.length>2){r||(r=new Map,j.set(f,r)),r.set(t,e);return}return r&&r.get(t)}var S=class{constructor(t,e,r,i={},n=null,s=null){this.ownerContract=t,this.graph=e,this.callee=r,this.params=t?i:{...i,isSubscriptFunction:!0},this.exits=s||new Map,this.$thread=n||{entries:new Map,sequence:[],ownerContract:this},this.subContracts=new Map,this.observers=[],this.contract=function(o,l,u=null,h=null){if(!this.graph.subContracts[o])throw new Error(`[${this.graph.type}:${this.graph.lineage}]: Graph not found for child contract ${o}.`);let a=this.graph.subContracts[o],c={...this.params,isIterationContract:arguments.length===3,iterationId:arguments.length===3&&l,isFunctionContract:arguments.length===4,functionType:arguments.length===4&&l,isSubscriptFunction:arguments.length===4&&u,functionScope:this.params.isFunctionContract&&this.graph.lineage||this.params.functionScope};if(c.isIterationContract){let b=u,m=new S(this,a,b,c,this.$thread,this.exits),w=this.subContracts.get(o);return w||(w=new Map,this.subContracts.set(o,w)),w.has(c.iterationId)&&w.get(c.iterationId).dispose(),w.set(c.iterationId,m),m.call()}let p,y,d;if(this.subContracts.has(o)&&this.subContracts.get(o).dispose(),c.isFunctionContract){p=h;let b=()=>new S(this,a,p,c);if(c.functionType!=="FunctionDeclaration")d=this.createFunction(b);else{let m=b();c.apiVersion>1?(d=function(...w){let C=m.call(this,...w);return C=g(C,$=>[C,m.thread.bind(m),m]),m=b(),C},d.target=m):d=m}}else p=l,y=new S(this,a,p,c,this.$thread,this.exits),this.subContracts.set(o,y),d=y.call();return d}.bind(this),this.contract.memo=Object.create(null),this.ownerContract&&!["FunctionDeclaration","FunctionExpression"].includes(this.graph.type)&&(this.contract.args=this.ownerContract.contract.args),this.contract.exiting=function(o,l){if(!arguments.length)return this.exits.size;let u=this.exits.get(o)===l;return u&&this.exits.clear(),u}.bind(this),this.contract.exit=function(o,l){this.exits.set(o,l)}.bind(this),this.contract.functions=new Map,this.contract.functions.declaration=(o,l)=>{this.contract.functions.set(o,l),this.applyReflection(o,typeof l=="function"?l.target:l)}}fire(t,e,r){if(!this.ownerContract)return;let i=this.ownerContract.fire(t,e,r);return this.observers.forEach(n=>{n.contractUrl===t&&n.callback(e,r)}),i}observe(t,e){!this.params.isFunctionContract||this.observers.push({contractUrl:t,callback:e})}call(t,...e){if(this.disposed)throw new Error(`[${this.graph.type}:${this.graph.lineage}]: Instance not runable after having been disposed.`);this.ownerContract||(this.contract.args=e,Object.defineProperty(this.contract.args,Symbol.toStringTag,{value:"Arguments"}));let r=this.callee.call(t,this.contract,...e);if(this.graph.$sideEffects)for(let i in this.graph.effects)for(let n of this.graph.effects[i].refs)this.buildThread([],n,[],0,!0);return g(r,()=>{if(!this.ownerContract||this.params.isFunctionContract){let i=this.exits.get("return");if(this.exits.clear(),i!==void 0)return i}return r})}iterate(t=[]){if(this.disposed)return!1;if(!["ForOfStatement","ForInStatement"].includes(this.graph.type)||this.subContracts.size!==1)throw new Error(`Contract ${this.graph.lineage} is not an iterator.`);let[[,e]]=this.subContracts,r;if(!t.length||t.includes("length")&&this.graph.type==="ForOfStatement")for(let[,i]of e)r=g(r,()=>i.call());else for(let i of t){let n=e.get(i)||e.get(parseInt(i));!n||(r=g(r,()=>n.call()))}return r}thread(...t){if(this.disposed)return!1;this.$thread.active=!0;for(let e in this.graph.effects)for(let r of this.graph.effects[e].refs)for(let i of t){let[n,s,o]=this.matchRefs(i,r);!n||this.buildThread(i,r,o,s)}return this.runThread()}runThread(){let t=(n,s)=>{if(["ForOfStatement","ForInStatement"].includes(n.graph.type)&&s.every(o=>o.executionPlan.isIterationContractTarget)){let o=s.map(l=>l.executionPlan.iterationTarget);return this.fire(n.graph.lineage,"iterating",s),n.iterate(o)}return this.fire(n.graph.lineage,"executing",s),n.call()},e,r,i;for(;(r=this.$thread.sequence.shift())&&(i=[...this.$thread.entries.get(r)])&&this.$thread.entries.delete(r);)e=g(e,()=>{if(r.disposed||!r.filterRefs(i).length)return;this.$thread.current=r;let n=t(r,i);return g(n,()=>{for(let s of i)[].concat(s.executionPlan.assigneeRef||s.executionPlan.assigneeRefs||[]).forEach(o=>{r.buildThread([],o,[],0)})}),n});return g(e,()=>{let n=this.exits.get("return");return this.exits.clear(),this.$thread.current=null,this.$thread.active=!1,n})}buildThread(t,e,r,i=0,n=!1){let s=i>0;if(this.ownerContract){if(!this.compute(r)||e.condition!==void 0&&!this.assert(e.condition))return}else s||(s=r.length||e.condition!==void 0);let o=n?e.$subscriptions:e.subscriptions;Object.keys(o).forEach(l=>{let[u,h]=l.split(":"),a=p=>{!p||p.selectRefs(h,o[l],s?t:null)},c=this.locate(u);Array.isArray(c)?c.forEach(a):a(c)})}selectRefs(t,e,r=null){let i=this.$thread,n=this.graph.signals[t],s=(l,u)=>l.graph.lineage.localeCompare(u.graph.lineage,void 0,{numeric:!0}),o=(l,u=[],h={})=>{if(!i.active||i.current&&s(this,i.current)<0)return;let a=i.entries.get(this);if(a||(a=new Set,i.entries.set(this,a),i.sequence.push(this),i.sequence.sort(s)),a.add({...l,computes:u,executionPlan:h}),!h.assigneeRef&&["VariableDeclaration","AssignmentExpression"].includes(this.graph.type)){h.assigneeRefs=[];for(let c in this.graph.effects)h.assigneeRefs.push(...this.graph.effects[c].refs)}};for(let l of e){let u=n.refs[l];if(!r){o(u);continue}let[h,a,c]=this.matchRefs(r,u);if(!h)continue;if(a<=0){o(u,c);continue}let p=r.slice(-a),y="assignee"in n?this.graph.effects[n.assignee]:null;if(y){y.refs.forEach(d=>{if(d.depth.length){let[b,m,w]=this.matchRefs(p,d.depth),C=c.concat(w);if(b&&m>0){let $=d.path.concat(p.slice(-m));this.buildThread($,d,C,m)}else b&&o(u,C,{assigneeRef:d})}else{let b=d.path.concat(p);this.buildThread(b,d,c,a)}});continue}if(a===1&&this.graph.type==="ForOfStatement"){o(u,c,{isIterationContractTarget:!0,iterationTarget:p[0]});continue}if(a===1&&this.graph.type==="ForInStatement"){o(u,c,{isIterationContractTarget:!0,iterationTarget:p[0]});continue}}}filterRefs(t){return t.filter(e=>{if(!!this.compute(e.computes)&&!(e.condition!==void 0&&!this.assert(e.condition)))return!0})}matchRefs(t,e){let r,i,n,s;Array.isArray(t)?(r=t,i=t.dotSafe?t.join("."):void 0):(r=t.path,i=t.$path),Array.isArray(e)?(n=e,s=e.dotSafe?e.join("."):void 0):(n=e.path,s=e.$path);let o=r.length-n.length;if(o>0&&([r,n,i,s]=[n,r,s,i]),i&&s)return[`${s}.`.startsWith(`${i}.`),o,[]];let l=[],u=a=>typeof a=="object"?a.name:a,h=(a,c)=>{if(!a||!c)return!1;let p=typeof a=="object"&&"memoId"in a,y=typeof c=="object"&&"memoId"in c;return p||y?(l.push(d=>(p?d[a.memoId]:u(a))===(y?d[c.memoId]:u(c))),!0):u(a)===u(c)};return[r.reduce((a,c,p)=>a&&h(c,n[p]),!0),o,l]}locate(t){let e=this.graph.lineage+"/",r=t+"/";if(r===e)return this;if(r.startsWith(e)){let i=t.slice(e.length).split("/"),n=this.subContracts.get(parseInt(i.shift()));if(i.length){if(n instanceof Map)return Array.from(n).reduce((s,[o,l])=>s.concat(l.locate(t)),[]);if(n)return n.locate(t)}return n}if(this.ownerContract)return this.ownerContract.locate(t)}compute(t){return!t.some(e=>e(this.contract.memo)===!1)}assert(t){if(typeof t=="string"&&t.includes(":")){let[i,n]=t.split(":");return this.locate(i).assert(n)}let e=this.graph.conditions[t],r=this.contract.memo;return typeof e.parent<"u"&&!this.assert(e.parent)?!1:typeof e.switch<"u"?e.cases.some(i=>r[i]===r[e.switch]):typeof e.whenNot<"u"?!r[e.whenNot]:typeof e.when<"u"?r[e.when]:!0}dispose(){this.params.isFunctionContract||(this.subContracts.forEach((t,e)=>{t instanceof Map?(t.forEach(r=>r.dispose()),t.clear()):t.dispose()}),this.subContracts.clear(),delete this.ownerContract,delete this.callee,delete this.params,delete this.contract.memo,this.disposed=!0)}createFunction(t,e=void 0){let r=t(),i=function(s,...o){let l=s.call(this===void 0?e:this,...o);return s.params.isSubscriptFunction&&s.params.apiVersion>1&&(l=g(l,u=>[u,s.thread.bind(s),s]),r=t(r)),l},n=r instanceof Promise||r.callee instanceof async function(){}.constructor?async function(){return g(r,s=>i.call(this,s,...arguments))}:function(){return i.call(this,r,...arguments)};return g(r,s=>{this.applyReflection(n,s)}),x(n,"properties",g(r,s=>{let o={type:s.params.functionType||"Program",apiVersion:s.params.apiVersion||1,isSubscriptFunction:s.params.isSubscriptFunction,sideEffects:s.graph.sideEffects||!1};if(s.params.isSubscriptFunction){o.dependencies=[];for(let[l,u]of Object.entries(s.graph.effects))o.dependencies.push(...u.refs.map(h=>h.path.map(a=>"name"in a?a.name:1/0)))}return o})),n}applyReflection(t,e){Object.defineProperty(e.callee,"length",{configurable:!0,value:e.callee.length-1});let r=e.callee.toString();Object.defineProperty(e.callee,"toString",{configurable:!0,value:(n=!1)=>!n&&e.graph.originalSource?e.graph.originalSource:r});let i={name:e.callee.name,length:e.callee.length,toString:e.callee.toString};e.params.isSubscriptFunction&&(e.params.apiVersion>1||(i={...i,thread:e.thread.bind(e),dispose:e.dispose.bind(e),runtime:e})),Object.keys(i).forEach(n=>{Object.defineProperty(t,n,{configurable:!0,value:i[n]})})}};var F=class extends S{static create(t,e=[],r={}){let n=r.async||t.graph.hoistedAwaitKeyword?Object.getPrototypeOf(async function(){}).constructor:Function,s=r.compileFunction?r.compileFunction(t.source,[t.identifier+""].concat(e)):new n(t.identifier+"",...e,t.source);return new this(null,t.graph,s,r)}static createFunction(t,e,r=[],i={},n,s=null){i={...i,functionType:"Constructor"},e instanceof Promise&&(i={...i,async:!0});let o=h=>h?new this(null,h.graph,h.callee,i):g(e,a=>l(this.create(a,r,i))),l=h=>{if(h.graph.originalSource&&!h.graph.originalSourceModified){let a=`${i.async||h.graph.hoistedAwaitKeyword?"async ":""}function ${t||"anonymous"}`,c=h.graph.originalSource.split(/\n/g).map(p=>`    ${p}`).join(`
`);h.graph.originalSource=`${a}(${r.join(", ")}) {
${c}
}`,h.graph.originalSourceModified=!0}return t&&Object.defineProperty(h.callee,"name",{configurable:!0,value:t}),h},u=this.prototype.createFunction(o,n);return x(u,"locations",g(e,h=>({locations:h.locations}))),u}};function P(...f){if(typeof window!="object")throw new Error("No window in context.");let t=v(typeof f[f.length-1]=="object"?f.pop():{}),e=O(f.pop()||""),r=f,i=n=>F.createFunction(void 0,n,r,t.runtimeParams,this,e);if(window.webqit?.SubscriptCompiler&&!t.runtimeParams.async){let{parse:n,compile:s}=window.webqit.SubscriptCompiler,o=n(e,t.parserParams);return i(s(o,t.compilerParams))}if(!window.webqit?.SubscriptCompilerWorker){let o=`
        importScripts( '${document.querySelector('meta[name="subscript-compiler-url"]')?.content||"https://unpkg.com/@webqit/subscript/dist/compiler.js"}' );
        const { parse, compile } = self.webqit.SubscriptCompiler;
        self.onmessage = e => {
            const { source, params } = e.data;
            const ast = parse( source, params.parserParams );
            const compilation = compile( ast, params.compilerParams );
            compilation.identifier = compilation.identifier.toString();
            e.ports[ 0 ]?.postMessage( compilation );
        };`;window.webqit=window.webqit||{},window.webqit.SubscriptCompilerWorker=new Worker(`data:text/javascript;base64,${btoa(o)}`)}return i(new Promise(n=>{let s=new MessageChannel;webqit.SubscriptCompilerWorker.postMessage({source:e,params:t},[s.port2]),s.port1.onmessage=o=>n(o.data)}))}Object.defineProperty(P,"inspect",{value:x});self.webqit||(self.webqit={});self.webqit.SubscriptFunction=P;})();
//# sourceMappingURL=lite.js.map
