import augmentor from '../../../node_modules/augmentor/esm/index.js';
import CurrentElement from './current-element.js';

function hooks(createElement) {
  return options => {
    const el = createElement(options);
    const { component } = options;

    const requestUpdate = augmentor(function() {
      CurrentElement.current = el;
      const html = component.call(el, el);
      return el.render(html);
    });

    el.requestUpdate = requestUpdate;
    return el;
  };
}

export default hooks;
