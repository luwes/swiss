import { camelCase } from '../utils.js';

function propsToAttrs(createElement) {
  return options => {
    const el = createElement(options);
    addPropsToAttrs(Object.getPrototypeOf(el), options.observedAttributes);
    return el;
  };
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

export default propsToAttrs;
