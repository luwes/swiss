import { spy } from 'sinon';
import { setUpScratch, tearDown } from '../../test/_utils.js';

import { element } from 'swiss';
import { useContext, createContext } from 'swiss/hooks';

describe('useContext', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('gets values from context', () => {
    let value;
    const Context = createContext(13);
    assert(Context.value === 13, 'default value is 13');

    const Comp = spy(() => {
      value = useContext(Context);
      return null;
    });

    // There must be a "Provider" before `useContext` will work.
    Context.provide(13);
    assert(Comp.notCalled);

    const Consumer = element(Comp);
    scratch.append(Consumer());

    assert(value === 13, 'value is 13');
    assert(Comp.calledOnce);

    Context.provide(42);
    Context.provide(42);

    assert(value === 42, 'value is 42');
    assert(Comp.calledTwice);
  });
});
