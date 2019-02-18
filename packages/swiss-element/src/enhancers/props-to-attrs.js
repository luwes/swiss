import { camelCase } from '../utils.js';

function propsToAttrs() {
  return createElement => options => {
    const el = createElement(options);
    const proto = Object.getPrototypeOf(el);

    options.observedAttributes.forEach(name => {
      // it is possible to redefine the behavior at any time
      // simply overwriting get prop() and set prop(value)
      if (!(name in proto)) {
        // eslint-disable-next-line fp/no-mutating-methods
        Object.defineProperty(proto, camelCase(name), {
          configurable: true,
          get() {
            return el.getAttribute(name);
          },
          set(value) {
            if (value == null) el.removeAttribute(name);
            else el.setAttribute(name, value);
          }
        });
      }
    });

    return el;
  };
}

export default propsToAttrs;
