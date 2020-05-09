import test from 'tape';
import { define } from 'swiss';

test('define returns a function', (t) => {
  t.equal(typeof define('s-10'), 'function');
  t.end();
});
