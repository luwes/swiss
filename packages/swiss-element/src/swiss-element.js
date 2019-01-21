import { createElement } from './create-element.js';
import {
  camelCase,
  define,
  findFreeTagName,
  completeAssign,
  extend,
  getNativeConstructor,
  isFunction,
  isUndefined
} from './utils.js';

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

  options = options || {};
  name = options.name = findFreeTagName(name || options.name);

  const Native = getNativeConstructor(options && options.extends);
  const SwissElement = extend(Native, function() {
    const el = this._super();
    const opts = { ...options, component, el };
    const api = createElement(opts, enhancer);
    return completeAssign(el, api);
  });

  // Callbacks have to be on the prototype before construction.
  forwardCallbacks(SwissElement.prototype, [
    'connectedCallback',
    'disconnectedCallback',
    'attributeChangedCallback',
    'adoptedCallback'
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
