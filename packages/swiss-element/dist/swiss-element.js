!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n=n||self).swissElement={})}(this,function(n){"use strict";function t(n,t){n.innerHTML=t}function e(){return(e=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n}).apply(this,arguments)}var r=Array.isArray;function u(n){return"function"==typeof n}function o(n){return void 0===n}function i(n,t){void 0===t&&(t=null),n=n||"s";var e=t?n+"-"+t:n;return function(n){return function(n){return n&&/.-./.test(n)}(n)&&!self.customElements.get(n)}(e)?e:i(e,function(n){void 0===n&&(n="");var t=++f;return""+n+t}())}function c(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return function(n){return t.filter(Boolean).reduceRight(function(n,t){return t(n)},n)}}var a=u(self.CustomEvent)&&self.CustomEvent||function(n,t){void 0===t&&(t={});var e=document.createEvent("CustomEvent");return e.initCustomEvent(n,t.bubbles,t.cancelable,t),e};var f=0;var l,s=(l={enumerable:!1,configurable:!0,writeable:!1},function(n){for(var t=arguments.length,r=new Array(t>1?t-1:0),u=1;u<t;u++)r[u-1]=arguments[u];return r.forEach(function(t){for(var r in t){var u=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,e(u,l))}}),n}),p="connected",v="dis"+p;var d=null,h=[],y=[],b=function n(t){return typeof t==typeof n?t():t},m=function(n,t){return n.length!==t.length||n.some(A,t)},w=function(n){return function(t){var e={i:0,stack:[]};t[n]=e,t.before.push(function(){e.i=0})}},g=0,k=function(){return"_$"+g++},E=function(n){var t=d,e=t[n],r=t.update,u=e.i,o=e.stack;return e.i++,{i:u,stack:o,update:r,unknown:u===o.length}},C=function(n){var t=O(e);return _(y,t),e.reset=function(){for(var n in _(t.reset,t),t)/^_\$/.test(n)&&t[n].stack.splice(0)},e;function e(){var e=d;d=t;var r=t._,u=t.before,o=t.after,i=t.external;try{var c;do{r.$=r._=!1,_(u,t),c=n.apply(r.c=this,r.a=arguments),_(o,t),i.length&&_(i.splice(0),c)}while(r._);return c}finally{r.$=!0,d=e}}},_=function(n,t){for(var e=n.length,r=0;r<e;)n[r++](t)},O=function(n){var t={_:!0,$:!0,c:null,a:null};return{_:t,before:[],after:[],external:[],reset:[],update:function(){return t.$?n.apply(t.c,t.a):t._=!0}}};function A(n,t){return n!==this[t]}var x,R,j=k();try{x=cancelAnimationFrame,R=requestAnimationFrame}catch(n){x=clearTimeout,R=setTimeout}var $=function(n,t,e,r,u,o,i){var c={always:n,cb:u,check:t,clean:null,inputs:e,raf:r,t:0,update:t,fn:function(){P(o[i],c.cb())}};return c},P=function(n,t){n.t=0,n.clean=t};y.push(function(n){var t=[],e={i:0,stack:t},r=function(n,t,e,r){e&&r?x(r):t&&t(),P(n,null)};n[j]=e,n.before.push(function(){e.i=0}),n.reset.push(function(){e.i=0;for(var n=t.length,u=0;u<n;u++){var o=t[u],i=o.check,c=o.clean,a=o.raf,f=o.t;i&&r(o,c,a,f)}}),n.after.push(function(){for(var n=t.length,e=0;e<n;e++){var u=t[e],o=u.check,i=u.clean,c=u.fn,a=u.raf,f=u.t,l=u.update;o&&l&&(u.update=!1,r(u,i,a,f),a?u.t=R(c):c())}})});var U=function n(t){return function(e,r){var u=E(j),o=u.i,i=u.stack,c=u.unknown,a=r||h;if(c){var f=a===h,l=f||!t||"function"!=typeof a;f||!t||"function"!=typeof a?i.push($(f,l,a,t,e,i,o)):(d.external.push(function(n){return r(e,n)}),i.push($(f,f,h,t,n,i,o)))}else{var s=i[o],p=s.check,v=s.always,y=s.inputs;p&&(v||m(y,a))&&(s.cb=e,s.inputs=a,s.update=!0)}}}(!0),M=k();y.push(w(M));var q=k();y.push(w(q));var L=function(n,t){var e=E(q),r=e.i,u=e.stack,o=e.unknown,i=t||h;o&&T(u,-1,n,i);var c=u[r],a=c.filter,f=c.value,l=c.fn,s=c.inputs;return(a?m(s,i):n!==l)?T(u,r,n,i):f},T=function(n,t,e,r){var u={filter:r!==h,value:null,fn:e,inputs:r};return t<0?n.push(u):n[t]=u,u.value=e(),u.value},F=k();y.push(w(F));var H=function(n,t){var e=E(F),r=e.i,u=e.stack,o=e.unknown,i=e.update;if(o){var c=[null,function(e){t=n(t,e),c[0]=t,i()}];u.push(c),c[0]=b(t)}return u[r]},z=new WeakMap,B=k();y.push(w(B));function D(n){if(this.value!==n){this.value=n;for(var t=z.get(this),e=t.length,r=0;r<e;r++)t[r]()}}var S={current:null};function W(n){return function(t){var e=n(t),r=t.component,u=C(function(){S.current=e;var n=r.call(e,e);return e.render(n)});return e.requestUpdate=u,e}}function G(n){return function(t){var e,r=n(t),u=t.observedAttributes;return e=Object.getPrototypeOf(r),u.forEach(function(n){n in e||Object.defineProperty(e,function(n){return n.replace(/-([a-z])/g,function(n,t){return t.toUpperCase()})}(n),{configurable:!0,get:function(){return this.getAttribute(n)},set:function(t){null==t?this.removeAttribute(n):this.setAttribute(n,t)}})}),r}}var I="connectedCallback",J="dis"+I,K="attributeChangedCallback",N="adoptedCallback",Q="observedAttributes";function V(n){var t={handleEvent:X,onconnected:Y,ondisconnected:Z,$:n,_:null};S.current.addEventListener(p,t,!1),S.current.addEventListener(v,t,!1)}function X(n){this["on"+n.type]()}function Y(){Z.call(this),this._=this.$()}function Z(){var n=this._;this._=null,n&&n()}n.renderer=function(n){return void 0===n&&(n=t),function(t){return function(){var e=t.apply(void 0,arguments),r=[function(t,e,r){return n(t,e,r)},function(t,e,r){return n(e,t,r)},function(t,e,r){return n(r,e,t)},function(t,e,r){return n(t,function(){return e},r)}];return e.renderer=function n(t,u,o,i){var c;void 0===i&&(i=0),e.renderer=r[i];try{c=e.renderer(t,u,o)}catch(e){if((i+=1)<r.length)return n(t,u,o,i)}return c||""},e}}},n.applyMiddleware=function(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return function(n){return function(){var e=n.apply(void 0,arguments),r=function(){throw new Error("Rendering while constructing your middleware is not allowed. Other middleware would not be applied to this render.")},u={render:function(){return r.apply(void 0,arguments)}},o=t.map(function(n){return n(u)});return r=c.apply(void 0,o)(e.render.bind(e)),e.render=r,e}}},n.compose=c,n.element=function(n,e,f,l){var d;if(u(n)&&(l=f,f=e,e=n,n=void 0),!u(f)&&o(l)&&(l=f,f=void 0),r(l)&&((d={})[Q]=l,l=d),n=(l=l||{}).name=i(n||l.name),!o(f)&&!u(f))throw new Error("Expected the enhancer to be a function.");f=c(f,W,G);var h,y,b=function(n,t){function e(){var r=this;return this instanceof e?t.call(this,function(){return"undefined"!=typeof Reflect?Reflect.construct(n,[],r.constructor):n.call(r)}):new e}return e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e}((h=l&&l.extends)?document.createElement(h).constructor:HTMLElement,function(n){var r=s({},l,{component:e});return function(n,e){return function r(u,i){if(!o(i))return i(r)(u);var c,f=n();return s(f,{render:function(n){return f.renderer(f.renderRoot,n,c),c=n,n},renderer:t,connectedCallback:function(){f.requestUpdate(),f.dispatchEvent(new a(p))},disconnectedCallback:function(){f.dispatchEvent(new a(v))},attributeChangedCallback:function(n,t,e){f.shouldUpdate(t,e)&&f.requestUpdate()},requestUpdate:function(){var n=e.call(f,f);return f.render(n)},shouldUpdate:function(n,t){return n!==t},get renderRoot(){return f.shadowRoot||f._shadowRoot||f}})}}(n,e)(r,f)});y=b.prototype,[I,J,K,N].forEach(function(n){y[n]=function(){this.hasOwnProperty(n)&&this[n].apply(this,arguments)}});var m=l[Q]=l[Q]||[];return b[Q]=m,function(n,t,e){n&&self.customElements.define(n,t,e)}(n,b,l),b},n.useCallback=function(n,t){return L(function(){return n},t)},n.useMemo=L,n.useReducer=H,n.useRef=function(n){var t=E(M),e=t.i,r=t.stack;if(t.unknown){var u={current:null};r.push(u),u.current=b(n)}return r[e]},n.useState=function(n){return H(function(n,t){return t},n)},n.createContext=function(n){var t={value:n,provide:D};return z.set(t,[]),t},n.useContext=function(n){var t=E(B),e=t.i,r=t.stack,u=t.unknown,o=t.update;return u&&(z.get(n).push(o),r.push(n)),r[e].value},n.useEffect=function(n,t){void 0===t&&(t=[]);var e=[n];return t&&e.push(t.length?t:V),U.apply(null,e)},n.useElement=function(){return S.current},Object.defineProperty(n,"__esModule",{value:!0})});
