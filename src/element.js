import { completeAssign, kebabCase } from './utils.js';
export { completeAssign } from './utils.js';

/**
 * Quick and dirty way to add default mixins.
 * @type {Array}
 * @ignore
 */
export const mixins = [];

export function Element(def = {}, Base = HTMLElement) {
  const CE = class extends Base {
    static get observedAttributes() {
      const isPropsFn = typeof def.props === 'function';
      const propsKeys = isPropsFn
        ? Object.getOwnPropertyNames(def.props())
        : Object.keys(def.props || {});

      CE.setups = [
        isPropsFn && def.props,
        ...[...CE.mixins, def.setup].map((mix) => mix && mix(CE, def)),
      ];

      return propsKeys.map(kebabCase);
    }

    constructor() {
      super();
      this._mixins = [];

      CE.setups.forEach((setup) => {
        let tmp;
        setup && this._mixins.push((tmp = setup(this) || {}));
        completeAssign(this, tmp);
      });
    }

    connectedCallback() {
      this._mixins.forEach((c) => c.connected && c.connected());
    }

    disconnectedCallback() {
      this._mixins.forEach((c) => c.disconnected && c.disconnected());
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      this._mixins.forEach(
        (c) =>
          c.attributeChanged && c.attributeChanged(attr, oldValue, newValue)
      );
    }
  };

  CE.base = Base;
  CE.mixins = [...mixins];
  return CE;
}

let constructors = {};

export function define(name, def = {}, El = Element) {
  def.name = name;

  let Base;
  if (def.extends) {
    const Ctor = constructors[def.extends];
    Base = Ctor || document.createElement(def.extends).constructor;
    Base.extends = Ctor ? Ctor.extends : def.extends;
  }

  const CE = El(def, Base);
  constructors[name] = CE;

  if (!customElements.get(name)) {
    customElements.define(name, CE, {
      extends: Base ? Base.extends : undefined,
    });
  }
  return CE;
}
