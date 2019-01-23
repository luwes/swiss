!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){"use strict";var e="http://www.w3.org/1999/xlink",n={},t=[],r=Array.isArray,o=function(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t},u=function(e){return e.currentTarget.events[e.type](e)},i=function(n,t,r,i,l){if("key"===t);else if("style"===t)for(var c in o(r,i)){var a=null==i||null==i[c]?"":i[c];"-"===c[0]?n[t].setProperty(c,a):n[t][c]=a}else if("o"===t[0]&&"n"===t[1])n.events||(n.events={}),n.events[t=t.slice(2)]=i,null==i?n.removeEventListener(t,u):null==r&&n.addEventListener(t,u);else{var f=null==i||!1===i;if(t in n&&"list"!==t&&"draggable"!==t&&"spellcheck"!==t&&"translate"!==t&&!l)n[t]=null==i?"":i,f&&n.removeAttribute(t);else l&&t!==(t=t.replace(/^xlink:?/,""))?f?n.removeAttributeNS(e,t):n.setAttributeNS(e,t,i):f?n.removeAttribute(t):n.setAttribute(t,i)}},l=function e(n,t,r){var o=2===n.type?document.createTextNode(n.name):(r=r||"svg"===n.name)?document.createElementNS("http://www.w3.org/2000/svg",n.name):document.createElement(n.name),u=n.props;u.oncreate&&t.push(function(){u.oncreate(o)});for(var l=0,c=n.children.length;l<c;l++)o.appendChild(e(n.children[l],t,r));for(var a in u)i(o,a,null,u[a],r);return n.element=o},c=function(e,n){var t=function(){e.removeChild(function e(n){for(var t=0,r=n.children.length;t<r;t++)e(n.children[t]);var o=n.props.ondestroy;return null!=o&&o(n.element),n.element}(n))},r=n.props&&n.props.onremove;null!=r?r(n.element,t):t()},a=function(e){return null==e?null:e.key},f=function e(n,t,r,u,f,s){if(u===r);else if(null!=r&&2===r.type&&2===u.type)r.name!==u.name&&(t.nodeValue=u.name);else if(null==r||r.name!==u.name){var p=n.insertBefore(l(u,f,s),t);null!=r&&c(n,r),t=p}else{var v,d,h;!function(e,n,t,r,u,l){for(var c in o(n,t))("value"===c||"checked"===c?e[c]:n[c])!==t[c]&&i(e,c,n[c],t[c],u);var a=l?t.oncreate:t.onupdate;null!=a&&r.push(function(){a(e,n)})}(t,r.props,u.props,f,s=s||"svg"===u.name,1===r.type);for(var m,y=r.children,b=0,g=y.length-1,k=u.children,w=0,E=k.length-1;w<=E&&b<=g&&(h=a(y[b]),m=a(k[w]),null!=h&&h===m);)e(t,y[b].element,y[b],k[w],f,s),b++,w++;for(;w<=E&&b<=g&&(h=a(y[g]),m=a(k[E]),null!=h&&h===m);)e(t,y[g].element,y[g],k[E],f,s),g--,E--;if(b>g)for(;w<=E;)t.insertBefore(l(k[w++],f,s),(d=y[b])&&d.element);else if(w>E)for(;b<=g;)c(t,y[b++]);else{for(var O=function(e,n,t){for(var r,o,u={};n<=t;n++)null!=(r=(o=e[n]).key)&&(u[r]=o);return u}(y,b,g),A={};w<=E;)h=a(d=y[b]),m=a(k[w]),A[h]||null!=m&&m===a(y[b+1])?(null==h&&c(t,d),b++):null==m||1===r.type?(null==h&&(e(t,d&&d.element,d,k[w],f,s),w++),b++):(h===m?(e(t,d.element,d,k[w],f,s),A[m]=!0,b++):null!=(v=O[m])?(e(t,t.insertBefore(v.element,d&&d.element),v,k[w],f,s),A[m]=!0):e(t,d&&d.element,null,k[w],f,s),w++);for(;b<=g;)null==a(d=y[b++])&&c(t,d);for(var C in O)null==A[C]&&c(t,O[C])}}return u.element=t},s=function(e,n,t,r,o,u){return{name:e,props:n,children:t,element:r,key:o,type:u}},p=function(e,o){for(var u,i=[],l=[],c=arguments.length;c-- >2;)i.push(arguments[c]);for(null!=(o=null==o?{}:o).children&&(i.length<=0&&i.push(o.children),delete o.children);i.length>0;)if(r(u=i.pop()))for(c=u.length;c-- >0;)i.push(u[c]);else!1===u||!0===u||null==u||l.push("object"==typeof u?u:s(u,n,t,void 0,null,2));return"function"==typeof e?e(o,o.children=l):s(e,o,l,null,o.key,0)};function v(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function d(){return(d=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var h,m,y=null,b=[],g=function(e){return function(n){var t={i:0,stack:[]};n[e]=t,n.before.push(function(){t.i=0})}},k=0,w=function(){return"_$"+k++},E=function(e){var n=A(t);return O(b,n),t.reset=function(){for(var e in O(n.reset,n),n)/^_\$/.test(e)&&n[e].stack.splice(0)},t;function t(){var t=y;y=n;var r=n._,o=n.before,u=n.after,i=n.external;try{var l;do{r.$=r._=!1,O(o,n),l=e.apply(r.c=this,r.a=arguments),O(u,n),i.length&&O(i.splice(0),l)}while(r._);return l}finally{r.$=!0,y=t}}},O=function(e,n){for(var t=e.length,r=0;r<t;)e[r++](n)},A=function(e){var n={_:!0,$:!0,c:null,a:null};return{_:n,before:[],after:[],external:[],reset:[],update:function(){return n.$?e.apply(n.c,n.a):n._=!0}}},C=w();try{h=cancelAnimationFrame,m=requestAnimationFrame}catch(e){h=clearTimeout,m=setTimeout}var j=function(e,n){e.t=0,e.clean=n};b.push(function(e){var n=[],t={i:0,stack:n};e[C]=t;var r=function(){t.i=0;for(var e=n.length,r=0;r<e;r++){var o=n[r],u=o.check,i=o.clean,l=o.raf,c=o.t;u&&(l&&c?h(c):i&&i(),j(n[r],null))}};e.reset.push(r),e.before.push(r),e.after.push(function(){for(var e=n.length,t=0;t<e;t++){var r=n[t],o=r.fn,u=r.raf;r.update&&(r.update=!1,u?r.t=m(o):o())}})});var P=w();b.push(g(P));var _=w();b.push(g(_));var x=w();b.push(g(x));var R=function(e,n){var t=function(e){var n=y,t=n[e],r=n.update,o=t.i,u=t.stack;return t.i++,{i:o,stack:u,update:r,unknown:o===u.length}}(x),r=t.i,o=t.stack,u=t.unknown,i=t.update;if(u){var l=[null,function(t){n=e(n,t),l[0]=n,i()}];o.push(l),l[0]=function e(n){return typeof n==typeof e?n():n}(n)}return o[r]},T=function(e){return R(function(e,n){return n},e)},$=w();function S(e,n){e.innerHTML=n}b.push(g($));var L=Array.isArray;function N(e){return"function"==typeof e}function U(e){return void 0===e}function B(e,n){void 0===n&&(n=null),e=e||"s";var t=n?e+"-"+n:e;return function(e){return function(e){return e&&/.-./.test(e)}(e)&&!self.customElements.get(e)}(t)?t:B(t,function(e){void 0===e&&(e="");var n=++D;return""+e+n}())}var q=N(self.CustomEvent)&&self.CustomEvent||function(e,n){void 0===n&&(n={});var t=document.createEvent("CustomEvent");return t.initCustomEvent(e,n.bubbles,n.cancelable,n),t},D=0;var F,H=(F={enumerable:!1,configurable:!0,writeable:!1},function(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return t.forEach(function(n){for(var t in n){var r=Object.getOwnPropertyDescriptor(n,t);Object.defineProperty(e,t,d(r,F))}}),e}),M="connected",z="dis"+M;var V,G="connectedCallback",I="dis"+G,J="attributeChangedCallback",K="adoptedCallback",Q="observedAttributes";!function(e,n,t,r){var o;N(e)&&(r=t,t=n,n=e,e=void 0),!N(t)&&U(r)&&(r=t,t=void 0),L(r)&&((o={})[Q]=r,r=o),e=(r=r||{}).name=B(e||r.name);var u,i,l=function(e,n){function t(){var r=this;return this instanceof t?n.call(this,function(){return"undefined"!=typeof Reflect?Reflect.construct(e,[],r.constructor):e.call(r)}):new t}return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t}((u=r&&r.extends)?document.createElement(u).constructor:HTMLElement,function(e){var o=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){v(e,n,t[n])})}return e}({},r,{component:n});return function(e,n){return function t(r,o){if(!U(o)){if(!N(o))throw new Error("Expected the enhancer to be a function.");return o(t)(r)}var u,i=e(),l=E(function(){var e=n.call(i,i);return i.render(e)});return H(i,{render:function(e){return i.renderer(i.renderRoot,e,u),u=e,e},renderer:S,connectedCallback:function(){l(),i.dispatchEvent(new q(M))},disconnectedCallback:function(){i.dispatchEvent(new q(z))},attributeChangedCallback:function(e,n,t){i.shouldUpdate(n,t)&&l()},requestUpdate:l,shouldUpdate:function(e,n){return e!==n},get renderRoot(){return i.shadowRoot||i._shadowRoot||i}})}}(e,n)(o,t)});i=l.prototype,[G,I,J,K].forEach(function(e){i[e]=function(){this.hasOwnProperty(e)&&this[e].apply(this,arguments)}});var c=l[Q]=r[Q]||[];(function(e,n){n.forEach(function(n){n in e||Object.defineProperty(e,function(e){return e.replace(/-([a-z])/g,function(e,n){return n.toUpperCase()})}(n),{configurable:!0,get:function(){return this.getAttribute(n)},set:function(e){null==e?this.removeAttribute(n):this.setAttribute(n,e)}})})})(l.prototype,c),function(e,n,t){e&&self.customElements.define(e,n,t)}(e,l,r)}("s-counter",function(){var e=T(0),n=e[0],t=e[1];return p("div",{},[p("h1",{},n),p("button",{onclick:function(){return t(n-1)}},"-"),p("button",{onclick:function(){return t(n+1)}},"+")])},(V=function(e,n,t){var r=[];for(f(t,t.children[0],e,n,r);r.length>0;)r.pop()();return n},void 0===V&&(V=S),function(e){return function(){var n=e.apply(void 0,arguments),t=[function(e,n){return V(n,e)},function(e,n,t){return V(t,n,e)},function(e,n){return V(e,function(){return n})}];return n.renderer=function e(r,o,u,i){var l;void 0===i&&(i=0),n.renderer=t[i];try{l=n.renderer(r,o,u)}catch(n){if((i+=1)<t.length)return e(r,o,u,i)}return l||""},n}}))});
