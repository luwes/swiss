import { element } from '../src/index.js';

it('should say Hello world', () => {
  document.body.appendChild(
    element('hello-world', ({ w }) => `Hello ${w}`, ['w'])()
  ).w = 'world';

  assert(document.querySelector('hello-world').innerHTML, 'Hello world');
});

it('props are camel cased', () => {
  const el = element(() => null, ['observe-me'])({ observeMe: 3 });

  el.should.have.property('observeMe');
  el.observeMe.should.equal(3);
});
