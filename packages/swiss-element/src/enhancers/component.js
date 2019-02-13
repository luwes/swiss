import { CustomEvent } from '../utils.js';

function component(createElement) {
  return options => {
    const el = createElement(options);
    let oldHtml;

    if (options.shadow) {
      el.attachShadow({ mode: options.shadow });
    }

    function update() {
      const html = options.component.call(el, el);
      el.render(html);
    }

    function render(html) {
      el.renderer(el.renderRoot(), html, oldHtml);
      oldHtml = html;
    }

    function renderer(root, html) {
      root.innerHTML = html;
    }

    function renderRoot() {
      return el.shadowRoot || el._shadowRoot || el;
    }

    function connectedCallback() {
      el.update();
      el.dispatchEvent(new CustomEvent('connected'));
    }

    function disconnectedCallback() {
      el.dispatchEvent(new CustomEvent('disconnected'));
    }

    function attributeChangedCallback(name, oldValue, newValue) {
      if (el.shouldUpdate(name, oldValue, newValue)) {
        el.update();
      }
    }

    function shouldUpdate(name, oldValue, newValue) {
      return oldValue !== newValue;
    }

    return Object.assign(el, {
      render,
      renderer,
      renderRoot,
      connectedCallback,
      disconnectedCallback,
      attributeChangedCallback,
      update,
      shouldUpdate
    });
  };
}

export default component;
