
export function property(value, options) {
  return {
    value,
    get: (host, val = value) => val,
    set: (host, val) => val,
    ...options,
  };
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
