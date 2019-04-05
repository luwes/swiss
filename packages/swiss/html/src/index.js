import htm from 'htm';
import { extend, options } from 'swiss';
import { h, render, options as o } from 'preact';

function renderer(createElement) {
  return (...args) => {
    const element = createElement(...args);
    const renderer = (root, html) => render(html, root);

    o.diffed = (newVNode) =>
      typeof newVNode.type === 'function' &&
        // `connectedCallback` already updates once.
        element.isConnected && element.update();

    return extend(element, {
      renderer
    });
  };
}

options.enhancers = [].concat(renderer, options.enhancers);

export const html = htm.bind(h);
export * from 'preact';
