export function isFunction(value) {
  return typeof value === 'function';
}

export function getNativeConstructor(ext) {
  return ext ? document.createElement(ext).constructor : HTMLElement;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @param {...Function} fns - The functions to compose.
 * @return {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
export function compose(...fns) {
  return x => fns.filter(Boolean).reduceRight((y, f) => f(y), x);
}

export function camelCase(name) {
  return name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

export function kebabCase(name) {
  return name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

export function hasDash(name) {
  return name && name.indexOf('-') !== -1;
}

/**
 * Create a complete assign function with custom descriptors.
 * @param  {Object} options - The custom descriptor options.
 * @return {Function}
 */
export function createCompleteAssign(options) {
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
export const completeAssign = createCompleteAssign({
  enumerable: false,
  configurable: true,
  writeable: false
});

export function CustomEvent(name, params = {}) {
  if ('CustomEvent' in self && isFunction(self.CustomEvent)) {
    return new self.CustomEvent(name, params);
  }

  var newEvent = document.createEvent('CustomEvent');
  newEvent.initCustomEvent(name, params.bubbles, params.cancelable, params);
  return newEvent;
}

export function extend(Base, init) {
  function Class(...args) {
    if (!(this instanceof Class)) {
      return new Class(...args);
    }
    this._super = (...args) => {
      return typeof Reflect !== 'undefined'
        ? Reflect.construct(Base, args, this.constructor)
        : Base.apply(this, args);
    };
    return init.apply(this, args);
  }

  Class.prototype = Object.create(Base.prototype);
  Class.prototype.constructor = Class;
  return Class;
}

export function define(name, Element, options) {
  if (name) {
    self.customElements.define(name, Element, options);
  }
}

export function findFreeTagName(name, suffix = null) {
  name = name || 's';
  const tag = kebabCase(suffix ? `${name}-${suffix}` : name);
  return isFreeTagName(tag) ? tag : findFreeTagName(tag, uniqueId());
}

export function isFreeTagName(name) {
  return hasDash(name) && !self.customElements.get(name);
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
