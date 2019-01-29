import { createFactory } from './create-element.js';
import hooks from './enhancers/hooks/enhancer.js';
import propsToAttrs from './enhancers/props-to-attrs.js';
import {
  completeAssign,
  compose,
  define,
  findFreeTagName,
  extend,
  getNativeConstructor,
  isArray,
  isFunction,
  isUndefined
} from './utils.js';

const CALLBACK = 'Callback';
const CONNECTED_CALLBACK = 'connected' + CALLBACK;
const DISCONNECTED_CALLBACK = 'dis' + CONNECTED_CALLBACK;
const ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK;
const ADOPTED_CALLBACK = 'adopted' + CALLBACK;
const OBSERVED_ATTRIBUTES = 'observedAttributes';

// The `hooks` and `propsToAttrs` enhancers are added by default.
export const defaultEnhancers = [hooks, propsToAttrs];

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

  // To shorten syntax if options is an array assume it's `observedAttributes`.
  if (isArray(options)) {
    options = { [OBSERVED_ATTRIBUTES]: options };
  }

  options = options || {};
  name = options.name = findFreeTagName(name || options.name);

  if (!isUndefined(enhancer) && !isFunction(enhancer)) {
    throw new Error('Expected the enhancer to be a function.');
  }

  enhancer = compose(enhancer, ...defaultEnhancers);

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
