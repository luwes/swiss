import { element } from '../src/index.js';

it('should say Hello world', () => {
  document.body.appendChild(
    element('hello-world', ({ w }) => `Hello ${w}`, ['w'])()
  ).w = 'world';

  assert(document.querySelector('hello-world').innerHTML, 'Hello world');
});

it('props are camel cased', () => {
  const el = element(() => null, ['observe-me'])({ observeMe: 3 });

  assert(el.observeMe);
  assert.strictEqual(el.observeMe, 3);
});

it('props keep their type', () => {
  const el = element(() => null, ['observe-me'])({ observeMe: [1, 2, 3] });

  assert(el.observeMe);
  assert(Array.isArray(el.observeMe));
});

it('prop types are converted to attribute strings', () => {
  const el = element(() => null, ['num', 'str', 'arr', 'obj'])({
    num: 4,
    str: 'stringy',
    arr: [1, 2, 3],
    obj: { key1: 1, key2: [9, 8, 7] }
  });

  assert.equal(el.getAttribute('num'), '4');
  assert.equal(el.getAttribute('str'), 'stringy');
  assert.equal(el.getAttribute('arr'), '[1,2,3]');
  assert.equal(el.getAttribute('obj'), '{"key1":1,"key2":[9,8,7]}');
});

it('attributes values are available as prop', () => {
  element('my-element', () => null, ['hello', 'swiss']);

  document.body.innerHTML = '<my-element hello="world"></my-element>';
  const el = document.querySelector('my-element');

  assert.strictEqual(el.hello, 'world');

  el.setAttribute('swiss', 99);
  assert.strictEqual(el.swiss, '99');
});

it('handles null properties', () => {
  const el = element(() => null, ['observe-me'])({ hello: 'world' });

  assert(el.hello);

  el.hello = null;
  assert.strictEqual(el.hello, null);
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute#Notes
  assert.strictEqual(el.getAttribute('hello'), null);
});
