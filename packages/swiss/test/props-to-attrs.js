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

it('props keep their type', async () => {
  const el = element(() => null, ['observe-me'])({ observeMe: [1, 2, 3] });

  el.should.have.property('observeMe');
  el.observeMe.should.be.an('array');
});

it('prop types are converted to attribute strings', async () => {
  const el = element(() => null, ['num', 'str', 'arr', 'obj'])({
    num: 4,
    str: 'stringy',
    arr: [1, 2, 3],
    obj: { key1: 1, key2: [9, 8, 7] }
  });

  el.getAttribute('num').should.equal('4');
  el.getAttribute('str').should.equal('stringy');
  el.getAttribute('arr').should.equal('[1,2,3]');
  el.getAttribute('obj').should.equal('{"key1":1,"key2":[9,8,7]}');
});
