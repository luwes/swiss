import { element } from '../src/swiss-element.js';
import renderer from '../src/enhancers/renderer.js';

it('element returns a function', function() {
  element().should.be.a('function');
});

it('element creator returns a function', function() {
  const SwissElement = element()(() => `Say cheese`);
  SwissElement.should.be.a('function');
});

it('element creator has an api', function() {
  const SwissElement = element()(() => `Say cheese`);
  const proto = SwissElement.prototype;

  expect('connectedCallback' in proto).to.be.true;
  expect('disconnectedCallback' in proto).to.be.true;
  expect('attributeChangedCallback' in proto).to.be.true;
  expect('shouldUpdate' in proto).to.be.true;
  expect('renderer' in proto).to.be.true;
  expect('render' in proto).to.be.true;
  expect('renderRoot' in proto).to.be.true;
});

it('element can be enhanced', function() {
  const customRender = sinon.spy((root, html) => (root.innerHTML = html()));

  const SwissElement = element(renderer(customRender))(() => `Say cheese`);
  window.customElements.define('swiss-element', SwissElement);

  const swissElement = document.createElement('swiss-element');
  document.body.appendChild(swissElement);

  expect(swissElement.innerHTML).to.equal('Say cheese');
  expect(customRender).to.have.been.calledOnce;
});
