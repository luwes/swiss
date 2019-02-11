export const isArray = Array.isArray;

export function isFunction(value) {
  return typeof value === 'function';
}

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function getNativeConstructor(ext) {
  return ext ? document.createElement(ext).constructor : HTMLElement;
}

export function compose(...fns) {
  return x => fns.filter(Boolean).reduceRight((y, f) => f(y), x);
}

export function camelCase(name) {
  return name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

export const CustomEvent =
  (isFunction(self.CustomEvent) && self.CustomEvent) || CustomEventPonyfill;

export function CustomEventPonyfill(name, params = {}) {
  var newEvent = document.createEvent('CustomEvent');
  newEvent.initCustomEvent(name, params.bubbles, params.cancelable, params);
  return newEvent;
}

export function extend(Base, init) {
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
  configurable: true
});
