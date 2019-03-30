import { setUpScratch, tearDown } from '../../test/_utils.js';

import { element } from 'swiss';
import { useRef } from 'swiss/hooks';

describe('useRef', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('provides a stable reference', () => {
    const values = [];

    const El = element(() => {
      const ref = useRef(1);
      values.push(ref.current);
      ref.current = 2;
      return null;
    });

    const el = El();
    el.update();
    el.update();

    expect(values).to.deep.equal([1, 2]);
  });
});
