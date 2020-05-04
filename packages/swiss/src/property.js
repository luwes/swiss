
export function property(value) {
  return {
    value,
    get: (host, val = value) => val,
    set: (host, val) => val,
  };
}
