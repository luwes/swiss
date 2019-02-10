import { createFactory } from './create-element.js';
import {
  completeAssign,
  compose,
  findFreeTagName,
  extend,
  getNativeConstructor,
  isArray,
  isFunction,
  isUndefined
} from './utils.js';

export const defaultEnhancers = [];

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
export function element(name, component, enhancer, options) {
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

  if (!isUndefined(enhancer) && !isFunction(enhancer)) {
    throw new Error('Expected the enhancer to be a function.');
  }

  // To shorten syntax if options is an array assume it's `observedAttributes`.
  if (isArray(options)) {
    options = { observedAttributes: options };
  }

  options = options || {};
  enhancer = compose(
    enhancer,
    ...defaultEnhancers
  );

  const Native = getNativeConstructor(options && options.extends);
  const SwissElement = extend(Native, function(supr) {
    const opts = completeAssign({}, options, { component });
    return createFactory(supr)(opts, enhancer);
  });

  // Callbacks have to be on the prototype before construction.
  forwardCallbacks(SwissElement.prototype, [
    'connectedCallback',
    'disconnectedCallback',
    'attributeChangedCallback',
    'adoptedCallback'
  ]);

  // `observedAttributes` have to be on the Class before construction.
  const oa = options.observedAttributes || [];
  options.observedAttributes = oa;
  SwissElement.observedAttributes = oa;

  name = options.name = findFreeTagName(name || options.name);
  self.customElements.define(name, SwissElement, options);

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
