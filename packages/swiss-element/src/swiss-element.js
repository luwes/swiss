import component from './enhancers/component.js';
import propsToAttrs from './enhancers/props-to-attrs.js';
import { element as core } from './core.js';
import { compose, isArray, isFunction, isUndefined } from './utils.js';

/**
 * Quick and dirty way to add default enhancers and options.
 * @type {Object}
 * @ignore
 */
export const defaults = {
  enhancers: [propsToAttrs(), component()]
};

/**
 * Defines a custom element in the `CustomElementRegistry` which renders the component which is passed as an argument.
 *
 * @param {string} name - The tag name for the custom element.
 * @param {Function} comp - The component that is rendered in the element.
 * @param {Function} [enhancer] - The element enhancer. You may optionally specify it to enhance the element with third-party capabilities such as middleware, custom renderer, public API, etc. The only element enhancers that ship with Swiss Element are `applyMiddleware` and `renderer`.
 * @param {Object|Array} [options] - Options object or `observedAttributes` only array for shorter syntax.
 * @param {Array} [options.observedAttributes] - Attributes to observe for adding, removing or changing which will trigger a component update if needed.
 * @param {string} [options.extends] - Specifies the built-in element your element inherits from if any (e.g. `extends: 'button'`).
 * @param {('open'|'closed')} [options.shadow] - Defines the shadow root mode, by default no shadow root is created and everything is rendered straight on the custom element.
 *
 * The options object is also passed to all the enhancers.
 *
 * @return {HTMLElement}
 */
export function element(name, component, enhancer, options) {
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

  options = Object.assign({ component }, defaults.options, options);
  enhancer = compose(
    enhancer,
    ...defaults.enhancers
  );

  return core(name, enhancer, options);
}

export { component, propsToAttrs };
