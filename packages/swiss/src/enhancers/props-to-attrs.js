import { camelCase } from '../utils.js';

function propsToAttrs() {
  return createElement => options => {
    const el = createElement(options);
    const proto = Object.getPrototypeOf(el);
    const props = {};

    options.observedAttributes.forEach(name => {
      const propName = camelCase(name);
      if (!(propName in proto)) {
        // eslint-disable-next-line fp/no-mutating-methods
        Object.defineProperty(proto, propName, {
          configurable: true,
          get() {
            return props[propName];
          },
          set(value) {
            props[propName] = value;

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
