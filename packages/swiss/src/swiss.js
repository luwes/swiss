import { propsElement } from './props-element.js';
import { updatingElement } from './updating-element.js';
import { completeAssign, kebabCase } from './utils.js';

/**
 * Quick and dirty way to add default mixins.
 * @type {Array}
 * @ignore
 */
export const mixins = [propsElement, updatingElement];


export function Element(def = {}, Base = HTMLElement) {
  const CE = class extends Base {

    static get observedAttributes() {
      const props = def.props || {};

      CE.setups = [...CE.mixins, def.setup]
        .map(mix => mix && mix(CE, def));

      return Object.keys(props).map(kebabCase);
    }

    constructor() {
      super();
      CE.setups.forEach((setup) => {
        completeAssign(this, setup && setup(this));
      });
    }

    connectedCallback() {
      this._connected();
      this.connected && this.connected();
    }

    disconnectedCallback() {
      this.disconnected && this.disconnected();
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      this._attributeChanged(attr, oldValue, newValue);
      this.attributeChanged && this.attributeChanged(attr, oldValue, newValue);
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
    customElements.define(name, CE, { extends: Base ? Base.extends : undefined });
  }
  return CE;
}
