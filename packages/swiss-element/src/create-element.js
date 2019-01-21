import augmentor from './augmentor.js';
import renderer from './default-renderer.js';
import {
  completeAssign,
  CustomEvent,
  isFunction,
  isUndefined
} from './utils.js';

export const CONNECTED = 'connected';
export const DISCONNECTED = 'dis' + CONNECTED;

export function createFactory(supr, component) {

  function createElement(options, enhancer) {
    if (!isUndefined(enhancer)) {
      if (!isFunction(enhancer)) {
        throw new Error('Expected the enhancer to be a function.');
      }
      return enhancer(createElement)(options);
    }

    const el = supr();

    const update = augmentor(function() {
      const fragment = component.call(el, el);
      return el.render(fragment);
    });

    function render(fragment) {
      el.renderer(el.renderRoot, () => fragment);
      return fragment;
    }

    function connectedCallback() {
      update();
      el.dispatchEvent(new CustomEvent(CONNECTED));
    }

    function disconnectedCallback() {
      el.dispatchEvent(new CustomEvent(DISCONNECTED));
    }

    function attributeChangedCallback(name, oldValue, newValue) {
      if (el.shouldUpdate(oldValue, newValue)) {
        update();
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
      shouldUpdate,
      get renderRoot() {
        return el.shadowRoot || el._shadowRoot || el;
      }
    });
  }

  return createElement;
}
