import { run, clean } from './core-hooks.js';

let currentElement;

function hooks(createElement) {
  return options => {
    const el = createElement(options);

    const oldUpdate = el.update;
    el.update = run(el, function(a, b, c) {
      if (oldUpdate) oldUpdate.call(el, a, b, c);
      currentElement = el;
    });

    const oldDisconnected = el.disconnectedCallback;
    el.disconnectedCallback = function() {
      if (oldDisconnected) oldDisconnected.call(el);
      clean(el);
    };

    return el;
  };
}

export function useElement() {
  return currentElement;
}

export default hooks;
