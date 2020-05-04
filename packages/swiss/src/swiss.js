import { property } from './property.js';
import { updatingElement } from './updating-element.js';
import {
  customElement,
  getNativeConstructor,
  kebabCase,
  completeAssign,
} from './utils.js';

function define(name, options) {
  const { props, readonly, reflect, setup } = options;
  const descriptors = completeAssign(props, reflect, readonly);
  const configs = {};

  const CE = customElement(getNativeConstructor(options.extends), (element) => {
    completeAssign(element, updatingElement(CE, element));
    completeAssign(element, setup && setup(element));
  });

  Object.keys(descriptors)
    .forEach((key) => defineProp(key, descriptors[key]));

  function defineProp(key, config) {
    const type = typeof desc;
    if (type !== 'object' || config === null || Array.isArray(config)) {
      config = property(config);
    }

    if (!('reflect' in config)) config.reflect = reflect && key in reflect;
    if (!('readonly' in config)) config.readonly = readonly && key in readonly;

    configs[key] = config;

    Object.defineProperty(CE.prototype, key, {
      get: function get() {
        return config.get(this, this.getProp(key));
      },
      set:
        config.set &&
        function set(value) {
          const newValue = config.set(this, value, this[key]);
          this.setProp(key, newValue);
        },
      enumerable: true,
      configurable: true,
    });
  }

  CE.propConfigs = configs;
  CE.defineProp = CE.prototype.defineProp = defineProp;
  CE.observedAttributes = Object.keys(descriptors).map(kebabCase);

  Promise.resolve().then(() => customElements.define(name, CE));

  return CE;
}

export { define };
