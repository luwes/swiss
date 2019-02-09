!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){"use strict";function e(){return(e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}n.notEqual=function(e,t,r){n(e!=t,r)},n.notOk=function(e,t){n(!e,t)},n.equal=function(e,t,r){n(e==t,r)},n.ok=n;var t=n;function n(e,t){if(!e)throw new Error(t||"AssertionError")}var r=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","onmouseenter","onmouseleave","ontouchcancel","ontouchend","ontouchmove","ontouchstart","ondragstart","ondrag","ondragenter","ondragleave","ondragover","ondrop","ondragend","onkeydown","onkeypress","onkeyup","onunload","onabort","onerror","onresize","onscroll","onselect","onchange","onsubmit","onreset","onfocus","onblur","oninput","oncontextmenu","onfocusin","onfocusout"],o=r.length,a=1,i=3,u=8,l=function(e,t){var n=e.nodeType,l=e.nodeName;n===a&&function(e,t){for(var n=t.attributes,r=e.attributes,o=null,a=null,i=null,u=null,l=r.length-1;l>=0;--l)u=r[l],i=u.name,o=u.namespaceURI,a=u.value,o?(i=u.localName||i,t.getAttributeNS(o,i)!==a&&t.setAttributeNS(o,i,a)):t.hasAttribute(i)?t.getAttribute(i)!==a&&("null"===a||"undefined"===a?t.removeAttribute(i):t.setAttribute(i,a)):t.setAttribute(i,a);for(var c=n.length-1;c>=0;--c)!1!==(u=n[c]).specified&&(i=u.name,(o=u.namespaceURI)?(i=u.localName||i,e.hasAttributeNS(o,i)||t.removeAttributeNS(o,i)):e.hasAttributeNS(null,i)||t.removeAttribute(i))}(e,t);n!==i&&n!==u||t.nodeValue!==e.nodeValue&&(t.nodeValue=e.nodeValue);"INPUT"===l?function(e,t){var n=e.value,r=t.value;c(e,t,"checked"),c(e,t,"disabled"),n!==r&&(t.setAttribute("value",n),t.value=n);"null"===n&&(t.value="",t.removeAttribute("value"));e.hasAttributeNS(null,"value")?"range"===t.type&&(t.value=n):t.removeAttribute("value")}(e,t):"OPTION"===l?function(e,t){c(e,t,"selected")}(e,t):"TEXTAREA"===l&&function(e,t){var n=e.value;n!==t.value&&(t.value=n);if(t.firstChild&&t.firstChild.nodeValue!==n){if(""===n&&t.firstChild.nodeValue===t.placeholder)return;t.firstChild.nodeValue=n}}(e,t);!function(e,t){for(var n=0;n<o;n++){var a=r[n];e[a]?t[a]=e[a]:t[a]&&(t[a]=void 0)}}(e,t)};function c(e,t,n){e[n]!==t[n]&&(t[n]=e[n],e[n]?t.setAttribute(n,""):t.removeAttribute(n))}var s=3,f=function(e,n,r){if(t.equal(typeof e,"object","nanomorph: oldTree should be an object"),t.equal(typeof n,"object","nanomorph: newTree should be an object"),t.notEqual(n.nodeType,11,"nanomorph: newTree should have one root node (which is not a DocumentFragment)"),r&&r.childrenOnly)return p(n,e),e;return d(n,e)};function d(e,t){return t?e?e.isSameNode&&e.isSameNode(t)?t:e.tagName!==t.tagName?e:(l(e,t),p(e,t),t):null:e}function p(e,t){for(var n,r,o,a,i=0,u=0;n=t.childNodes[u],r=e.childNodes[u-i],n||r;u++)if(r)if(n)if(h(r,n))(o=d(r,n))!==n&&(t.replaceChild(o,n),i++);else{a=null;for(var l=u;l<t.childNodes.length;l++)if(h(t.childNodes[l],r)){a=t.childNodes[l];break}a?((o=d(r,a))!==a&&i++,t.insertBefore(o,n)):r.id||n.id?(t.insertBefore(r,n),i++):(o=d(r,n))!==n&&(t.replaceChild(o,n),i++)}else t.appendChild(r),i++;else t.removeChild(n),u--}function h(e,t){return e.id?e.id===t.id:e.isSameNode?e.isSameNode(t):e.tagName===t.tagName&&(e.type===s&&e.nodeValue===t.nodeValue)}var v=function(e){return function(t,n,r){for(var o in n)o in m&&(n[m[o]]=n[o],delete n[o]);return e(t,n,r)}},m={class:"className",for:"htmlFor","http-equiv":"httpEquiv"};var g=1,b=2,y=3,w=4,A=5,k=6,C=7,x=8,N=9,E=10,O=11,T=12,S=13;function F(e){return e===N||e===E}var V=RegExp("^("+["area","base","basefont","bgsound","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr","!--","animate","animateTransform","circle","cursor","desc","ellipse","feBlend","feColorMatrix","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","font-face-format","font-face-name","font-face-uri","glyph","glyphRef","hkern","image","line","missing-glyph","mpath","path","polygon","polyline","rect","set","stop","tref","use","view","vkern"].join("|")+")(?:[.#][a-zA-Z0-9-￿_:-]+)*$");var L,R=/\n[\s]+$/,j=/^\n[\s]+/,P=/[\s]+$/,q=/^[\s]+/,M=/[\n\s]+/g,$=["a","abbr","b","bdi","bdo","br","cite","data","dfn","em","i","kbd","mark","q","rp","rt","rtc","ruby","s","amp","small","span","strong","sub","sup","time","u","var","wbr"],D=["code","pre","textarea"],U=function e(t,n){if(Array.isArray(n))for(var r,o,a=t.nodeName.toLowerCase(),i=!1,u=0,l=n.length;u<l;u++){var c=n[u];if(Array.isArray(c))e(t,c);else{("number"==typeof c||"boolean"==typeof c||"function"==typeof c||c instanceof Date||c instanceof RegExp)&&(c=c.toString());var s=t.childNodes[t.childNodes.length-1];if("string"==typeof c)i=!0,s&&"#text"===s.nodeName?s.nodeValue+=c:(c=document.createTextNode(c),t.appendChild(c),s=c),u===l-1&&(i=!1,-1===$.indexOf(a)&&-1===D.indexOf(a)?""===(r=s.nodeValue.replace(j,"").replace(P,"").replace(R,"").replace(M," "))?t.removeChild(s):s.nodeValue=r:-1===D.indexOf(a)&&(o=0===u?"":" ",r=s.nodeValue.replace(j,o).replace(q," ").replace(P,"").replace(R,"").replace(M," "),s.nodeValue=r));else if(c&&c.nodeType){i&&(i=!1,-1===$.indexOf(a)&&-1===D.indexOf(a)?""===(r=s.nodeValue.replace(j,"").replace(R,"").replace(M," "))?t.removeChild(s):s.nodeValue=r:-1===D.indexOf(a)&&(r=s.nodeValue.replace(q," ").replace(j,"").replace(R,"").replace(M," "),s.nodeValue=r));var f=c.nodeName;f&&(a=f.toLowerCase()),t.appendChild(c)}}}},_=["svg","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"],B=["async","autofocus","autoplay","checked","controls","default","defaultchecked","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","novalidate","open","playsinline","readonly","required","reversed","selected"],G=["indeterminate"],I=(function(e){var t="http://www.w3.org/2000/svg",n="http://www.w3.org/1999/xlink",r="!--";function o(e,o,a){var i;-1!==_.indexOf(e)&&(o.namespace=t);var u=!1;o.namespace&&(u=o.namespace,delete o.namespace);var l=!1;if(o.is&&(l=o.is,delete o.is),u)i=l?document.createElementNS(u,e,{is:l}):document.createElementNS(u,e);else{if(e===r)return document.createComment(o.comment);i=l?document.createElement(e,{is:l}):document.createElement(e)}for(var c in o)if(o.hasOwnProperty(c)){var s=c.toLowerCase(),f=o[c];if("classname"===s&&(s="class",c="class"),"htmlFor"===c&&(c="for"),-1!==B.indexOf(s))if("true"===f)f=s;else if("false"===f)continue;"on"===s.slice(0,2)||-1!==G.indexOf(s)?i[c]=f:u?"xlink:href"===c?i.setAttributeNS(n,c,f):/^xmlns($|:)/i.test(c)||i.setAttributeNS(null,c,f):i.setAttribute(c,f)}return U(i,a),i}e.exports=function(e,t){t||(t={});var n=t.concat||function(e,t){return String(e)+String(t)};return!1!==t.attrToProp&&(e=v(e)),function(o){for(var a=g,i="",u=arguments.length,l=[],c=0;c<o.length;c++)if(c<u-1){var s=arguments[c+1],f=$(o[c]),d=a;d===E&&(d=x),d===N&&(d=x),d===C&&(d=x),d===w&&(d=A),d===b?"/"===i?(f.push([b,"/",s]),i=""):f.push([b,s]):f.push([0,d,s]),l.push.apply(l,f)}else l.push.apply(l,$(o[c]));var p,h=[null,{},[]],v=[[h,-1]];for(c=0;c<l.length;c++){var m=v[v.length-1][0],L=(f=l[c])[0];if(L===b&&/^\//.test(f[1])){var R=v[v.length-1][1];v.length>1&&(v.pop(),v[v.length-1][0][2][R]=e(m[0],m[1],m[2].length?m[2]:void 0))}else if(L===b){var j=[f[1],{},[]];m[2].push(j),v.push([j,m[2].length-1])}else if(L===A||0===L&&f[1]===A){for(var P,q="";c<l.length;c++)if(l[c][0]===A)q=n(q,l[c][1]);else{if(0!==l[c][0]||l[c][1]!==A)break;if("object"!=typeof l[c][2]||q)q=n(q,l[c][2]);else for(P in l[c][2])l[c][2].hasOwnProperty(P)&&!m[1][P]&&(m[1][P]=l[c][2][P])}l[c][0]===O&&c++;for(var M=c;c<l.length;c++)if(l[c][0]===x||l[c][0]===A)m[1][q]?""===l[c][1]||(m[1][q]=n(m[1][q],l[c][1])):m[1][q]=r(l[c][1]);else{if(0!==l[c][0]||l[c][1]!==x&&l[c][1]!==A){!q.length||m[1][q]||c!==M||l[c][0]!==y&&l[c][0]!==T||(m[1][q]=q.toLowerCase()),l[c][0]===y&&c--;break}m[1][q]?""===l[c][2]||(m[1][q]=n(m[1][q],l[c][2])):m[1][q]=r(l[c][2])}}else if(L===A)m[1][f[1]]=!0;else if(0===L&&f[1]===A)m[1][f[2]]=!0;else if(L===y)p=m[0],V.test(p)&&v.length&&(R=v[v.length-1][1],v.pop(),v[v.length-1][0][2][R]=e(m[0],m[1],m[2].length?m[2]:void 0));else if(0===L&&f[1]===g)void 0===f[2]||null===f[2]?f[2]="":f[2]||(f[2]=n("",f[2])),Array.isArray(f[2][0])?m[2].push.apply(m[2],f[2]):m[2].push(f[2]);else if(L===g)m[2].push(f[1]);else if(L!==O&&L!==T)throw new Error("unhandled: "+L)}if(h[2].length>1&&/^\s*$/.test(h[2][0])&&h[2].shift(),h[2].length>2||2===h[2].length&&/\S/.test(h[2][1])){if(t.createFragment)return t.createFragment(h[2]);throw new Error("multiple root elements must be wrapped in an enclosing tag")}return Array.isArray(h[2][0])&&"string"==typeof h[2][0][0]&&Array.isArray(h[2][0][2])&&(h[2][0]=e(h[2][0][0],h[2][0][1],h[2][0][2])),h[2][0];function $(e){var n=[];a===C&&(a=w);for(var r=0;r<e.length;r++){var o=e.charAt(r);a===g&&"<"===o?(i.length&&n.push([g,i]),i="",a=b):">"!==o||F(a)||a===S?a===S&&/-$/.test(i)&&"-"===o?(t.comments&&n.push([x,i.substr(0,i.length-1)],[y]),i="",a=g):a===b&&/^!--$/.test(i)?(t.comments&&n.push([b,i],[A,"comment"],[O]),i=o,a=S):a===g||a===S?i+=o:a===b&&"/"===o&&i.length||(a===b&&/\s/.test(o)?(i.length&&n.push([b,i]),i="",a=w):a===b?i+=o:a===w&&/[^\s"'=\/]/.test(o)?(a=A,i=o):a===w&&/\s/.test(o)?(i.length&&n.push([A,i]),n.push([T])):a===A&&/\s/.test(o)?(n.push([A,i]),i="",a=k):a===A&&"="===o?(n.push([A,i],[O]),i="",a=C):a===A?i+=o:a!==k&&a!==w||"="!==o?a!==k&&a!==w||/\s/.test(o)?a===C&&'"'===o?a=E:a===C&&"'"===o?a=N:a===E&&'"'===o?(n.push([x,i],[T]),i="",a=w):a===N&&"'"===o?(n.push([x,i],[T]),i="",a=w):a!==C||/\s/.test(o)?a===x&&/\s/.test(o)?(n.push([x,i],[T]),i="",a=w):a!==x&&a!==N&&a!==E||(i+=o):(a=x,r--):(n.push([T]),/[\w-]/.test(o)?(i+=o,a=A):a=w):(n.push([O]),a=C)):(a===b&&i.length?n.push([b,i]):a===A?n.push([A,i]):a===x&&i.length&&n.push([x,i]),n.push([y]),i="",a=g)}return a===g&&i.length?(n.push([g,i]),i=""):a===x&&i.length?(n.push([x,i]),i=""):a===E&&i.length?(n.push([x,i]),i=""):a===N&&i.length?(n.push([x,i]),i=""):a===A&&(n.push([A,i]),i=""),n}};function r(e){return"function"==typeof e?e:"string"==typeof e?e:e&&"object"==typeof e?e:n("",e)}}(o,{comments:!0,createFragment:function(e){for(var t=document.createDocumentFragment(),n=0;n<e.length;n++)"string"==typeof e[n]&&(e[n]=document.createTextNode(e[n])),t.appendChild(e[n]);return t}}),e.exports.default=e.exports,e.exports.createElement=o}(L={exports:{}},L.exports),L.exports);I.createElement;function z(e,t){e.innerHTML=t}var H=Array.isArray;function X(e){return"function"==typeof e}function Z(e){return void 0===e}function J(e,t){void 0===t&&(t=null),e=e||"s";var n=t?e+"-"+t:e;return function(e){return/.-./.test(e)&&!self.customElements.get(e)}(n)?n:J(n,function(e){void 0===e&&(e="");var t=++Q;return""+e+t}())}var K=X(self.CustomEvent)&&self.CustomEvent||function(e,t){void 0===t&&(t={});var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t),n};var Q=0;var W,Y=(W={configurable:!0},function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.forEach(function(n){for(var r in n){var o=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(t,r,e(o,W))}}),t}),ee="connected",te="dis"+ee;var ne,re,oe=null,ae=[],ie=[],ue=function e(t,n){return typeof t==typeof e?t.apply(null,n):t},le=function(e){return function(t){var n={i:0,stack:[]};t[e]=n,t.before.push(function(){n.i=0})}},ce=0,se=function(){return"_$"+ce++},fe=function(e){var t=pe(n);return de(ie,t),n.reset=function(){for(var e in de(t.reset,t),t)/^_\$/.test(e)&&t[e].stack.splice(0)},n;function n(){var n=oe;oe=t;var r=t._,o=t.before,a=t.after,i=t.external;try{var u;do{r.$=r._=!1,de(o,t),u=e.apply(r.c=this,r.a=arguments),de(a,t),i.length&&de(i.splice(0),u)}while(r._);return u}finally{r.$=!0,oe=n}}},de=function(e,t){for(var n=e.length,r=0;r<n;)e[r++](t)},pe=function(e){var t={_:!0,$:!0,c:null,a:null};return{_:t,before:[],after:[],external:[],reset:[],update:function(){return t.$?e.apply(t.c,t.a):t._=!0}}},he=se();try{ne=cancelAnimationFrame,re=requestAnimationFrame}catch(e){ne=clearTimeout,re=setTimeout}ie.push(function(e){var t=[],n={i:0,stack:t},r=function(e,t,n,r){n&&r?ne(r):t&&t(),function(e,t){e.t=0,e.clean=t}(e,null)};e[he]=n,e.before.push(function(){n.i=0}),e.reset.push(function(){n.i=0;for(var e=t.length,o=0;o<e;o++){var a=t[o],i=a.check,u=a.clean,l=a.raf,c=a.t;i&&r(a,u,l,c)}}),e.after.push(function(){for(var e=t.length,n=0;n<e;n++){var o=t[n],a=o.check,i=o.clean,u=o.fn,l=o.raf,c=o.t,s=o.update;a&&s&&(o.update=!1,r(o,i,l,c),l?o.t=re(u):u())}})});var ve=se();ie.push(le(ve));var me=se();ie.push(le(me));var ge=se();ie.push(le(ge));var be=function(e,t){var n=function(e){var t=oe,n=t[e],r=t.update,o=n.i,a=n.stack;return n.i++,{i:o,stack:a,update:r,unknown:o===a.length}}(ge),r=n.i,o=n.stack,a=n.unknown,i=n.update;if(a){var u=[null,function(n){t=e(t,n),u[0]=t,i()}];o.push(u),u[0]=ue(t,ae)}return o[r]},ye=function(e){return be(function(e,t){return ue(t,[e])},e)},we=se();ie.push(le(we));var Ae,ke,Ce="connectedCallback",xe="dis"+Ce,Ne="attributeChangedCallback",Ee="adoptedCallback",Oe="observedAttributes",Te=[function(e){return function(t){var n=e(t),r=t.component,o=fe(function(){var e=r.call(n,n);return n.render(e)});return n.requestUpdate=o,n}},function(e){return function(t){var n,r=e(t);return n=Object.getPrototypeOf(r),t.observedAttributes.forEach(function(e){e in n||Object.defineProperty(n,function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()})}(e),{configurable:!0,get:function(){return this.getAttribute(e)},set:function(t){null==t?this.removeAttribute(e):this.setAttribute(e,t)}})}),r}}];function Se(){var e,t,n=(e=['\n    <div class="box level">\n      <div class="level-item">\n        <button class="button" onclick="','">-</button>\n      </div>\n      <div class="level-item">\n        <h1 class="title">','</h1>\n      </div>\n      <div class="level-item">\n        <button class="button" onclick="','">+</button>\n      </div>\n    </div>\n  '],t||(t=e.slice(0)),e.raw=t,e);return Se=function(){return n},n}!function(e,t,n,r){var o;if(X(e)&&(r=n,n=t,t=e,e=void 0),!X(n)&&Z(r)&&(r=n,n=void 0),H(r)&&((o={})[Oe]=r,r=o),e=(r=r||{}).name=J(e||r.name),!Z(n)&&!X(n))throw new Error("Expected the enhancer to be a function.");n=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return t.filter(Boolean).reduceRight(function(e,t){return t(e)},e)}}.apply(void 0,[n].concat(Te));var a,i,u=function(e,t){function n(){var r=this;return this instanceof n?t.call(this,function(){return"undefined"!=typeof Reflect?Reflect.construct(e,[],r.constructor):e.call(r)}):new n}return n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n}((a=r&&r.extends)?document.createElement(a).constructor:HTMLElement,function(e){var o=Y({},r,{component:t});return function(e,t){return function n(r,o){if(!Z(o))return o(n)(r);var a,i=e();return r.shadow&&i.attachShadow({mode:r.shadow}),Y(i,{render:function(e){return i.renderer(i.renderRoot,e,a),a=e,e},renderer:z,connectedCallback:function(){i.requestUpdate(),i.dispatchEvent(new K(ee))},disconnectedCallback:function(){i.dispatchEvent(new K(te))},attributeChangedCallback:function(e,t,n){i.shouldUpdate(e,t,n)&&i.requestUpdate()},requestUpdate:function(){var e=t.call(i,i);return i.render(e)},shouldUpdate:function(e,t,n){return t!==n},get renderRoot(){return i.shadowRoot||i._shadowRoot||i}})}}(e,t)(o,n)});i=u.prototype,[Ce,xe,Ne,Ee].forEach(function(e){i[e]=function(){this.hasOwnProperty(e)&&this[e].apply(this,arguments)}});var l=r[Oe]=r[Oe]||[];u[Oe]=l,function(e,t,n){e&&self.customElements.define(e,t,n)}(e,u,r)}("s-counter",function(){var e=ye(0),t=e[0],n=e[1];return I(Se(),function(){return n(t-1)},t,function(){return n(t+1)})},(ke=function(e,t){e.firstChild?f(Ae,t):Ae=e.appendChild(t)},void 0===ke&&(ke=z),function(e){return function(){var t=e.apply(void 0,arguments),n=[function(e,t,n){return ke(e,t,n)},function(e,t,n){return ke(t,e,n)},function(e,t,n){return ke(n,t,e)},function(e,t,n){return ke(e,function(){return t},n)}];return t.renderer=function e(r,o,a,i){var u;void 0===i&&(i=0),t.renderer=n[i];try{u=t.renderer(r,o,a)}catch(t){if((i+=1)<n.length)return e(r,o,a,i)}return u||""},t}}))});
//# sourceMappingURL=counter.js.map