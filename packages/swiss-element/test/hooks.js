import { element, useEffect, useElement } from '../src/index.js';

it('useEffect should be called on connectedCallback', function() {
  const spy = sinon.spy();

  document.body.appendChild(
    element('swiss-el', () => {
      useEffect(spy);

      const el = document.createElement('div');
      el.innerHTML = 'Say cheese';

      return el;
    })()
  );

  expect(spy).to.have.been.calledOnce;
});

it('useElement should be the current element', function() {
  document.body.appendChild(
    element('swiss-el', element => {
      assert(element, useElement());

      const el = document.createElement('div');
      el.innerHTML = 'Say cheese';
      return el;
    })()
  );
});
