import htm from 'htm';
import { options } from 'swiss';
import { h, render } from 'preact';

function renderer(createElement) {
  return (...args) => {
    const element = createElement(...args);
    element.renderer = (root, html) => render(html, root);
    return element;
  };
}

options.enhancers = [].concat(renderer, options.enhancers);

export const html = htm.bind(h);
export * from 'preact';
