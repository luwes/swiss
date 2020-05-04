import { camelCase, kebabCase } from './utils.js';

export function updatingElement({ propConfigs }, element) {
  const cache = {};
  let changedProps = {};
  let reflectingProps;
  let updatePromise = Promise.resolve();
  let hasRequestedUpdate;
  let ignoreAttributeChange;
  let ignorePropChange;

  function getProp(name) {
    return cache[name];
  }

  function setProp(name, value) {
    const oldValue = cache[name];
    cache[name] = value;
    requestUpdate(name, oldValue);
  }

  function requestUpdate(name, oldValue) {
    let shouldRequestUpdate = true;
    if (name) {
      if (cache[name] == oldValue) {
        shouldRequestUpdate = false;
      } else {
        changedProps[name] = oldValue;

        if (!ignorePropChange && propConfigs[name].reflect) {
          if (!reflectingProps) reflectingProps = {};
          reflectingProps[name] = true;
        }
      }
    }

    if (!hasRequestedUpdate && shouldRequestUpdate) {
      hasRequestedUpdate = true;
      updatePromise = enqueueUpdate();
    }
  }

  async function enqueueUpdate() {
    await updatePromise;
    performUpdate();
  }

  function performUpdate() {
    update();
    element.update(changedProps);
    markUpdated();
  }

  function update() {
    if (reflectingProps) {
      ignoreAttributeChange = true;

      Object.keys(reflectingProps).forEach(propToAttr);
      reflectingProps = undefined;

      ignoreAttributeChange = false;
    }
  }

  function markUpdated() {
    changedProps = {};
    hasRequestedUpdate = false;
  }

  function propToAttr(propName) {
    let value = cache[propName];
    if (value === undefined || !propConfigs[propName].reflect) return;

    if (value == null || value === false) {
      element.removeAttribute(kebabCase(propName));
    } else {
      if (isBooleanProp(propName)) value = '';
      element.setAttribute(kebabCase(propName), '' + value);
    }
  }

  function isBooleanProp(propName) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    // Boolean attributes are considered to be true if they're present on
    // the element at all, regardless of their actual value; as a rule,
    // you should specify the empty string ("") in value.
    return propConfigs[propName].value === false ||
      propConfigs[propName].value === true;
  }

  function refresh(name, value) {
    ignoreAttributeChange = true;

    cache[name] = value;
    propToAttr(name);

    ignoreAttributeChange = false;
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
    get propsDefaulted() {
      const obj = {};
      for (let name in propConfigs) {
        let value = cache[name];
        obj[name] = value == null ? propConfigs[name].value : value;
      }
      return obj;
    },

    getProp,
    setProp,
    attributeChanged,
    cache,
    props: cache,
    refresh,
  };
}
