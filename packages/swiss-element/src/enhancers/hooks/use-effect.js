import {
  useEffect as effect,
  useLayoutEffect as layoutEffect
} from '../../../node_modules/augmentor/esm/index.js';
import { useElement } from './use-element.js';

const CONNECTED = 'connected';
const DISCONNECTED = 'dis' + CONNECTED;

const use = fx => (fn, inputs = []) => {
  const args = [fn];
  if (inputs) {
    // if the inputs is an empty array
    // observe the returned element for connect/disconnect events
    // and invoke effects/cleanup on these events only
    const element = useElement();
    // Capture the current element immediately here because the lifecycle handler
    // is async, requestAnimationFrame / setTimeout.
    args.push(inputs.length ? inputs : createLifecycleHandler(element));
  }
  return fx.apply(null, args);
};

function createLifecycleHandler(element) {
  return $ => {
    const handler = { handleEvent, onconnected, ondisconnected, $, _: null };
    element.addEventListener(CONNECTED, handler);
    element.addEventListener(DISCONNECTED, handler);
  };
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

export const useEffect = use(effect);
export const useLayoutEffect = use(layoutEffect);
