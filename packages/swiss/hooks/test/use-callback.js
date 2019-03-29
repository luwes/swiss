import { setUpScratch, tearDown } from '../../test/_utils.js';
import { element } from 'swiss';
import { useCallback } from 'swiss/hooks';

describe('useCallback', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('only recomputes the callback when inputs change', () => {
    const callbacks = [];

    const El = element(({ a, b }) => {
      const cb = useCallback(() => a + b, [a, b]);
      callbacks.push(cb);
      return null;
    });

    const el = El({ a: 1, b: 1 });
    scratch.append(el);
    el.update();

    expect(callbacks[0]).to.equal(callbacks[1]);
    expect(callbacks[0]()).to.equal(2);

    el.update({ a: 1, b: 2 });
    el.update();

    expect(callbacks[1]).to.not.equal(callbacks[2]);
    expect(callbacks[2]).to.equal(callbacks[3]);
    expect(callbacks[2]()).to.equal(3);
  });
});
