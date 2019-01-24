import { element, useEffect } from '../src/index.js';

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
