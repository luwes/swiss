import { useEffect as effect } from '../../../node_modules/augmentor/esm/index.js';
import { CONNECTED, DISCONNECTED } from '../../create-element.js';
import CurrentElement from './current-element.js';

export function useEffect(fn, inputs = []) {
  const args = [fn];
  if (inputs)
    // if the inputs is an empty array
    // observe the returned element for connect/disconnect events
    // and invoke effects/cleanup on these events only
    args.push(inputs.length ? inputs : lifecycleHandler);
  return effect.apply(null, args);
}

function lifecycleHandler($) {
  const handler = { handleEvent, onconnected, ondisconnected, $, _: null };
  CurrentElement.current.addEventListener(CONNECTED, handler, false);
  CurrentElement.current.addEventListener(DISCONNECTED, handler, false);
}

function handleEvent(e) {
  this['on' + e.type]();
}

function onconnected() {
  ondisconnected.call(this);
  this._ = this.$();
}

function ondisconnected() {
  const { _ } = this;
  this._ = null;
  if (_) _();
}
