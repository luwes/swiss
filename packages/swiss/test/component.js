import { spy } from 'sinon';
import { setUpScratch, tearDown, oneDefer } from './_utils.js';

import { element } from 'swiss';

describe('component', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('subsequent attribute changes are queued', async () => {
    const Comp = spy(() => `Say cheese`);
    const cheese = element(Comp, ['holes'])();
    cheese.holes = 1;
    cheese.holes = 2;
    cheese.holes = 3;

    await oneDefer();
    expect(Comp).to.have.been.calledThrice;

    scratch.appendChild(cheese);
    expect(Comp).to.have.callCount(4);
  });
});
