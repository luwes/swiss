import { setUpScratch, tearDown, oneDefer } from '../../test/_utils.js';

import { element, options, renderer } from 'swiss';
import { html, render } from 'lit-html';
options.enhancers = [].concat(renderer(render), options.enhancers);
import { useReducer } from 'swiss/hooks';

describe('useReducer', () => {
  /** @type {HTMLDivElement} */
  let scratch;

  beforeEach(() => (scratch = setUpScratch()));
  afterEach(() => tearDown(scratch));

  it('rerenders when dispatching an action', async () => {
    const states = [];
    let _dispatch;

    const initState = { count: 0 };

    function reducer(state, action) {
      switch (action.type) {
        case 'increment': return { count: state.count + action.by };
      }
    }

    const El = element(() => {
      const [state, dispatch] = useReducer(reducer, initState);
      _dispatch = dispatch;
      states.push(state);
      return null;
    });

    scratch.append(El());

    _dispatch({ type: 'increment', by: 10 });
    await oneDefer();

    expect(states).to.deep.equal([{ count: 0 }, { count: 10 }]);
  });

  it('can be dispatched by another component', async () => {
    const initState = { count: 0 };

    function reducer(state, action) {
      switch (action.type) {
        case 'increment': return { count: state.count + action.by };
      }
    }

    const ReducerEl = element(() => {
      const [state, dispatch] = useReducer(reducer, initState);
      return html`<div>
        <p>Count: ${state.count}</p>
        <dispatcher-el .dispatch=${dispatch}></dispatcher-el>
      </div>`;
    });

    element('dispatcher-el', ({ dispatch }) =>
      html`<button @click=${() => dispatch({ type: 'increment', by: 10 })}>Increment</button>`);

    scratch.append(ReducerEl());

    expect(scratch.textContent).to.include('Count: 0');

    const button = scratch.querySelector('button');
    button.click();

    await oneDefer();
    expect(scratch.textContent).to.include('Count: 10');
  });

  it('can lazily initialize its state with an action', async () => {
    const states = [];
    let _dispatch;

    function init(initialCount) {
      return { count: initialCount };
    }

    function reducer(state, action) {
      switch (action.type) {
        case 'increment': return { count: state.count + action.by };
      }
    }

    const El = element(({ initCount }) => {
      const [state, dispatch] = useReducer(reducer, initCount, init);
      _dispatch = dispatch;
      states.push(state);
      return null;
    });

    scratch.append(El({ initCount: 10 }));

    _dispatch({ type: 'increment', by: 10 });
    await oneDefer();

    expect(states).to.deep.equal([{ count: 10 }, { count: 20 }]);
  });
});
