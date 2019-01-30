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

it('warns when rendering during middleware setup', () => {
  function dispatchingMiddleware(element) {
    element.render(document.createElement('div'));
    return next => action => next(action);
  }

  const createElement = element(() => 99);
  expect(() =>
    applyMiddleware(dispatchingMiddleware)(createElement)()
  ).to.throw(
    `Rendering while constructing your middleware is not allowed. ` +
      `Other middleware would not be applied to this render.`
  );
});
