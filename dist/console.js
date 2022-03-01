(()=>{"use strict";const t=t=>class extends t{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){[].concat(this.css).forEach((t=>{if(t.includes("{")&&t.includes(":")&&t.includes(";"))this.shadowRoot.appendChild(document.createElement("style")).textContent=t;else{let e=this.shadowRoot.appendChild(document.createElement("link"));e.setAttribute("rel","stylesheet"),e.setAttribute("href",t)}}))}get css(){return[]}},e=e=>class extends(t(e||HTMLElement)){static get observedAttributes(){return["name","editable","placeholder"]}connectedCallback(){this._lang="javascript",this._editable=this.getAttribute("editable"),this._styledBlock=this.getAttribute("styled-block")||"pre",this._div=document.createElement("div"),this._preBlock=this._div.appendChild(document.createElement("pre")),this._codeBlock=this._preBlock.appendChild(document.createElement("code")),this._div.classList.add("line-numbers"),this._lang&&(this._preBlock.classList.add("language-"+this._lang),this._codeBlock.classList.add("language-"+this._lang)),this._contentSlot=document.createElement("slot"),this._contentSlot.setAttribute("aria-hidden","true"),this._contentSlot.setAttribute("hidden","true"),this._initialSlotEvent=!1,this._contentSlot.addEventListener("slotchange",(()=>{let t=this._contentSlot.assignedNodes().reduce(((t,e)=>t+(e.outerHTML||e.nodeValue||"")),"");this._initialSlotEvent||(t=function(t){let e=t.split(/\n/g);if(e.length>1){let t=e[1].split(/[^\s]/)[0].length;if(t)return e.map(((n,i)=>{if(!i)return n;let s=n.substring(0,t);return s.trim().length?"}"===s.trim()&&i===e.length-1?"}":n:n.substring(t)})).join("\n")}return t}(t.trimStart()),this._initialSlotEvent=!0),this._textarea&&(this._textarea.value=t),this.source=(t=>t.replace(new RegExp("&","g"),"&amp;").replace(new RegExp("<","g"),"&lt;"))(t)})),"true"===this._editable&&this._addEditor(),this.shadowRoot.append(this._contentSlot,this._textarea||"",this._div),super.connectedCallback()}get source(){return this._codeBlock.textContent}set source(t){t.endsWith("\n")&&(t+=" "),this._codeBlock.innerHTML="",this._codeBlock.innerHTML=t,this._highlightCodeBlock(),this._syncScrolling()}get name(){return this._name}set name(t){return this.setAttribute("name",t)}get placeholder(){return this._placeholder}set placeholder(t){return this.setAttribute("placeholder",t)}get editable(){return this._editable}set editable(t){return this.setAttribute("editable",!0===t?"true":!1===t?"false":t)}_addEditor(){this._placeholder=this.getAttribute("placeholder"),this._name=this.getAttribute("name"),this._textarea=this._div.appendChild(document.createElement("textarea")),this._textarea.placeholder=this._placeholder||this._lang,this._textarea.spellcheck=!1,this._textarea.name=this._name||"",this._textarea.value=this._codeBlock.textContent,this._preBlock.setAttribute("aria-hidden","true"),this._scrollBlock="pre"===this.getAttribute("scroll-block")?this._preBlock:this._codeBlock,this._textarea.addEventListener("input",(t=>{this.source=t.target.value})),this._textarea.addEventListener("input",(()=>this._syncScrolling())),this._textarea.addEventListener("keydown",(t=>this._handleTabKeyEvent(t)))}_handleTabKeyEvent(t){if(!this._textarea)return;if("Tab"!==t.key)return;t.preventDefault();let e=this._textarea.value,n=this._textarea.selectionStart,i=this._textarea.selectionEnd;if(n===i){let t=e.slice(0,n),s=e.slice(i,e.length),r=i+1;this._textarea.value=t+"\t"+s,this._textarea.selectionStart=r,this._textarea.selectionEnd=r}else{let s=e.split("\n"),r=0,a=0,o=0;for(let e=0;e<s.length;e++)r+=s[e].length,n<r&&i>r-s[e].length&&(t.shiftKey?"\t"===s[e][0]&&(s[e]=s[e].slice(1),0===a&&o--,a--):(s[e]="\t"+s[e],0===a&&o++,a++));this._textarea.value=s.join("\n"),this._textarea.selectionStart=n+o,this._textarea.selectionEnd=i+a}this.source=this._textarea.value}_syncScrolling(){this._scrollBlock&&(this._scrollBlock.scrollTop=this._textarea.scrollTop,this._scrollBlock.scrollLeft=this._textarea.scrollLeft)}_highlightCodeBlock(){Prism.highlightElement(this._codeBlock)}disconnectedCallback(){Array.from(this.shadowRoot.childNodes).forEach((t=>t.remove()))}attributeChangedCallback(t,e,n){if(this.childNodes.length)switch(t){case"name":this._name=n,this._textarea.name=n;break;case"placeholder":this._placeholder=n,this._textarea.placeholder=n;break;case"editable":this._editable=n,this._textarea?this._textarea.disabled="false"===n:"true"===n&&this._addEditor(),"true"===n&&this._textarea.focus()}}get css(){return["https://unpkg.com/@webqit/subscript/src/console/assets/prism.css","https://unpkg.com/@webqit/subscript/src/console/assets/vs-code-dark.css",`\n            * {\n                -webkit-box-sizing: border-box;\n                -moz-box-sizing: border-box;\n                box-sizing: border-box;\n            }\n            :host {\n                /* Allow other elems to be inside */\n                position: relative;\n                top: 0;\n                left: 0;\n                display: block;\n            \n                /* Normal inline styles */\n            \n                font-size: 0.8rem;\n                font-family: monospace;\n                line-height: 1.2rem;\n                tab-size: 2;\n                caret-color: darkgrey;\n                white-space: pre;\n                overflow: hidden;\n            }\n            \n            textarea, ${this._styledBlock} {\n                /* Both elements need the same text and space styling so they are directly on top of each other */\n                margin: 0px !important;\n                padding-top: var(--vertical-padding, 1.5rem) !important;\n                padding-bottom: var(--vertical-padding, 1.5rem) !important;\n                padding-left: var(--horizontal-padding, 1rem) !important;\n                padding-right: var(--horizontal-padding, 1rem) !important;\n                border: 0 !important;\n                width: 100% !important;\n                height: 100% !important;\n            }\n            ${"code"===this._styledBlock?"pre":"code"} {\n                margin: 0px !important;\n                border: 0px !important;\n                padding: 0px !important;\n                overflow: auto !important;\n                width: 100% !important;\n                height: 100% !important;\n            }\n            .line-numbers :is(textarea, pre[class*=language-]) {\n                padding-left:3.8rem !important;\n            }\n            textarea, pre, pre * {\n                /* Also add text styles to highlighing tokens */\n                font-size: inherit !important;\n                font-family: inherit !important;\n                line-height: inherit !important;\n                tab-size: inherit !important;\n            }\n            \n            \n            textarea, pre {\n                /* In the same place */\n                position: absolute;\n                top: 0;\n                left: 0;\n            }\n            textarea[disabled] {\n                pointer-events: none !important;\n            }\n            \n            \n            /* Move the textarea in front of the result */\n            \n            textarea {\n                z-index: 1;\n            }\n            pre {\n                z-index: 0;\n            }\n            \n            \n            /* Make textarea almost completely transparent */\n            \n            textarea {\n                color: transparent;\n                background: transparent;\n                caret-color: inherit!important; /* Or choose your favourite color */\n            }\n            \n            /* Can be scrolled */\n            textarea, pre {\n                overflow: auto !important;\n            \n                white-space: inherit !important;\n                word-spacing: normal !important;\n                word-break: normal !important;\n                word-wrap: normal !important;\n            }\n            \n            /* No resize on textarea; stop outline */\n            textarea {\n                resize: none;\n                outline: none !important;\n            }\n            .line-numbers-rows {\n                border: none !important;\n                color: dimgray !important;\n            }\n            `]}},n=t=>class extends(t||class{}){setStateCallback(t,e,n,i=100,s){this._timeouts||(this._timeouts={}),t in this._timeouts||(this._timeouts[t]=[]),n?(this._timeouts[t].length||s(),i?this._timeouts[t].unshift(setTimeout((()=>this.setState(t,e,!1)),i)):this._timeouts[t].unshift(null),this._related&&this._related.setState(t,e,!0,i)):(this._timeouts[t].shift(),this._timeouts[t].length||(s(),this._related&&this._related.setState(t,e,!1)))}};class i extends(n()){bind(t){Object.assign(this,t),this.fullPaths=[],this.$fullPaths=[],this.ownerProduction.assignee&&this.ownerProduction.assignee.refs.forEach((t=>{t.depth&&this.fullPaths.push([...this.path,...t.depth])})),this.fullPaths.length||(this.fullPaths=[this.path]),this.fullPaths.forEach(((t,e)=>{this.$fullPaths.push(t.map((t=>"memoId"in t?"[[computed]]":t.name)).join(".")),t.forEach((t=>{t.anchor.classList.add("ref-identifier"),t.anchor.classList.add(this.subscriptions?"affected":"cause");let n=t.anchor.getAttribute("title"),i="> "+this.$fullPaths[e]+(this.subscriptions?" (Creates a signal)":" (Receives a signal)");t.anchor.setAttribute("title",n?n+"\n"+i:i)})),this._on(e,"mouseenter",(()=>{this._setState(e,"path","hover",!0,0)}))._on(e,"mouseleave",(()=>{this._setState(e,"path","hover",!1)})),this.subscriptions&&this._on(e,"click",(()=>{this.ownerProduction.ownerEffect.signal(t)}))}))}_setState(t,e,n,i,s=100){this.setStateCallback(t+"|"+e,n,i,s,(()=>{i?this.fullPaths[t].forEach((t=>t.anchor.classList.add(`${e}-${n}`))):this.fullPaths[t].forEach((t=>t.anchor.classList.remove(`${e}-${n}`)))}))}setState(t,e,n,i=100){let[s,r]=t.split("|");if(void 0!==r)return this._setState(s,r,e,n,i);this.fullPaths.forEach(((s,r)=>{this._setState(r,t,e,n,i)}))}_on(t,e,n){return this.fullPaths[t].forEach((t=>t.anchor.addEventListener(e,n.bind(this)))),this}on(t,e){this.fullPaths.forEach(((n,i)=>{this._on(i,t,e)}))}}class s extends(n(HTMLElement)){bind(t){if(Object.assign(this,t),!this.graph)return;this.childEffects&&this.childEffects.forEach((t=>{t.replaceWith(...t.childNodes)})),this.childEffects=new Map,this._textNodes=this.getTextNodes();for(let t in this.graph.childEffects){let e=this.graph.childEffects[t],n=this.createChildEffect({parentEffect:this,graph:e});this.childEffects.set(e.id,n)}if(this.affecteds=new Map,this.causes=new Map,this.refAnchors)for(let t in this.refAnchors){let e=this.refAnchors[t];e.replaceWith(...e.childNodes)}this.refAnchors={},this._textNodes=this.getTextNodes();const e=t=>{for(let e in this.graph[t]){let n=this.createProduction({ownerEffect:this,...this.graph[t][e]});this[t].set(e,n)}};e("affecteds"),e("causes"),this.on("mouseenter",(()=>{this.setState("block","hover",!0,0)})).on("mouseleave",(()=>{this.setState("block","hover",!1)})),this.observe(((t,e)=>{this.setState("block","runtime-active",!0,100),e.forEach((t=>{let e=this.causes.get(t.productionId+"");e&&e.refs.get(t.id).setState("path","runtime-active",!0,100)}))}))}get program(){return this.parentEffect?this.parentEffect.program:this.runtime}signal(...t){let e=this.program.locate(this.graph.lineage);if(e)return e.signal(...t)}observe(t){return this.program.observe(this.graph.lineage,t)}createChildEffect(t){let e=document.createElement("subscript-effect");return this.insertNode(e,t.graph.loc,"effect"),e.bind(t),e}createProduction(t){let e={...t,refs:new Map};"assignee"in t&&(e.assignee=this.affecteds.get(t.assignee+""));for(let n of t.refs){let t=this.createRef({ownerProduction:e,...n});e.refs.set(n.id,t)}return e}createRef(t){let e=new i;const n=t=>{let[e,n]=t.loc,i=e+"-"+n,s=this.refAnchors[i];return s||(s=document.createElement("span"),this.insertNode(s,[e,n],"ref"),this.refAnchors[i]=s),s};return(t={...t,path:t.path.map((t=>({anchor:n(t),...t})))}).depth&&(t.depth=t.depth.map((t=>({anchor:n(t),...t})))),e.bind(t),e}insertNode(t,e,n){let[i,s]=e,r=this.graph.loc?this.graph.loc[0]:0,[a,o]=this.resolveOffset(i-r),[h,l]=this.resolveOffset(s-r,!1),c=new Range;return"effect"===n?(0===o&&"SPAN"===a.parentNode.nodeName?c.setStartBefore(a.parentNode):c.setStart(a,o),l===(h.nodeValue||"").length&&"SPAN"===h.parentNode.nodeName?c.setEndAfter(h.parentNode):c.setEnd(h,l)):(c.setStart(a,o),c.setEnd(h,l)),c.surroundContents(t),t}resolveOffset(t,e=!0){return this._textNodes.reduce((([n,i,s],r)=>{if(null===i){let a=s+r.length;if(t<=a&&!r.isBlank){let i=t-s;if(!e&&0===i)return[n.node,n.length];if(!e||i<r.length)return[r.node,i]}[n,i,s]=[r,i,a]}return[n,i,s]}),[null,null,0])}getTextNodes(t=this){let e,n={acceptNode:function(t){if("SCRIPT"!==t.parentNode.nodeName)return window.NodeFilter.FILTER_ACCEPT}},i=window.document.createTreeWalker(t||this,window.NodeFilter.SHOW_TEXT,n,!1),s=[];for(;e=i.nextNode();){let t=e.nodeValue||"";s.push({node:e,length:t.length,isBlank:0===t.trim().length})}return s}setState(t,e,n,i=100){n&&this.parentEffect&&this.parentEffect.setState(t,e,!1),this.setStateCallback(t,e,n,i,(()=>{n?this.classList.add(`${t}-${e}`):this.classList.remove(`${t}-${e}`)}))}on(t,e){return this.addEventListener(t,e.bind(this)),this}}class r extends(e(s)){bind(t,e=!0){e&&(this.innerHTML=t.originalSource),setTimeout((()=>{if(!this._codeBlock.textContent.length)return;let e=t.runtime;super.bind({runtime:e,graph:e.graph})}),0)}createRef(t){}getTextNodes(t=null){return super.getTextNodes(t||this._codeBlock)}get css(){return super.css.concat(["\n            .ref-identifier:is(.path-hover, .path-runtime-active) {\n                text-decoration: underline;\n            }\n            .ref-identifier:is(.path-runtime-active) {\n            }\n\n            .ref-identifier.cause {\n                cursor: default;\n            }\n\n            .ref-identifier.affected {\n                cursor: pointer;\n            }\n\n            .ref-identifier.cause:is(.path-hover, .path-runtime-active) {\n                color: aqua;\n            }\n            .token.keyword .ref-identifier.cause:is(.path-hover, .path-runtime-active) {\n                color: mediumturquoise;\n            }\n            \n            .ref-identifier.affected:is(.path-hover, .path-runtime-active) {\n                color: yellowgreen;\n            }\n\n            .ref-identifier.cause.affected:is(.path-hover, .path-runtime-active) {\n                color: lightgreen;\n            }\n\n            subscript-effect.block-hover,\n            subscript-effect.block-runtime-active {\n                outline: 1px dashed gray;\n                outline-offset: 0.1rem;\n                border-radius: 0.1rem;\n                /*\n                background-color: darkblue;\n                */\n            }\n            subscript-effect.block-runtime-active {\n                background-color: rgba(100, 100, 100, 0.35);\n            }\n            "])}}customElements.define("subscript-codeblock",e()),customElements.define("subscript-console",r),customElements.define("subscript-effect",s)})();
//# sourceMappingURL=console.js.map