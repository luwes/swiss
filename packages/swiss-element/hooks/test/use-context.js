import { setUpScratch, tearDown, tag, render } from '../../test/_utils.js';

import { element } from '../../src/swiss-element.js';
import { useContext, createContext } from '../src/index.js';

describe('useContext', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('gets values from context', () => {
    const values = [];
    const Context = createContext(13);

    function Comp() {
      const value = useContext(Context);
      values.push(value);
      return null;
    }

    render(element('s-consumer', Comp), scratch);
    render(
      element('s-provider', () => Context.provide(42) && tag('s-consumer')),
      scratch
    );
    render(
      element('s-provider2', () => Context.provide(69) && tag('s-consumer')),
      scratch
    );

    expect(values).to.deep.equal([13, 42, 69]);
  });
});
