import { completeAssign, CustomEvent } from '../utils.js';

const CONNECTED = 'connected';
const DISCONNECTED = 'dis' + CONNECTED;

function component(createElement) {
  return options => {
    const el = createElement(options);
    let oldHtml;

    if (options.shadow) {
      el.attachShadow({ mode: options.shadow });
    }

    function update() {
      const html = options.component.call(el, el);
      return el.render(html);
    }

    function render(html) {
      el.renderer(el.renderRoot, html, oldHtml);
      oldHtml = html;
      return html;
    }

    function renderer(root, html) {
      root.innerHTML = html;
    }

    function connectedCallback() {
      el.update();
      el.dispatchEvent(new CustomEvent(CONNECTED));
    }

    function disconnectedCallback() {
      el.dispatchEvent(new CustomEvent(DISCONNECTED));
    }

    function attributeChangedCallback(name, oldValue, newValue) {
      if (el.shouldUpdate(name, oldValue, newValue)) {
        el.update();
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
      update,
      shouldUpdate,
      get renderRoot() {
        return el.shadowRoot || el._shadowRoot || el;
      }
    });
  };
}

export default component;
