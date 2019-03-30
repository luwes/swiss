import { setUpScratch, tearDown, tag } from '../../test/_utils.js';

import { element } from 'swiss';
import { useContext, createContext } from 'swiss/hooks';

describe('useContext', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('gets values from context', () => {
    const values = [];
    const Context = createContext(13);

    const Consumer = element(() => {
      const value = useContext(Context);
      values.push(value);
      return null;
    });

    scratch.append(Consumer());

    const Provider = element(() => Context.provide(42) && tag(Consumer));
    scratch.append(Provider());

    const Provider2 = element(() => Context.provide(69) && tag(Consumer));
    scratch.append(Provider2());

    expect(values).to.deep.equal([13, 42, 69]);
  });
});
