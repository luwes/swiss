import { spy } from 'sinon';
import { setUpScratch, tearDown, oneDefer } from '../../test/_utils.js';
import { element } from 'swiss';
import { html } from 'swiss/html';
import { useState } from 'swiss/hooks';

describe('useState', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('serves the same state across render calls', () => {
    const stateHistory = [];

    const El = element(() => {
      const [state] = useState({ a: 1 });
      stateHistory.push(state);
      return null;
    });

    const el = El();
    el.update();
    el.update();

    expect(stateHistory).to.deep.equal([{ a: 1 }, { a: 1 }]);
    expect(stateHistory[0]).to.equal(stateHistory[1]);
  });

  it('can initialize the state via a function', () => {
    const initState = spy(() => 1);

    const El = element(() => {
      useState(initState);
      return null;
    });

    const el = El();
    el.update();
    el.update();

    expect(initState).to.be.calledOnce;
  });

  it('rerenders when setting the state', async () => {
    let lastState;
    let doSetState;

    const Comp = spy(() => {
      const [state, setState] = useState(0);
      lastState = state;
      doSetState = setState;
      return null;
    });

    const El = element(Comp);

    const el = El();
    el.update();

    expect(lastState).to.equal(0);
    expect(Comp).to.be.calledOnce;

    doSetState(1);
    await oneDefer();
    expect(lastState).to.equal(1);
    expect(Comp).to.be.calledTwice;

    // Updater function style
    doSetState(current => current * 10);
    await oneDefer();
    expect(lastState).to.equal(10);
    expect(Comp).to.be.calledThrice;
  });

  it('can be set by another component', async () => {
    const Increment = element(el => {
      return html`
        <button onclick=${el.increment} />
      `;
    });

    const StateContainer = element(() => {
      const [count, setCount] = useState(0);
      return html`
        <div>
          <p>Count: ${count}</p>
          <${Increment} increment=${() => setCount(c => c + 10)} />
        </div>
      `;
    });

    scratch.append(StateContainer());

    expect(scratch.textContent.trim()).to.include('Count: 0');

    const button = scratch.querySelector('button');
    button.click();

    await oneDefer();
    expect(scratch.textContent.trim()).to.include('Count: 10');
  });
});
