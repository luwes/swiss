var augmentor=function(){"use strict";var i=null,k=[],t=[],o=function n(t){return typeof t==typeof n?t():t},d=function(n,t){return n.length!==t.length||n.some(c,t)},r=function(r){return function(n){var t={i:0,stack:[]};n[r]=t,n.before.push(function(){t.i=0})}},n=0,u=function(){return"_$"+n++},g=function(n){var t=i,r=t[n],u=t.update,e=r.i,a=r.stack;return r.i++,{i:e,stack:a,update:u,unknown:e===a.length}},e=function(c){var f=a(n);return s(t,f),n.reset=function(){for(var n in s(f.reset,f),f)/^_\$/.test(n)&&f[n].stack.splice(0)},n;function n(){var n,t=i;i=f;try{var r=i,u=r._,e=r.before,a=r.after;s(e,i),n=c.apply(u.c=this,u.a=arguments),s(a,i)}catch(n){console.error(n)}return i=t,n}},s=function(n,t){for(var r=0;r<n.length;r++)n[r](t)},a=function(n){var t={c:null,a:null};return{_:t,before:[],after:[],reset:[],update:function(){return n.apply(t.c,t.a)}}};function c(n,t){return n!==this[t]}var f=u(),y=function(n,t){n.t=0,n.clean=t};t.push(function(c){r(f)(c);var n=function(){for(var n=c[f].stack,t=0;t<n.length;t++){var r=n[t],u=r.clean,e=r.raf,a=r.t;e&&a?cancelAnimationFrame(a):u&&u(),y(n[t],null)}};c.reset.push(n),c.before.push(n),c.after.push(function(){for(var n=c[f].stack,t=0;t<n.length;t++){var r=n[t],u=r.fn,e=r.raf;r.update&&(e?n[t].t=requestAnimationFrame(u):n[t].clean=u())}})});var l=function(v,h){return function(n,t){var r=g(v),u=r.i,e=r.stack,a=r.unknown,c=t||k;if(a){var f=c===k,i=!h||0<c.length||f;e.push({always:f,check:i,clean:null,fn:function(){return y(e[u],n())},inputs:c,raf:h,t:0,update:i})}else{var o=e[u],s=o.always,l=o.check,p=o.inputs;l&&(s||d(p,c))&&(o.inputs=c,o.update=!0)}}},p=l(f,!0),v=l(f,!1),h=u();t.push(r(h));var m=u();t.push(r(m));var w=function(t,r){var n=g(m),u=n.i,e=n.stack,a=n.unknown,c=n.update;a&&e.push([o(r),function(n){r=t(r,n),f[0]=r,c()}]);var f=e[u];return f},b=u();t.push(r(b));var _=function(n,t){var r=g(b),u=r.i,e=r.stack,a=r.unknown,c=t||k;a&&e.push(A(n,c));var f=e[u],i=f.filter,o=f.value,s=f.fn,l=f.inputs;return(i?d(l,c):n!==s)?(e[u]=A(n,c)).value:o},A=function(n,t){return{filter:t!==k,value:n(),fn:n,inputs:t}};return e.useCallback=function(n,t){return _(function(){return n},t)},e.useEffect=p,e.useLayoutEffect=v,e.useMemo=_,e.useReducer=w,e.useRef=function(n){var t=g(h),r=t.i,u=t.stack;return t.unknown&&u.push({current:o(n)}),u[r]},e.useState=function(n){return w(function(n,t){return t},n)},e}();