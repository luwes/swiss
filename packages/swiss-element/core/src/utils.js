export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function getNativeConstructor(ext) {
  return ext ? document.createElement(ext).constructor : HTMLElement;
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
