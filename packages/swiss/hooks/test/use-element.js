import { element } from 'swiss';
import { useElement } from 'swiss/hooks';

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
