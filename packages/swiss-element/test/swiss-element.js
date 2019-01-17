import test from 'ava';
import { element } from '../dist/swiss-element.js';

test('element returns a function', function(t) {
  t.is(typeof element(), 'function');
});
