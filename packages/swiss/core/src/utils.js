export function getNativeConstructor(ext) {
  return ext ? document.createElement(ext).constructor : HTMLElement;
}

export function extend(Base, init) {
  function Class(a, b, c) {
    // eslint-disable-next-line fp/no-this
    const el = this;

    if (!(el instanceof Class)) {
      return new Class(a, b, c);
    }

    const supr = () => {
      return typeof Reflect === 'undefined'
        ? Base.call(el)
        : Reflect.construct(Base, [], el.constructor);
    };

    return init.call(el, supr, a, b, c);
  }

  Class.prototype = Object.create(Base.prototype);
  Class.prototype.constructor = Class;

  return Class;
}
