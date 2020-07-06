import { propsElement } from './props-element.js';
import { updatingElement } from './updating-element.js';
import { completeAssign, kebabCase } from './utils.js';

/**
 * Quick and dirty way to add default mixins.
 * @type {Array}
 * @ignore
 */
export const mixins = [propsElement, updatingElement];


export function Element(opts = {}, Base = HTMLElement) {
  const CE = class extends Base {

    static get observedAttributes() {
      const props = opts.props || {};

      CE.setups = [...CE.mixins, opts.setup]
        .map(mix => mix && mix(CE, opts));

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
      this._attributeChanged && this._attributeChanged(attr, oldValue, newValue);
      this.attributeChanged && this.attributeChanged(attr, oldValue, newValue);
    }
  };

  CE.mixins = [...mixins];
  return CE;
}

export function define(name, opts) {
  const CE = Element(opts);
  customElements.define(name, CE);
  return CE;
}
