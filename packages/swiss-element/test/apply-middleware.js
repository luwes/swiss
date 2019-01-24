import { element, applyMiddleware } from '../src/index.js';

it('middleware should be triggered when rendering', function() {
  const middleware = sinon.spy(() => next => fragment => {
    next(fragment);
  });

  element('mw-element', () => `Say cheese`, applyMiddleware(middleware));

  const swissElement = document.createElement('mw-element');
  document.body.appendChild(swissElement);

  expect(swissElement.innerHTML).to.equal('Say cheese');
  expect(middleware).to.have.been.called;
});
