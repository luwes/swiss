import { element } from '../../src/swiss-element.js';
import { useElement } from '../src/index.js';

it('useElement should be the current element', function() {
  document.body.appendChild(
    element('swiss-el2', element => {
      assert(element, useElement());

      const el = document.createElement('div');
      el.innerHTML = 'Say cheese';
      return el;
    })()
  );
});
