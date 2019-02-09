import renderer from './default-renderer.js';
import { completeAssign, CustomEvent, isUndefined } from './utils.js';

const CONNECTED = 'connected';
const DISCONNECTED = 'dis' + CONNECTED;

export function createFactory(supr, component) {
  function createElement(options, enhancer) {
    if (!isUndefined(enhancer)) {
      return enhancer(createElement)(options);
    }

    const el = supr();
    let oldHtml;

    if (options.shadow) {
      el.attachShadow({ mode: options.shadow });
    }

    function requestUpdate() {
      const html = component.call(el, el);
      return el.render(html);
    }

    function render(html) {
      el.renderer(el.renderRoot, html, oldHtml);
      oldHtml = html;
      return html;
    }

    function connectedCallback() {
      el.requestUpdate();
      el.dispatchEvent(new CustomEvent(CONNECTED));
    }

    function disconnectedCallback() {
      el.dispatchEvent(new CustomEvent(DISCONNECTED));
    }

    function attributeChangedCallback(name, oldValue, newValue) {
      if (el.shouldUpdate(name, oldValue, newValue)) {
        el.requestUpdate();
      }
    }

    function shouldUpdate(name, oldValue, newValue) {
      return oldValue !== newValue;
    }

    return completeAssign(el, {
      render,
      renderer,
      connectedCallback,
      disconnectedCallback,
      attributeChangedCallback,
      requestUpdate,
      shouldUpdate,
      get renderRoot() {
        return el.shadowRoot || el._shadowRoot || el;
      }
    });
  }

  return createElement;
}
