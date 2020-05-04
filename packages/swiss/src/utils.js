
export function getNativeConstructor(ext) {
  return ext ? document.createElement(ext).constructor : HTMLElement;
}

export function customElement(Base, init) {
  const CE = class extends Base {
    constructor() {
      super();
      init(this);
    }

    connectedCallback() {
      this.connected && this.connected();
    }

    disconnectedCallback() {
      this.disconnected && this.disconnected();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.attributeChanged && this.attributeChanged(name, oldValue, newValue);
    }
  };
  return CE;
}

export function completeAssign(target, ...sources) {
  const options = {
    enumerable: true,
    configurable: true,
    writeable: false
  };
  sources.forEach((source) => {
      for (const prop in source) {
          const descriptor = Object.getOwnPropertyDescriptor(source, prop);
          Object.defineProperty(target, prop, Object.assign(descriptor, options));
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

let idx = 0;
export function uniqueId(prefix) {
  const id = `${prefix}${++idx}`;
  return customElements.get(id) ? uniqueId(prefix) : id;
}
