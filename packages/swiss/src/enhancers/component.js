import defaultRenderer from '../default-renderer.js';
import { isUndefined, extend } from '../utils.js';

function componentEnhancer(component) {
  return createElement => (options, a, b, c) => {
    const comp = component || options.component;

    const el = createElement(options, a, b, c);
    let oldHtml;

    if (options.shadow) {
      el.attachShadow({ mode: options.shadow });
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

    function update(props) {
      if (props) extend(el, props);

      // If `renderer` is defined, the generated html is passed to `render`.
      // This is for elements that don't mutate the element in the component.
      el.render(el.renderer && comp.call(el, el));
    }

    function render(html) {
      if (isUndefined(html)) {
        // By default the html is generated in the `render` function.
        // This is for components that mutate the element in the component.
        html = comp.call(el, el);
      }

      const renderer = el.renderer || defaultRenderer;
      renderer(el.renderRoot(), html, oldHtml);
      oldHtml = html;
    }

    function renderRoot() {
      return el.shadowRoot || el._shadowRoot || el;
    }

    return extend(el, {
      connectedCallback,
      attributeChangedCallback,
      shouldUpdate,
      update,
      render,
      renderRoot
    });
  };
}

export default componentEnhancer;
