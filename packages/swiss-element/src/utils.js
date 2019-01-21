export function isFunction(value) {
  return typeof value === 'function';
}

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function getNativeConstructor(ext) {
  return ext ? document.createElement(ext).constructor : HTMLElement;
}

export function define(name, Element, options) {
  if (name) {
    self.customElements.define(name, Element, options);
  }
}

export function findFreeTagName(name, suffix = null) {
  name = name || 's';
  const tag = suffix ? `${name}-${suffix}` : name;
  return isFreeTagName(tag) ? tag : findFreeTagName(tag, uniqueId());
}

export function isFreeTagName(name) {
  return hasDash(name) && !self.customElements.get(name);
}

export function hasDash(name) {
  return name && /.-./.test(name);
}

export function compose(...fns) {
  return x => fns.reduceRight((y, f) => f(y), x);
}

export function camelCase(name) {
  return name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

export function CustomEvent(name, params = {}) {
  if ('CustomEvent' in self && isFunction(self.CustomEvent)) {
    return new self.CustomEvent(name, params);
  }

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

export function extend(Base, init) {
  function Class() {
    this._super = () => {
      return typeof Reflect !== 'undefined'
        ? Reflect.construct(Base, [], this.constructor)
        : Base.call(this);
    };
    return init.call(this);
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
