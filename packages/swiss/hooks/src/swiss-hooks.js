import { extend } from 'swiss';
import { run, clean } from './core-hooks.js';

let currentElement;

function hooks(createElement) {
  return (...args) => {
    const el = createElement(...args);

    const update = run(el, function(a, b, c) {
      update.supr(a, b, c);
      currentElement = el;
    });

    function disconnectedCallback() {
      disconnectedCallback.supr(el);
      clean(el);
    }

    return extend(el, {
      update,
      disconnectedCallback
    });
  };
}

export function useElement() {
  return currentElement;
}

export default hooks;
