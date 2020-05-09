import { property } from './property.js';
import { camelCase, kebabCase } from './utils.js';

export const propsElement = (CE, options) => {
  const { props = {} } = options;

  CE.propConfigs = {};
  CE.defineProp = defineProp;
  CE.observedAttributes = Object.keys(props).map(kebabCase);

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
    setProp(name, value);

    if (ignorePropChange) return;

    element.requestUpdate(name, oldValue);
  }

  function getProp(name) {
    if (propConfigs[name]) {
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
    let value = getProp(propName);
    if (value === undefined || !propConfigs[propName].reflect) return;

    if (value == null || value === false) {
      element.removeAttribute(kebabCase(propName));
    } else {
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
      // Boolean attributes are considered to be true if they're present on
      // the element at all, regardless of their actual value; as a rule,
      // you should specify the empty string ("") in value.
      if (isBooleanProp(propName)) value = '';

      // Convert arrays and objects.
      if (typeof value === 'object') {
        try {
          value = JSON.stringify(value);
        } catch (O_o) {
          // At least we tried.
        }
      }

      element.setAttribute(kebabCase(propName), '' + value);
    }
  }

  function isBooleanProp(propName) {
    return propConfigs[propName].value === false ||
      propConfigs[propName].value === true;
  }

  function attributeChanged(name, oldValue, value) {
    if (ignoreAttributeChange) {
      return;
    }
    if (oldValue !== value) {
      ignorePropChange = true;

      const propName = camelCase(name);
      element[propName] = attrToProp(propName, value);

      ignorePropChange = false;
    }
  }

  function attrToProp(propName, value) {
    const defaultPropValue = propConfigs[propName].value;
    if (defaultPropValue === false || defaultPropValue === true) {
      return value != null;
    } else if (value != null && typeof defaultPropValue === 'number') {
      return Number(value);
    }
    return value;
  }

  return {
    get: getProp,
    set,
    getProp,
    setProp,
    attributeChanged,
  };
}
