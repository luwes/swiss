
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
export const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

export const camel = name => name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());

/**
 * Create a complete assign function with custom descriptors.
 * @param  {Object} options - The custom descriptor options.
 * @return {Function}
 */
export function createCompleteAssign(options) {
    return (target, ...sources) => {
        sources.forEach((source) => {
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
  if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
    return new window.CustomEvent(name, params);
  } else {
    var newEvent = document.createEvent('CustomEvent');
    newEvent.initCustomEvent(name, params.bubbles, params.cancelable, params);
    return newEvent;
  }
}
