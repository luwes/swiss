
import { element } from '../src/swiss-element.js';
import renderer from '../src/enhancers/renderer.js';

it('element returns a function', function() {
  element().should.be.a('function');
});

// test('element creator returns a function', function(t) {
//   const SwissElement = element()(() => `Say cheese`);
//   t.is(typeof SwissElement, 'function');
// });

// test('element creator has an api', function(t) {
//   const SwissElement = element()(() => `Say cheese`);
//   const proto = SwissElement.prototype;

//   t.true('connectedCallback' in proto);
//   t.true('disconnectedCallback' in proto);
//   t.true('attributeChangedCallback' in proto);
//   t.true('shouldUpdate' in proto);
//   t.true('renderer' in proto);
//   t.true('render' in proto);
//   t.true('renderRoot' in proto);
// });

// test('element can be enhanced', async function(t) {
//   const customRender = (root, html) => root.appendChild(html());

//   const SwissElement = element(renderer(customRender))(() => `Say cheese`);
//   window.customElements.define('swiss-element', SwissElement);

//   const swissElement = document.createElement('swiss-element');
//   document.body.appendChild(swissElement);

//   console.log(swissElement.innerHTML);

//   t.pass();
// });
