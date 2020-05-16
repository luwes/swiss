import { property, toAttribute, fromAttribute } from './property.js';
import { camelCase, kebabCase } from './utils.js';

export const propsElement = (CE, { props = {} }) => {
  CE.propConfigs = {};
  CE.defineProp = defineProp;

  Object.keys(props)
    .forEach((key) => CE.defineProp(key, props[key]));

  return setup;
};

function defineProp(key, config) {
  const type = typeof config;
  if (type !== 'object' || config === null || Array.isArray(config)) {
    config = property(config);
  }

  this.propConfigs[key] = config;

  const descriptor = {
    get() {
      return this.getProp(key);
    },
    set: config.set && function(value) {
      this.set(key, value);
    },
    enumerable: true,
    configurable: true,
  };

  Object.defineProperty(this.prototype, key, descriptor);
}

function setup(element) {
  const { propConfigs } = element.constructor;
  const cache = {};

  let ignoreAttributeChange;
  let ignorePropChange;

  element.getProp = getProp;
  Object.keys(propConfigs).forEach(updateAttr);


  function set(name, value) {
    const oldValue = getProp(name);
    element.setProp(name, value);

    return element.requestUpdate(name, oldValue);
  }

  function getProp(name) {
    if (propConfigs[name] && propConfigs[name].get) {
      return propConfigs[name].get(element, cache[name]);
    }
    return cache[name];
  }

  function setProp(name, value) {
    // Read-only props don't have a config.set but
    // should still be update-able by setProp.
    if (propConfigs[name] && propConfigs[name].set) {
      value = propConfigs[name].set(element, value, cache[name]);
    }

    cache[name] = value;

    if (ignorePropChange) return;
    updateAttr(name);
  }

  function updateAttr(name) {
    ignoreAttributeChange = true;
    propToAttr(name);
    ignoreAttributeChange = false;
  }

  function propToAttr(propName) {
    const config = propConfigs[propName];
    let value = getProp(propName);

    if (value === undefined || !config.reflect) return;

    if (value == null || value === false) {
      element.removeAttribute(kebabCase(propName));
    } else {
      value = (config.toAttribute || toAttribute)(value, config);
      element.setAttribute(kebabCase(propName), '' + value);
    }
  }

  function attributeChanged(name, oldValue, value) {
    if (ignoreAttributeChange) {
      return;
    }

    if (oldValue !== value) {
      ignorePropChange = true;

      const propName = camelCase(name);
      const config = propConfigs[propName];
      element[propName] = (config.fromAttribute || fromAttribute)(value, config);

      ignorePropChange = false;
    }
  }

  return {
    get: getProp,
    set,
    getProp,
    setProp,
    attributeChanged,
  };
}
