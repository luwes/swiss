import { append, isString } from '../utils.js';

function component(defaultComponent) {
  return createElement => options => {
    const el = createElement(options);
    const comp = defaultComponent || options.component;
    let oldHtml;

    if (options.shadow) {
      el.attachShadow({ mode: options.shadow });
    }

    function update() {
      const html = comp.call(el, el);
      el.render(html);
    }

    function render(html) {
      el.renderer(el.renderRoot(), html, oldHtml);
      oldHtml = html;
    }

    function renderer(root, html, old) {
      if (html !== old) {
        if (isString(html)) {
          root.innerHTML = html;
        } else {
          root.innerHTML = '';
          append(root, html);
        }
      }
    }

    function renderRoot() {
      return el.shadowRoot || el._shadowRoot || el;
    }

    function connectedCallback() {
      el.update();
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
      attributeChangedCallback,
      update,
      shouldUpdate
    });
  };
}

export default component;
