import { camelCase, extend } from '../utils.js';

function propsToAttrs() {
  return createElement => (options, props, b, c) => {
    const el = createElement(options, props, b, c);
    const proto = Object.getPrototypeOf(el);
    const properties = {};

    options.observedAttributes.forEach(name => {
      const propName = camelCase(name);
      if (!(propName in proto)) {
        // eslint-disable-next-line fp/no-mutating-methods
        Object.defineProperty(proto, propName, {
          configurable: true,
          enumerable: true,
          get() {
            // eslint-disable-next-line fp/no-this
            return properties[propName] || this.getAttribute(name);
          },
          set(value) {
            properties[propName] = value;

            if (value == null) {
              // eslint-disable-next-line fp/no-this
              this.removeAttribute(name);
            } else {
              // Convert arrays and objects.
              if (typeof value === 'object') {
                try {
                  value = JSON.stringify(value);
                } catch (O_o) {
                  // At least we tried.
                }
              }
              // eslint-disable-next-line fp/no-this
              this.setAttribute(name, value);
            }
          }
        });
      }
    });

    return extend(el, props);
  };
}

export default propsToAttrs;
