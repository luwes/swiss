function renderer(root, html) {
  root.innerHTML = html;
}

const isArray = Array.isArray;

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

function compose(...fns) {
  return x => fns.filter(Boolean).reduceRight((y, f) => f(y), x);
}

function camelCase(name) {
  return name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

const CustomEvent =
  (isFunction(self.CustomEvent) && self.CustomEvent) || CustomEventPonyfill;

function CustomEventPonyfill(name, params = {}) {
  var newEvent = document.createEvent('CustomEvent');
  newEvent.initCustomEvent(name, params.bubbles, params.cancelable, params);
  return newEvent;
}

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
      return enhancer(createElement)(options);
    }

    const el = supr();
    let oldHtml;

    function requestUpdate() {
      const html = component.call(el, el);
      return el.render(html);
    }

    function render(html) {
      el.renderer(el.renderRoot, html, oldHtml);
      oldHtml = html;
      return html;
    }

    function connectedCallback() {
      el.requestUpdate();
      el.dispatchEvent(new CustomEvent(CONNECTED));
    }

    function disconnectedCallback() {
      el.dispatchEvent(new CustomEvent(DISCONNECTED));
    }

    function attributeChangedCallback(name, oldValue, newValue) {
      if (el.shouldUpdate(oldValue, newValue)) {
        el.requestUpdate();
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
      requestUpdate,
      shouldUpdate,
      get renderRoot() {
        return el.shadowRoot || el._shadowRoot || el;
      }
    });
  }

  return createElement;
}

let now = null;
const current = () => now;

const empty = [];
const setup = [];

const $ = value => typeof value === typeof $ ? value() : value;

const diff = (a, b) => (a.length !== b.length || a.some(diverse, b));

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

function diverse(value, i) {
  return value !== this[i];
}

const id$1 = uid();

let cancel, request;

try {
  cancel = cancelAnimationFrame;
  request = requestAnimationFrame;
} catch (o_O) {
  cancel = clearTimeout;
  request = setTimeout;
}

const create = (always, check, inputs, raf, cb, stack, i) => {
  const info = {
    always,
    cb,
    check,
    clean: null,
    inputs,
    raf,
    t: 0,
    update: check,
    fn: () => {
      set(stack[i], info.cb());
    }
  };
  return info;
};

const effect = raf => (cb, refs) => {
  const {i, stack, unknown} = unstacked(id$1);
  const comp = refs || empty;
  if (unknown) {
    const always = comp === empty;
    const check = always || !raf || typeof comp !== typeof effect;
    if (always || !raf || typeof comp !== typeof effect) {
      stack.push(create(always, check, comp, raf, cb, stack, i));
    } else {
      current().external.push(result => refs(cb, result));
      stack.push(create(always, always, empty, raf, effect, stack, i));
    }
  } else {
    const info = stack[i];
    const {check, always, inputs} = info;
    if (check && (always || diff(inputs, comp))) {
      info.cb = cb;
      info.inputs = comp;
      info.update = true;
    }
  }
};

const set = (info, clean) => {
  info.t = 0;
  info.clean = clean;
};

setup.push(runner => {
  const stack = [];
  const state = {i: 0, stack};
  const drop = (current$$1, clean, raf, t) => {
    if (raf && t)
      cancel(t);
    else if (clean)
      clean();
    set(current$$1, null);
  };
  runner[id$1] = state;
  runner.before.push(() => {
    state.i = 0;
  });
  runner.reset.push(() => {
    state.i = 0;
    for (let {length} = stack, i = 0; i < length; i++) {
      const current$$1 = stack[i];
      const {check, clean, raf, t} = current$$1;
      if (check)
        drop(current$$1, clean, raf, t);
    }
  });
  runner.after.push(() => {
    for (let {length} = stack, i = 0; i < length; i++) {
      const current$$1 = stack[i];
      const {check, clean, fn, raf, t, update} = current$$1;
      if (check && update) {
        current$$1.update = false;
        drop(current$$1, clean, raf, t);
        if (raf)
          current$$1.t = request(fn);
        else
          fn();
      }
    }
  });
});

const useEffect = effect(true);

const id$2 = uid();

setup.push(stacked(id$2));

var ref = value => {
  const {i, stack, unknown} = unstacked(id$2);
  if (unknown) {
    const info = {current: null};
    stack.push(info);
    info.current = $(value);
  }
  return stack[i];
};

const id$3 = uid();

setup.push(stacked(id$3));

var useMemo = (callback, refs) => {
  const {i, stack, unknown} = unstacked(id$3);
  const comp = refs || empty;
  if (unknown)
    create$1(stack, -1, callback, comp);
  const {filter, value, fn, inputs} = stack[i];
  return (filter ? diff(inputs, comp) : (callback !== fn)) ?
          create$1(stack, i, callback, comp) :
          value;
};

const create$1 = (stack, i, fn, inputs) => {
  const info = {
    filter: inputs !== empty,
    value: null,
    fn,
    inputs
  };
  if (i < 0)
    stack.push(info);
  else
    stack[i] = info;
  info.value = fn();
  return info.value;
};

var callback = (fn, inputs) => useMemo(() => fn, inputs);

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

const all = new WeakMap;
const id$5 = uid();

setup.push(stacked(id$5));

const createContext = value => {
  const context = {
    value,
    provide
  };
  all.set(context, []);
  return context;
};

const useContext = context => {
  const {i, stack, unknown, update} = unstacked(id$5);
  if (unknown) {
    all.get(context).push(update);
    stack.push(context);
  }
  return stack[i].value;
};

function provide(value) {
  if (this.value !== value) {
    this.value = value;
    for (let arr = all.get(this), {length} = arr, i = 0; i < length; i++)
      arr[i]();
  }
}

/**
 * Holds the current element that is being rendered.
 * @type {Object}
 */
const CurrentElement = {
  current: null
};

function hooks(createElement) {
  return options => {
    const el = createElement(options);
    const { component } = options;

    const requestUpdate = augmentor(function() {
      CurrentElement.current = el;
      const html = component.call(el, el);
      return el.render(html);
    });

    el.requestUpdate = requestUpdate;
    return el;
  };
}

function propsToAttrs(createElement) {
  return options => {
    const el = createElement(options);
    const { observedAttributes } = options;
    addPropsToAttrs(Object.getPrototypeOf(el), observedAttributes);
    return el;
  };
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

const CALLBACK = 'Callback';
const CONNECTED_CALLBACK = 'connected' + CALLBACK;
const DISCONNECTED_CALLBACK = 'dis' + CONNECTED_CALLBACK;
const ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK;
const ADOPTED_CALLBACK = 'adopted' + CALLBACK;
const OBSERVED_ATTRIBUTES = 'observedAttributes';

/**
 * Defines a custom element in the `CustomElementRegistry` which renders the component which is passed as an argument.
 *
 * @param  {string} name The tag name for the custom element.
 * @param  {Function} component The component that is rendered in the element.
 * @param  {Function} [enhancer] The element enhancer. You may optionally specify it to enhance the element with third-party capabilities such as middleware, custom renderer, public API, etc. The only element enhancers that ship with Swiss Element are `applyMiddleware` and `renderer`.
 * @param  {Object|Array} [options] An options object with 2 optional properties `observedAttributes` and `extends` (e.g. `extends: 'button'`). You can also just pass an array which will be the `observedAttributes` array for shorter syntax.
 *
 * The options object is also passed to all the enhancers.
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

  // To shorten syntax if options is an array assume it's `observedAttributes`.
  if (isArray(options)) {
    options = { [OBSERVED_ATTRIBUTES]: options };
  }

  options = options || {};
  name = options.name = findFreeTagName(name || options.name);

  if (!isUndefined(enhancer) && !isFunction(enhancer)) {
    throw new Error('Expected the enhancer to be a function.');
  }

  // The `hooks` and `propsToAttrs` enhancers are added by default.
  enhancer = compose(
    enhancer,
    hooks,
    propsToAttrs
  );

  const Native = getNativeConstructor(options && options.extends);
  const SwissElement = extend(Native, function(supr) {
    const opts = completeAssign({}, options, { component });
    return createFactory(supr, component)(opts, enhancer);
  });

  // Callbacks have to be on the prototype before construction.
  forwardCallbacks(SwissElement.prototype, [
    CONNECTED_CALLBACK,
    DISCONNECTED_CALLBACK,
    ATTRIBUTE_CHANGED_CALLBACK,
    ADOPTED_CALLBACK
  ]);

  const oa = (options[OBSERVED_ATTRIBUTES] =
    options[OBSERVED_ATTRIBUTES] || []);
  SwissElement[OBSERVED_ATTRIBUTES] = oa;

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

function useEffect$1(fn, inputs = []) {
  const args = [fn];
  if (inputs)
    // if the inputs is an empty array
    // observe the returned element for connect/disconnect events
    // and invoke effects/cleanup on these events only
    args.push(inputs.length ? inputs : lifecycleHandler);
  return useEffect.apply(null, args);
}

function lifecycleHandler($) {
  const handler = { handleEvent, onconnected, ondisconnected, $, _: null };
  CurrentElement.current.addEventListener(CONNECTED, handler, false);
  CurrentElement.current.addEventListener(DISCONNECTED, handler, false);
}

function handleEvent(e) {
  this['on' + e.type]();
}

function onconnected() {
  ondisconnected.call(this);
  this._ = this.$();
}

function ondisconnected() {
  const { _ } = this;
  this._ = null;
  if (_) _();
}

function useElement() {
  return CurrentElement.current;
}

/**
 * Adds a simple way to define your own renderer.
 * Verified libraries working by passing just the `render` or `patch` function:
 *
 * - Lighterhtml
 * - Lit-html
 * - HTM-Preact
 * - Superfine
 *
 * @param  {Function} customRenderer A function that takes the custom element root and a function `html` which once executed renders the created dom nodes to the root node of the custom element.
 *
 * @return {Function}
 */
function renderer$1(customRenderer = renderer) {
  return createElement => (...args) => {
    const element = createElement(...args);

    const renderWays = [
      // default
      (root, html, old) => customRenderer(root, html, old),
      // lit-html, htm-preact
      (root, html, old) => customRenderer(html, root, old),
      // superfine
      (root, html, old) => customRenderer(old, html, root),
      // lighterhtml
      (root, html, old) => customRenderer(root, () => html, old)
    ];

    /**
     * Most library render functions look very similar, do a quick search on the
     * first render. Probably shouldn't do this but it's so damn convenient :P
     *
     * This function is only called on the first render pass, after it's cached.
     *
     * @param  {HTMLElement} root
     * @param  {Node|Function} html
     * @param  {Number} i
     * @return {*}
     */
    function findRenderWay(root, html, old, i = 0) {
      element.renderer = renderWays[i];

      let result;
      try {
        result = element.renderer(root, html, old);
      } catch (err) {
        i += 1;
        if (i < renderWays.length) {
          return findRenderWay(root, html, old, i);
        }
      }

      return result || '';
    }

    element.renderer = findRenderWay;
    return element;
  };
}

/**
 * Middleware is the suggested way to extend Swiss Element with custom functionality. Middleware lets you wrap the element's render method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.
 *
 * @param  {...Function} middleware Functions that conform to the Swiss Element _middleware_ API. Each middleware receives `SwissElement`'s `render` function as a named argument, and returns a function. That function will be given the `next` middleware's render method, and is expected to return a function of `fragment` calling `next(fragment)` with a potentially different argument, or at a different time, or maybe not calling it at all. The last middleware in the chain will receive the real element's `render` method as the `next` parameter, thus ending the chain. So, the middleware signature is `({ render }) => next => fragment`.
 *
 * @return {Function}
 */
function applyMiddleware(...middleware) {
  return createElement => (...args) => {
    const element = createElement(...args);

    let render = () => {
      throw new Error(
        `Rendering while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this render.`
      );
    };

    const middlewareAPI = {
      render: (...args) => render(...args)
    };

    const chain = middleware.map(mw => mw(middlewareAPI));
    render = compose(...chain)(element.render.bind(element));

    element.render = render;
    return element;
  };
}

export { renderer$1 as renderer, applyMiddleware, compose, element, callback as useCallback, useMemo, useReducer, ref as useRef, state as useState, createContext, useContext, useEffect$1 as useEffect, useElement };
