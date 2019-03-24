import htm from 'htm';
import { defaults } from 'swiss-element';
import { h, render } from 'preact';

function renderer() {
  return createElement => options => {
    const element = createElement(options);
    element.renderer = (root, html) => render(html, root);
    return element;
  };
}

defaults.enhancers = [].concat(renderer(), defaults.enhancers);

export const html = htm.bind(h);
export { h, render };
