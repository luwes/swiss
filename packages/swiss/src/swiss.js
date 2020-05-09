import { propsElement } from './props-element.js';
import { updatingElement } from './updating-element.js';
import { customElement, getNativeConstructor } from './utils.js';

/**
 * Quick and dirty way to add default enhancers.
 * @type {Object}
 * @ignore
 */
export const enhancers = [propsElement, updatingElement];

export function define(name, opts = {}) {

  const CE = customElement(getNativeConstructor(opts.extends), [
    ...enhancers,
    opts.setup,
  ], opts);

  customElements.define(name, CE);
  return CE;
}

export function element(...args) {
  return () => new (define(...args))();
}
