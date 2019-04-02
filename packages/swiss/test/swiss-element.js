import { element, renderer } from '../src/index.js';

it('element returns a function', () => {
  element('s-10', () => `Say cheese`).should.be.a('function');
});

it('element creator returns a function', () => {
  const SwissElement = element('s-11', () => `Say cheese`);
  SwissElement.should.be.a('function');
});

it('custom element lifecycle callbacks work', () => {
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

it('element can be enhanced', () => {
  const customRender = sinon.spy((root, html) => (root.innerHTML = html));

  element('swiss-element', () => `Say cheese`, renderer(customRender));

  const swissElement = document.createElement('swiss-element');
  document.body.appendChild(swissElement);

  expect(swissElement.innerHTML).to.equal('Say cheese');
  expect(customRender).to.have.been.called;
});

it('element can extend a native', () => {
  function RenderButton() {
    return `I am button`;
  }

  const customRender = sinon.spy((root, html) => (root.innerHTML = html));

  const button = element('s-12', RenderButton, renderer(customRender))();
  document.body.appendChild(button);

  expect(button.innerHTML).to.equal('I am button');
  expect(button instanceof HTMLElement).to.be.true;
});

it('non function enhancer throws', () => {
  function RenderButton() {
    return `I am button`;
  }

  assert.throws(
    () => element('s-13', RenderButton, [], {}),
    Error,
    'Enhancer should be a function.'
  );
});

it('update triggers a render', () => {
  let count = 0;
  const el = element('s-14', () => count++)();
  document.body.appendChild(el);

  el.update = sinon.spy(el.update);
  el.render = sinon.spy(el.render);
  el.renderer = sinon.spy(el.renderer);

  el.update();
  assert(count, 1);

  expect(el.update).to.have.been.calledOnce;
  expect(el.render).to.have.been.calledOnce;
  expect(el.renderer).to.have.been.calledOnce;
});
