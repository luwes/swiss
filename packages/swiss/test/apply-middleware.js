import { element, applyMiddleware } from '../src/index.js';

it('middleware should be triggered when rendering', () => {
  const middleware = sinon.spy(() => next => html => {
    next(html);
  });

  element('mw-element', () => `Say cheese`, applyMiddleware(middleware));

  const swissElement = document.createElement('mw-element');
  document.body.appendChild(swissElement);

  expect(middleware).to.have.been.called;
});

it('warns when rendering during middleware setup', () => {
  function dispatchingMiddleware(element) {
    element.render(document.createElement('div'));
    return next => action => next(action);
  }

  const createElement = element('problems-99', () => 99);
  expect(() =>
    applyMiddleware(dispatchingMiddleware)(createElement)()
  ).to.throw();
});
