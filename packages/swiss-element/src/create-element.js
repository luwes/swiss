import augmentor from './augmentor.js';
import { CustomEvent, isFunction } from './utils.js';

export const CONNECTED = 'connected';
export const DISCONNECTED = 'disconnected';

export function createElement(options, enhancer) {
  if (typeof enhancer !== 'undefined') {
    if (!isFunction(enhancer)) {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createElement)(options);
  }

  const { el, component } = options;

  const update = augmentor(() => {
    const fragment = component.call(el, el);
    return el.render.call(el, fragment);
  });

  function render(fragment) {
    el.renderer(el.renderRoot, () => fragment);
    return fragment;
  }

  function renderer(root, html) {
    root.innerHTML = html();
  }

  function connectedCallback() {
    update.call(el);
    el.dispatchEvent(new CustomEvent(CONNECTED));
  }

  function disconnectedCallback() {
    el.dispatchEvent(new CustomEvent(DISCONNECTED));
  }

  function attributeChangedCallback(name, oldValue, newValue) {
    if (el.shouldUpdate(oldValue, newValue)) {
      update.call(el);
    }
  }

  function shouldUpdate(oldValue, newValue) {
    return oldValue !== newValue;
  }

  return {
    render,
    renderer,
    connectedCallback,
    disconnectedCallback,
    attributeChangedCallback,
    shouldUpdate,
    get renderRoot() {
      return el.shadowRoot || el._shadowRoot || el;
    }
  };
}
