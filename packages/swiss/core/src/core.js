import { extend, getNativeConstructor } from './utils.js';

/**
 * Defines a custom element in the `CustomElementRegistry` which renders the component which is passed as an argument.
 *
 * @param {string} name - The tag name for the custom element.
 * @param {Function} [enhancer] - The element enhancer. You may optionally specify it to enhance the element with third-party capabilities such as middleware, custom renderer, public API, etc. The only element enhancers that ship with Swiss Element are `applyMiddleware` and `renderer`.
 * @param {Object|Array} [options] - Options object.
 * @param {Array} [options.observedAttributes] - Attributes to observe for adding, removing or changing which will trigger a component update if needed.
 * @param {string} [options.extends] - Specifies the built-in element your element inherits from if any (e.g. `extends: 'button'`).
 *
 * The options object is also passed to all the enhancers.
 *
 * @return {HTMLElement}
 */
export function element(name, enhancer, options) {
  const Native = getNativeConstructor(options.extends);
  const SwissElement = extend(Native, function(supr, props) {
    function createElement(opt, enh) {
      if (typeof enh !== 'undefined') {
        return enhancer(createElement)(opt);
      }
      return Object.assign(supr(), props);
    }
    const opts = Object.assign({}, options);
    return createElement(opts, enhancer);
  });

  // Callbacks have to be on the prototype before construction.
  forwardCallbacks(SwissElement.prototype, [
    'connected',
    'disconnected',
    'attributeChanged',
    'adopted'
  ]);

  // `observedAttributes` have to be on the Class before construction.
  const oa = options.observedAttributes || [];
  options.observedAttributes = oa;
  SwissElement.observedAttributes = oa;
  SwissElement.toString = () => name;

  customElements.define(name, SwissElement, options);

  return SwissElement;
}

function forwardCallbacks(proto, callbacks) {
  callbacks.forEach(name => {
    const cb = name + 'Callback';
    let dispatching;
    proto[cb] = function(...args) {
      if (dispatching) return;

      // eslint-disable-next-line fp/no-this
      const el = this;
      dispatching = true;
      el[cb](...args);
      dispatching = false;
    };
  });
}
