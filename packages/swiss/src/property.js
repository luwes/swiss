
export function property(value, options) {
  return {
    value,
    get: (host, val = value) => val,
    set: (host, val) => val,
    ...options,
  };
}
