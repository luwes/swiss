
export function completeAssign(target, ...sources) {
  const options = {
    enumerable: true,
    configurable: true,
  };
  sources.forEach((source) => {
    if (source) {
      Object.keys(source).forEach(prop => {
        const descriptor = Object.getOwnPropertyDescriptor(source, prop);
        Object.defineProperty(target, prop, Object.assign(descriptor, options));
      });
    }
  });
  return target;
}

export function kebabCase(name) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function camelCase(name) {
  return name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}
