export const isArray = Array.isArray;

export function isString(value) {
  return typeof value === 'string';
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function compose(...fns) {
  return x => fns.filter(Boolean).reduceRight((y, f) => f(y), x);
}

export function camelCase(name) {
  return name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

export function append(parent, nodes) {
  return []
    .concat(nodes)
    .map(node =>
      parent.appendChild(
        node instanceof Node ? node : document.createTextNode(String(node))
      )
    );
}
