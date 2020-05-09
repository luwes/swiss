import test from 'tape';
import spy from 'ispy';
import { define, element, reflect } from 'swiss';

test('define returns a function', (t) => {
  t.equal(typeof define('s-10'), 'function');
  t.end();
});

test('custom element lifecycle callbacks work', (t) => {
  const customLifecycle = () => el => {
    el.connected = spy();
    el.disconnected = spy();
    el.attributeChanged = spy();
    return {};
  };

  const cheese = element('s-cheese', {
    props: { hole: 0 },
    setup: customLifecycle
  })();

  document.body.appendChild(cheese);
  cheese.setAttribute('hole', 1);
  cheese.remove();

  t.equal(cheese.connected.callCount, 1);
  t.equal(cheese.disconnected.callCount, 1);
  t.equal(cheese.attributeChanged.callCount, 1);
  t.end();
});

test('prop types are converted to attribute strings', (t) => {
  const el = element('s-1', {
    props: reflect({
      num: 4,
      str: 'stringy',
      arr: [1, 2, 3],
      obj: { key1: 1, key2: [9, 8, 7] }
    })
  })();

  t.equal(el.getAttribute('num'), '4');
  t.equal(el.getAttribute('str'), 'stringy');
  t.equal(el.getAttribute('arr'), '[1,2,3]');
  t.equal(el.getAttribute('obj'), '{"key1":1,"key2":[9,8,7]}');
  t.end();
});

test('attributes values are available as prop', (t) => {
  define('my-element', {
    props: {
      hello: '',
      swiss: ''
    }
  });

  document.body.innerHTML = '<my-element hello="world"></my-element>';
  const el = document.querySelector('my-element');

  t.strictEqual(el.hello, 'world');

  el.setAttribute('swiss', 99);
  t.strictEqual(el.swiss, '99');
  t.end();
});

test('handles null properties', (t) => {
  const el = element('s-2', { props: reflect({ hello: 'world' }) })();

  t.assert(el.hello);

  el.hello = null;
  t.strictEqual(el.hello, null);
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute#Notes
  t.strictEqual(el.getAttribute('hello'), null);
  t.end();
});

test('props keep their type', (t) => {
  const el = element('s-3', {
    props: reflect({ observeMe: [1, 2, 3] })
  })();

  t.assert(el.observeMe);
  t.assert(Array.isArray(el.observeMe));
  t.end();
});
