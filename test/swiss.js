import test from 'tape';
import spy from 'ispy';
import { define, reflect, readonly } from 'swiss';
import { completeAssign } from '../src/utils.js';
import { element } from './_utils.js';

test('define returns a function', (t) => {
  t.equal(typeof define('s-10'), 'function');
  t.end();
});

test('custom element lifecycle callbacks work', (t) => {
  const customLifecycle = () => () => {
    return {
      connected: spy(),
      disconnected: spy(),
      attributeChanged: spy()
    };
  };

  const cheese = element('s-cheese', {
    props: { hole: 0 },
    setup: customLifecycle
  });

  document.body.appendChild(cheese);
  cheese.setAttribute('hole', 1);
  cheese.parentNode.removeChild(cheese);

  t.equal(cheese.connected.callCount, 1);
  t.equal(cheese.disconnected.callCount, 1);
  t.equal(cheese.attributeChanged.callCount, 1);
  t.end();
});

test('attrs are kebab cased', (t) => {
  const el = element('s-4', { props: reflect({ observeMe: 3 }) });

  t.assert(el.observeMe);

  el.observeMe = 4;
  t.strictEqual(el.getAttribute('observe-me'), '4');

  t.end();
});

test('prop types are converted to attribute strings and back', (t) => {
  const el = element('s-1', {
    props: {
      ...reflect({
        num: 0,
        str: '',
      }),
      arr: {
        get: (host, val = []) => val,
        set: (host, val) => val,
        toAttribute: JSON.stringify,
        reflect: true,
      },
      obj: {
        get: (host, val = {}) => val,
        set: (host, val) => val,
        toAttribute: JSON.stringify,
        fromAttribute: JSON.parse,
        reflect: true,
      }
    }
  });

  el.num = 4;
  t.equal(el.getAttribute('num'), '4');

  el.str = 'stringy';
  t.equal(el.getAttribute('str'), 'stringy');

  el.arr = [1, 2, 3];
  t.equal(el.getAttribute('arr'), '[1,2,3]');

  el.obj = { key1: 1, key2: [9, 8, 7] };
  t.equal(el.getAttribute('obj'), '{"key1":1,"key2":[9,8,7]}');

  el.setAttribute('obj', '{"keanu":4}');
  t.deepEqual(el.obj, { keanu: 4 });

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
  const el = element('s-2', { props: reflect({ hello: 'world' }) });

  t.assert(el.hello);

  el.hello = null;
  t.strictEqual(el.hello, null);
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute#Notes
  t.strictEqual(el.getAttribute('hello'), null);
  t.end();
});

test('handles bool properties', (t) => {
  const el = element('s-22', { props: reflect({ checked: false }) });

  t.assert(!el.checked);

  el.checked = true;
  t.strictEqual(el.checked, true);
  t.strictEqual(el.getAttribute('checked'), '');
  t.end();
});

test('props keep their type', (t) => {
  const el = element('s-3', {
    props: reflect({ observeMe: [1, 2, 3] })
  });

  t.assert(el.observeMe);
  t.assert(Array.isArray(el.observeMe));
  t.end();
});

test('prop sets queue an update on changes', async (t) => {
  const el = element('s-5', {
    props: {
      autoplay: false,
      muted: false
    }
  });

  el.update = spy();

  el.autoplay = true;
  el.muted = true;

  await Promise.resolve();

  t.equal(el.update.callCount, 2);
  t.end();
});

test('prop sets dont queue an update on no changes', async (t) => {
  const el = element('s-6', {
    props: {
      autoplay: false,
      muted: false
    }
  });

  el.update = spy();

  el.autoplay = false;
  el.muted = false;

  await Promise.resolve();

  t.equal(el.update.callCount, 1);
  t.end();
});

test('prop configs', (t) => {
  const el = element('s-7', {
    props: {
      first: 'Tatiana',
      last: {
        get: (host, value = 'Luyten') => value,
      },
      fullname: {
        get: ({ first, last }) => `${first} ${last}`,
        reflect: true,
      },
      power: {
        get: (host, value) => value,
        set: (host, value) => value ** 2,
      },
      ...readonly({
        duration: 17
      })
    }
  });

  t.throws(() => el.last = 'Ilina', /^TypeError/i);

  t.equal(el.fullname, 'Tatiana Luyten');
  // t.equal(el.getAttribute('fullname'), 'Tatiana Luyten', 'reflects attribute');

  el.first = 'Wesley';
  t.equal(el.fullname, 'Wesley Luyten');
  // t.equal(el.getAttribute('fullname'), 'Wesley Luyten'); // todo fails!

  el.power = 10;
  t.equal(el.power, 100);

  t.equal(el.duration, 17);
  t.throws(() => el.duration = 53, /^TypeError/i);

  t.end();
});

test('prop configs 2', (t) => {
  const el = element('s-8', {
    props: {
      autoplay: false,
      volume: 1,
      duration: {
        value: 0
      }
    }
  });

  t.equal(el.getProp('duration'), undefined);
  el.setProp('duration', 5);
  t.equal(el.getProp('duration'), 5);

  el.setAttribute('autoplay', '');
  t.equal(el.autoplay, true);

  el.setAttribute('volume', '0.7');
  t.equal(el.volume, 0.7);

  t.end();
});

test('completeAssign - should mutate target and return same object', t => {
  const target = { a: 4 };
  const expected = { a: 4, b: 3 };

  const actual = completeAssign(target, { b: 3 });

  t.assert(actual === target);
  t.deepEqual(actual, expected);

  t.end();
});
