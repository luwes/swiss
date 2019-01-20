import { element } from '../src/swiss-element.js';
import renderer from '../src/enhancers/renderer.js';

it('element returns a function', function() {
  element().should.be.a('function');
});

it('element creator returns a function', function() {
  const SwissElement = element(() => `Say cheese`);
  SwissElement.should.be.a('function');
});

it('custom element lifecycle callbacks work', function() {
  const customLifecycle = createElement => options => {
    const el = createElement(options);
    el.connectedCallback = sinon.spy();
    el.disconnectedCallback = sinon.spy();
    el.attributeChangedCallback = sinon.spy();
    return el;
  };

  const cheese = element('s-cheese', () => `Say cheese`, customLifecycle, {
    observedAttributes: ['hole']
  })();

  document.body.appendChild(cheese);
  cheese.setAttribute('hole', 1);
  cheese.remove();

  expect(cheese.connectedCallback).to.have.been.calledOnce;
  expect(cheese.disconnectedCallback).to.have.been.calledOnce;
  expect(cheese.attributeChangedCallback).to.have.been.calledOnce;
});

it('element can be enhanced', function() {
  const customRender = sinon.spy((root, html) => (root.innerHTML = html()));

  element('swiss-element', () => `Say cheese`, renderer(customRender));

  const swissElement = document.createElement('swiss-element');
  document.body.appendChild(swissElement);

  expect(swissElement.innerHTML).to.equal('Say cheese');
  expect(customRender).to.have.been.calledOnce;
});

it('element can extend a native', function() {
  function RenderButton() {
    return `I am button`;
  }

  const customRender = sinon.spy((root, html) => (root.innerHTML = html()));

  const button = element(RenderButton, renderer(customRender))();
  document.body.appendChild(button);

  expect(button.innerHTML).to.equal('I am button');
  expect(button instanceof HTMLElement).to.be.true;
});
