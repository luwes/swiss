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

export const CustomEvent =
  (isFunction(self.CustomEvent) && self.CustomEvent) || CustomEventPonyfill;

export function CustomEventPonyfill(name, params = {}) {
  const newEvent = document.createEvent('CustomEvent');
  newEvent.initCustomEvent(name, params.bubbles, params.cancelable, params);
  return newEvent;
}

export function getNativeConstructor(ext) {
  return ext ? document.createElement(ext).constructor : HTMLElement;
}

export function compose(...fns) {
  return x => fns.filter(Boolean).reduceRight((y, f) => f(y), x);
}

export function camelCase(name) {
  return name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
}

export function append(parent, nodes) {
  return [].concat(nodes).map(node =>
    parent.appendChild(
      node instanceof Node ? node : document.createTextNode(String(node))
    )
  );
}

export function extend(Base, init) {
  function Class() {
    // eslint-disable-next-line fp/no-this
    const el = this;

    if (!(el instanceof Class)) {
      return new Class();
    }

    const supr = () => {
      return typeof Reflect === 'undefined'
        ? Base.call(el)
        : Reflect.construct(Base, [], el.constructor);
    };

    return init.call(el, supr);
  }

  Class.prototype = Object.create(Base.prototype);
  Class.prototype.constructor = Class;

  return Class;
}
