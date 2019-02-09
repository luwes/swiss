import { element, renderer } from '../src/index.js';

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
    el.connectedCallback = sinon.spy(el.connectedCallback);
    el.disconnectedCallback = sinon.spy(el.disconnectedCallback);
    el.attributeChangedCallback = sinon.spy(el.attributeChangedCallback);
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
  const customRender = sinon.spy((root, html) => (root.innerHTML = html));

  element('swiss-element', () => `Say cheese`, renderer(customRender));

  const swissElement = document.createElement('swiss-element');
  document.body.appendChild(swissElement);

  expect(swissElement.innerHTML).to.equal('Say cheese');
  expect(customRender).to.have.been.called;
});

it('element can extend a native', function() {
  function RenderButton() {
    return `I am button`;
  }

  const customRender = sinon.spy((root, html) => (root.innerHTML = html));

  const button = element(RenderButton, renderer(customRender))();
  document.body.appendChild(button);

  expect(button.innerHTML).to.equal('I am button');
  expect(button instanceof HTMLElement).to.be.true;
});

it('non function enhancer throws', function() {
  function RenderButton() {
    return `I am button`;
  }

  assert.throws(
    () => element(RenderButton, [], {}),
    Error,
    'Expected the enhancer to be a function.'
  );
});

it('update triggers a render', function() {
  let count = 0;
  const el = element(() => count++)();
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
