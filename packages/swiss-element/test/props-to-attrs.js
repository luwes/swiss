import { element } from '../src/index.js';

it('should say Hello world', function() {
  document.body.appendChild(
    element('hello-world', ({ w }) => `Hello ${w}`, ['w'])()
  ).w = 'world';

  assert(document.querySelector('hello-world').innerHTML, 'Hello world');
});
