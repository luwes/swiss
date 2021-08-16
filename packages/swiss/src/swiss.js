import { Element, mixins } from 'swiss/element';
import { PropsMixin } from './mixin-props.js';
import { UpdateMixin } from './mixin-update.js';

/**
 * Quick and dirty way to add default mixins.
 * @type {Array}
 * @ignore
 */
mixins.push(PropsMixin, UpdateMixin);

let constructors = {};

function define(name, def = {}, El = Element) {
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

export {
  define,
  mixins,
  Element,
  PropsMixin,
  UpdateMixin
};
