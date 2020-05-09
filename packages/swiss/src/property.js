
export function property(value, options) {
  const config = {
    value,
    toAttribute,
    fromAttribute,
    get: (host, val = config.value) => val,
    set: (host, val) => val,
    ...options,
  };
  return config;
}

export function toAttribute(val, config) {
  const defaultPropValue = config.value;
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
  // Boolean attributes are considered to be true if they're present on
  // the element at all, regardless of their actual value; as a rule,
  // you should specify the empty string ("") in value.
  if (defaultPropValue === false || defaultPropValue === true) val = '';

  return val;
}

export function fromAttribute(val, config) {
  const defaultPropValue = config.value;
  if (defaultPropValue === false || defaultPropValue === true) {
    return val != null;
  } else if (val != null && typeof defaultPropValue === 'number') {
    return Number(val);
  }
  return val;
}

export function readonly(props) {
  for (let prop in props) {
    props[prop] = property(props[prop], { set: undefined });
  }
  return props;
}

export function reflect(props) {
  for (let prop in props) {
    props[prop] = property(props[prop], { reflect: true });
  }
  return props;
}
