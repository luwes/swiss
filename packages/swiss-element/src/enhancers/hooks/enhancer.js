import augmentor from 'augmentor';
import CurrentElement from './current-element.js';

function hooks(createElement) {
  return options => {
    const el = createElement(options);

    const update = el.update;
    el.update = augmentor(function() {
      CurrentElement.current = el;
      return update();
    });

    return el;
  };
}

export default hooks;
