import {
  useEffect as effect,
  useLayoutEffect as layoutEffect
} from 'augmentor';
import { useElement } from './use-element.js';

const use = fx => (fn, inputs = []) => {
  const args = [fn];
  if (inputs) {
    // if the inputs is an empty array
    // observe the returned element for connect/disconnect events
    // and invoke effects/cleanup on these events only
    const element = useElement();
    // Capture the current element immediately here because the lifecycle handler
    // is async, requestAnimationFrame / setTimeout.
    args[1] = inputs.length ? inputs : createLifecycleHandler(element);
  }
  return fx.apply(null, args);
};

function createLifecycleHandler(element) {
  return $ => {
    const shared = {};
    element.addEventListener('connected', createConnected(shared, $));
    element.addEventListener('disconnected', createConnected(shared));
  };
}

function createConnected(shared, $) {
  return () => {
    // disconnect
    const { _ } = shared;
    shared._ = null;
    if (_) _();
    // connect
    if ($) {
      shared._ = $();
    }
  };
}

export const useEffect = use(effect);
export const useLayoutEffect = use(layoutEffect);
