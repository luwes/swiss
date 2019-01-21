function e(){}var t={},n=[],o=[];function r(t,r){var i,l,a,s,c=arguments,p=o;for(s=arguments.length;s-- >2;)n.push(c[s]);for(r&&null!=r.children&&(n.length||n.push(r.children),delete r.children);n.length;)if((l=n.pop())&&void 0!==l.pop)for(s=l.length;s--;)n.push(l[s]);else"boolean"==typeof l&&(l=null),(a="function"!=typeof t)&&(null==l?l="":"number"==typeof l?l=String(l):"string"!=typeof l&&(a=!1)),a&&i?p[p.length-1]+=l:p===o?p=[l]:p.push(l),i=a;var u=new e;return u.nodeName=t,u.children=p,u.attributes=null==r?void 0:r,u.key=null==r?void 0:r.key,u}function i(e,t){for(var n in t)e[n]=t[n];return e}var l="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,a=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,s=[];function c(e){!e._dirty&&(e._dirty=!0)&&1==s.push(e)&&l(p);}function p(){var e,t=s;for(s=[];e=t.pop();)e._dirty&&B(e);}function u(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function f(e){var t=i({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function d(e){var t=e.parentNode;t&&t.removeChild(e);}function v(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),o&&o(e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"==typeof o[i]&&!1===a.test(i)?o[i]+"px":o[i];}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var l=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,_,l):e.removeEventListener(t,_,l),(e._listeners||(e._listeners={}))[t]=o;}else if("list"!==t&&"type"!==t&&!r&&t in e)!function(e,t,n){try{e[t]=n;}catch(e){}}(e,t,null==o?"":o),null!=o&&!1!==o||e.removeAttribute(t);else{var s=r&&t!==(t=t.replace(/^xlink:?/,""));null==o||!1===o?s?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(s?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o));}else e.className=o||"";}function _(e){return this._listeners[e.type](e)}var h=[],m=0,y=!1,b=!1;function g(){for(var e;e=h.pop();)e.componentDidMount&&e.componentDidMount();}function C(e,t,n,o,r,i){m++||(y=null!=r&&void 0!==r.ownerSVGElement,b=null!=e&&!("__preactattr_"in e));var l=x(e,t,n,o,i);return r&&l.parentNode!==r&&r.appendChild(l),--m||(b=!1,i||g()),l}function x(e,t,n,o,r){var i=e,l=y;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),N(e,!0))),i.__preactattr_=!0,i;var a,s,c=t.nodeName;if("function"==typeof c)return function(e,t,n,o){var r=e&&e._component,i=r,l=e,a=r&&e._componentConstructor===t.nodeName,s=a,c=f(t);for(;r&&!s&&(r=r._parentComponent);)s=r.constructor===t.nodeName;r&&s&&(!o||r._component)?(T(r,c,3,n,o),e=r.base):(i&&!a&&(P(i),e=l=null),r=S(t.nodeName,c,n),e&&!r.nextBase&&(r.nextBase=e,l=null),T(r,c,1,n,o),e=r.base,l&&e!==l&&(l._component=null,N(l,!1)));return e}(e,t,n,o);if(y="svg"===c||"foreignObject"!==c&&y,c=String(c),(!e||!u(e,c))&&(a=c,(s=y?document.createElementNS("http://www.w3.org/2000/svg",a):document.createElement(a)).normalizedNodeName=a,i=s,e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),N(e,!0);}var p=i.firstChild,_=i.__preactattr_,h=t.children;if(null==_){_=i.__preactattr_={};for(var m=i.attributes,g=m.length;g--;)_[m[g].name]=m[g].value;}return !b&&h&&1===h.length&&"string"==typeof h[0]&&null!=p&&void 0!==p.splitText&&null==p.nextSibling?p.nodeValue!=h[0]&&(p.nodeValue=h[0]):(h&&h.length||null!=p)&&function(e,t,n,o,r){var i,l,a,s,c,p=e.childNodes,f=[],v={},_=0,h=0,m=p.length,y=0,b=t?t.length:0;if(0!==m)for(var g=0;g<m;g++){var C=p[g],k=C.__preactattr_,w=b&&k?C._component?C._component.__key:k.key:null;null!=w?(_++,v[w]=C):(k||(void 0!==C.splitText?!r||C.nodeValue.trim():r))&&(f[y++]=C);}if(0!==b)for(var g=0;g<b;g++){c=null;var w=(s=t[g]).key;if(null!=w)_&&void 0!==v[w]&&(c=v[w],v[w]=void 0,_--);else if(!c&&h<y)for(i=h;i<y;i++)if(void 0!==f[i]&&(S=l=f[i],T=r,"string"==typeof(L=s)||"number"==typeof L?void 0!==S.splitText:"string"==typeof L.nodeName?!S._componentConstructor&&u(S,L.nodeName):T||S._componentConstructor===L.nodeName)){c=l,f[i]=void 0,i===y-1&&y--,i===h&&h++;break}c=x(c,s,n,o),a=p[g],c&&c!==e&&c!==a&&(null==a?e.appendChild(c):c===a.nextSibling?d(a):e.insertBefore(c,a));}var S,L,T;if(_)for(var g in v)void 0!==v[g]&&N(v[g],!1);for(;h<=y;)void 0!==(c=f[y--])&&N(c,!1);}(i,h,n,o,b||null!=_.dangerouslySetInnerHTML),function(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||v(e,o,n[o],n[o]=void 0,y);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||v(e,o,n[o],n[o]=t[o],y);}(i,t.attributes,_),y=l,i}function N(e,t){var n=e._component;n?P(n):(null!=e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),!1!==t&&null!=e.__preactattr_||d(e),k(e));}function k(e){for(e=e.lastChild;e;){var t=e.previousSibling;N(e,!0),e=t;}}var w={};function S(e,t,n){var o,r=w[e.name];if(e.prototype&&e.prototype.render?(o=new e(t,n),U.call(o,t,n)):((o=new U(t,n)).constructor=e,o.render=L),r)for(var i=r.length;i--;)if(r[i].constructor===e){o.nextBase=r[i].nextBase,r.splice(i,1);break}return o}function L(e,t,n){return this.constructor(e,n)}function T(e,n,o,r,i){e._disable||(e._disable=!0,(e.__ref=n.ref)&&delete n.ref,(e.__key=n.key)&&delete n.key,!e.base||i?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(n,r),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=n,e._disable=!1,0!==o&&(1!==o&&!1===t.syncComponentUpdates&&e.base?c(e):B(e,1,i)),e.__ref&&e.__ref(e));}function B(e,t,n,o){if(!e._disable){var r,l,a,s=e.props,c=e.state,p=e.context,u=e.prevProps||s,d=e.prevState||c,v=e.prevContext||p,_=e.base,y=e.nextBase,b=_||y,x=e._component,k=!1;if(_&&(e.props=u,e.state=d,e.context=v,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(s,c,p)?k=!0:e.componentWillUpdate&&e.componentWillUpdate(s,c,p),e.props=s,e.state=c,e.context=p),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!k){r=e.render(s,c,p),e.getChildContext&&(p=i(i({},p),e.getChildContext()));var w,L,U=r&&r.nodeName;if("function"==typeof U){var M=f(r);(l=x)&&l.constructor===U&&M.key==l.__key?T(l,M,1,p,!1):(w=l,e._component=l=S(U,M,p),l.nextBase=l.nextBase||y,l._parentComponent=e,T(l,M,0,p,!1),B(l,1,n,!0)),L=l.base;}else a=b,(w=x)&&(a=e._component=null),(b||1===t)&&(a&&(a._component=null),L=C(a,r,p,n||!_,b&&b.parentNode,!0));if(b&&L!==b&&l!==x){var W=b.parentNode;W&&L!==W&&(W.replaceChild(L,b),w||(b._component=null,N(b,!1)));}if(w&&P(w),e.base=L,L&&!o){for(var A=e,E=e;E=E._parentComponent;)(A=E).base=L;L._component=A,L._componentConstructor=A.constructor;}}if(!_||n?h.unshift(e):k||e.componentDidUpdate&&e.componentDidUpdate(u,d,v),null!=e._renderCallbacks)for(;e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);m||o||g();}}function P(e){var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?P(n):t&&(t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),e.nextBase=t,d(t),function(e){var t=e.constructor.name;(w[t]||(w[t]=[])).push(e);}(e),k(t)),e.__ref&&e.__ref(null);}function U(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{};}i(U.prototype,{setState:function(e,t){var n=this.state;this.prevState||(this.prevState=i({},n)),i(n,"function"==typeof e?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),c(this);},forceUpdate:function(e){e&&(this._renderCallbacks=this._renderCallbacks||[]).push(e),B(this,2);},render:function(){}});var M={},W=JSON.stringify;var A=function(e){for(var t,n,o,r,i,l=0,a="return ",s="",c="",p=0,u="",f="",d="",v=0,_=function(){o?9===l?(p++&&(a+=","),a+="h("+(c||W(s)),l=0):13===l||0===l&&"..."===s?(0===l?(d||(d=")",u=u?"Object.assign("+u:"Object.assign({}"),u+=f+","+c,f=""):r&&(u+=u?","+(f?"":"{"):"{",f="}",u+=W(r)+":",u+=c||(i||s)&&W(s)||"true",r=""),i=!1):0===l&&(l=13,r=s,s=c="",_(),l=0):(c||(s=s.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))&&(p++&&(a+=","),a+=c||W(s)),s=c="";},h=0;h<e.length;h++){h>0&&(o||_(),c="$["+h+"]",_());for(var m=0;m<e[h].length;m++){if(n=e[h].charCodeAt(m),o){if(39===n||34===n){if(v===n){v=0;continue}if(0===v){v=n;continue}}if(0===v)switch(n){case 62:_(),47!==l&&(a+=u?","+u+f+d:",null"),t&&(a+=")"),o=0,u="",l=1;continue;case 61:l=13,i=!0,r=s,s="";continue;case 47:t||(t=!0,9!==l||s.trim()||(s=c="",l=47));continue;case 9:case 10:case 13:case 32:_(),l=0;continue}}else if(60===n){_(),o=1,d=f=u="",t=i=!1,l=9;continue}s+=e[h].charAt(m);}}return _(),Function("h","$",a)};function E(e,t){!function(e,t,n){C(n,e,{},!1,t,!1);}(e,t,t.firstElementChild);}var V=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+","+e[n];return (M[t]||(M[t]=A(e)))(this,arguments)}.bind(r);

let now = null;
const setup = [];

const $ = value => typeof value === typeof $ ? value() : value;

const stacked = id => runner => {
  const state = {i: 0, stack: []};
  runner[id] = state;
  runner.before.push(() => {
    state.i = 0;
  });
};

let id = 0;
const uid = () => '_$' + id++;

const unstacked = id => {
  const {[id]: state, update} = now;
  const {i, stack} = state;
  state.i++;
  return {i, stack, update, unknown: i === stack.length};
};

var augmentor = fn => {
  const current = runner($);
  each(setup, current);
  $.reset = () => {
    each(current.reset, current);
    for (const key in current) {
      if (/^_\$/.test(key))
        current[key].stack.splice(0);
    }
  };
  return $;
  function $() {
    const prev = now;
    now = current;
    const {_, before, after, external} = current;
    try {
      let result;
      do {
        _.$ = _._ = false;
        each(before, current);
        result = fn.apply(_.c = this, _.a = arguments);
        each(after, current);
        if (external.length)
          each(external.splice(0), result);
      } while (_._);
      return result;
    }
    finally {
      _.$ = true;
      now = prev;
    }
  }
};

const each = (arr, value) => {
  const {length} = arr;
  let i = 0;
  while (i < length)
    arr[i++](value);
};

const runner = $ => {
  const _ = {
    _: true,
    $: true,
    c: null,
    a: null
  };
  return {
    _: _,
    before: [],
    after: [],
    external: [],
    reset: [],
    update: () => _.$ ? $.apply(_.c, _.a) : (_._ = true)
  };
};

const id$1 = uid();

let cancel, request;

try {
  cancel = cancelAnimationFrame;
  request = requestAnimationFrame;
} catch (o_O) {
  cancel = clearTimeout;
  request = setTimeout;
}

const set = (info, clean) => {
  info.t = 0;
  info.clean = clean;
};

setup.push(runner => {
  const stack = [];
  const state = {i: 0, stack};
  runner[id$1] = state;
  const reset = () => {
    state.i = 0;
    for (let {length} = stack, i = 0; i < length; i++) {
      const {check, clean, raf, t} = stack[i];
      if (check) {
        if (raf && t)
          cancel(t);
        else if (clean)
          clean();
        set(stack[i], null);
      }
    }
  };
  runner.reset.push(reset);
  runner.before.push(reset);
  runner.after.push(() => {
    for (let {length} = stack, i = 0; i < length; i++) {
      const current$$1 = stack[i];
      const {fn, raf, update} = current$$1;
      if (update) {
        current$$1.update = false;
        if (raf)
          current$$1.t = request(fn);
        else
          fn();
      }
    }
  });
});

const id$2 = uid();

setup.push(stacked(id$2));

const id$3 = uid();

setup.push(stacked(id$3));

const id$4 = uid();

setup.push(stacked(id$4));

var useReducer = (reducer, value) => {
  const {i, stack, unknown, update} = unstacked(id$4);
  if (unknown) {
    const info = [null, action => {
      value = reducer(value, action);
      info[0] = value;
      update();
    }];
    stack.push(info);
    info[0] = $(value);
  }
  return stack[i];
};

var state = value => useReducer(
  (_, value) => value,
  value
);

const id$5 = uid();

setup.push(stacked(id$5));

function renderer(root, html) {
  root.innerHTML = html();
}

function isFunction(value) {
  return typeof value === 'function';
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function getNativeConstructor(ext) {
  return ext ? document.createElement(ext).constructor : HTMLElement;
}

function define(name, Element, options) {
  if (name) {
    self.customElements.define(name, Element, options);
  }
}

function findFreeTagName(name, suffix = null) {
  name = name || 's';
  const tag = suffix ? `${name}-${suffix}` : name;
  return isFreeTagName(tag) ? tag : findFreeTagName(tag, uniqueId());
}

function isFreeTagName(name) {
  return hasDash(name) && !self.customElements.get(name);
}

function hasDash(name) {
  return name && /.-./.test(name);
}

function camelCase(name) {
  return name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

const CustomEvent =
  (isFunction(self.CustomEvent) && self.CustomEvent) ||
  ((name, params = {}) => {
    var newEvent = document.createEvent('CustomEvent');
    newEvent.initCustomEvent(name, params.bubbles, params.cancelable, params);
    return newEvent;
  });

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @param {string} prefix The value to prefix the ID with.
 * @return {string} Returns the unique ID.
 * @example
 *
 *    uniqueId('contact_');
 *    // => 'contact_104'
 *
 *    uniqueId();
 *    // => '105'
 */
let idCounter = 0;
function uniqueId(prefix = '') {
  var id = ++idCounter;
  return `${prefix}${id}`;
}

function extend(Base, init) {
  function Class() {
    if (!(this instanceof Class)) {
      return new Class();
    }

    const supr = () => {
      return typeof Reflect !== 'undefined'
        ? Reflect.construct(Base, [], this.constructor)
        : Base.call(this);
    };

    return init.call(this, supr);
  }

  Class.prototype = Object.create(Base.prototype);
  Class.prototype.constructor = Class;

  return Class;
}

/**
 * Create a complete assign function with custom descriptors.
 * @param  {Object} options - The custom descriptor options.
 * @return {Function}
 */
function createCompleteAssign(options) {
  return (target, ...sources) => {
    sources.forEach(source => {
      for (const prop in source) {
        const descriptor = Object.getOwnPropertyDescriptor(source, prop);
        Object.defineProperty(target, prop, Object.assign(descriptor, options));
      }
    });
    return target;
  };
}

/**
 * Complete assign is used to copy the values of all enumerable own properties from one or more source objects to a target object, including getters and setters. It will return the target object. Properties are still allowed to be overridden.
 *
 * @param  {Object} target
 * @param  {...Object} sources
 * @return {Object} The target with assigned properties
 */
const completeAssign = createCompleteAssign({
  enumerable: false,
  configurable: true,
  writeable: false
});

const CONNECTED = 'connected';
const DISCONNECTED = 'dis' + CONNECTED;

function createFactory(supr, component) {

  function createElement(options, enhancer) {
    if (!isUndefined(enhancer)) {
      if (!isFunction(enhancer)) {
        throw new Error('Expected the enhancer to be a function.');
      }
      return enhancer(createElement)(options);
    }

    const el = supr();

    const update = augmentor(function() {
      const fragment = component.call(el, el);
      return el.render(fragment);
    });

    function render(fragment) {
      el.renderer(el.renderRoot, () => fragment);
      return fragment;
    }

    function connectedCallback() {
      update();
      el.dispatchEvent(new CustomEvent(CONNECTED));
    }

    function disconnectedCallback() {
      el.dispatchEvent(new CustomEvent(DISCONNECTED));
    }

    function attributeChangedCallback(name, oldValue, newValue) {
      if (el.shouldUpdate(oldValue, newValue)) {
        update();
      }
    }

    function shouldUpdate(oldValue, newValue) {
      return oldValue !== newValue;
    }

    return completeAssign(el, {
      render,
      renderer,
      connectedCallback,
      disconnectedCallback,
      attributeChangedCallback,
      shouldUpdate,
      get renderRoot() {
        return el.shadowRoot || el._shadowRoot || el;
      }
    });
  }

  return createElement;
}

const CALLBACK = 'Callback';
const CONNECTED_CALLBACK = 'connected' + CALLBACK;
const DISCONNECTED_CALLBACK = 'dis' + CONNECTED_CALLBACK;
const ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK;
const ADOPTED_CALLBACK = 'adopted' + CALLBACK;

/**
 * Defines a custom element in the `CustomElementRegistry` which renders the component which is passed as an argument.
 *
 * @param  {string} name The tag name for the custom element.
 * @param  {Function} component The component that is rendered in the element.
 * @param  {Function} [enhancer] The element enhancer. You may optionally specify it to enhance the element with third-party capabilities such as middleware, custom renderer, public API, etc. The only element enhancers that ship with Swiss Element are `applyMiddleware` and `renderer`.
 * @param  {Object} [options] An options object with 2 optional properties `observedAttributes` and `extends` (e.g. `extends: 'button'`).
 The options object is also passed to all the enhancers.
 *
 * @return {HTMLElement}
 */
function element(name, component, enhancer, options) {
  if (isFunction(name)) {
    options = enhancer;
    enhancer = component;
    component = name;
    name = undefined;
  }

  if (!isFunction(enhancer) && isUndefined(options)) {
    options = enhancer;
    enhancer = undefined;
  }

  options = options || {};
  name = options.name = findFreeTagName(name || options.name);

  const Native = getNativeConstructor(options && options.extends);
  const SwissElement = extend(Native, function(supr) {
    const opts = { ...options, component };
    return createFactory(supr, component)(opts, enhancer);
  });

  // Callbacks have to be on the prototype before construction.
  forwardCallbacks(SwissElement.prototype, [
    CONNECTED_CALLBACK,
    DISCONNECTED_CALLBACK,
    ATTRIBUTE_CHANGED_CALLBACK,
    ADOPTED_CALLBACK
  ]);

  SwissElement.observedAttributes = options.observedAttributes || [];
  addPropsToAttrs(SwissElement.prototype, SwissElement.observedAttributes);

  define(name, SwissElement, options);
  return SwissElement;
}

function forwardCallbacks(proto, callbacks) {
  callbacks.forEach(cb => {
    proto[cb] = function(...args) {
      if (this.hasOwnProperty(cb)) {
        this[cb](...args);
      }
    };
  });
}

function addPropsToAttrs(proto, attributes) {
  attributes.forEach(name => {
    // it is possible to redefine the behavior at any time
    // simply overwriting get prop() and set prop(value)
    if (!(name in proto)) {
      Object.defineProperty(proto, camelCase(name), {
        configurable: true,
        get() {
          return this.getAttribute(name);
        },
        set(value) {
          if (value == null) this.removeAttribute(name);
          else this.setAttribute(name, value);
        }
      });
    }
  });
}

/**
 * Adds a simple way to define your own renderer.
 * Verified libraries working by passing just the `render` function:
 *
 * - Lit-html
 * - Preact
 *
 * @param  {Function} customRenderer A function that takes the custom element root and a function `html` which once executed renders the created dom nodes to the root node of the custom element.
 *
 * @return {Function}
 */
function renderer$1(customRenderer = renderer) {
  return createElement => (...args) => {
    const element = createElement(...args);

    // Put the `html()` calls first, they're more likely to throw.
    const renderWays = [
      (root, html) => customRenderer(html(), root),
      (root, html) => customRenderer(root, html()),
      (root, html) => customRenderer(html, root),
      (root, html) => customRenderer(root, html)
    ];

    /**
     * Most library render functions look like 1 of 4 where the root and result
     * of the render is switched or whether the result is returned by an
     * additional function execution.
     *
     * This function is only called on the first render pass, after it's cached.
     *
     * @param  {HTMLElement} root
     * @param  {Node|Function} html
     * @param  {Number} i
     * @return {*}
     */
    function findRenderWay(root, html, i = 0) {
      element.renderer = renderWays[i];
      i += 1;

      let result;
      try {
        result = element.renderer(root, html, 0);
      } catch (err) {
        if (i <= 3) {
          return findRenderWay(root, html, i);
        }
      }

      return result || '';
    }

    element.renderer = findRenderWay;
    return element;
  };
}

function Counter() {
  const [count, setCount] = state(0);

  return V`
    <a href="#" onclick="${() => setCount(count + 1)}">
      Clicked ${count} times
    </a>
  `;
}

element('s-counter', Counter, renderer$1(E));
