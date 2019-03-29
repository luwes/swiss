### Redux hooks for Swiss

```js
import { html, render } from '../node_modules/htm/preact/standalone.mjs';
import { context, useSelector, useAction } from 'swiss-redux';
import { compose, element, renderer } from 'swiss';
import { createStore } from 'redux';

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const actions = {
  decrement() {
    return { type: 'DECREMENT' };
  },
  increment() {
    return { type: 'INCREMENT' };
  }
};

function Counter() {
  const count = useSelector(state => state);
  const increment = useAction(actions.increment);
  const decrement = useAction(actions.decrement);

  return html`
    <div class="box level">
      <div class="level-item">
        <button class="button" onclick="${() => decrement()}">-</button>
      </div>
      <div class="level-item">
        <h1 class="title">${count}</h1>
      </div>
      <div class="level-item">
        <button class="button" onclick="${() => increment()}">+</button>
      </div>
    </div>
  `;
}

// Redux strongly recommends having just one `store` per web app so you will
// only need to create one `store` context. This is used by the hooks to get
// a reference to the store.
context(createStore(counter));

const enhance = compose(
  // An alternative is to pass the context as an enhancer, in this case the
  // store context will be tied to the element. Each element could potentially
  // have their own store.
  // context(createStore(counter)),
  renderer(render)
);

element('s-counter', Counter, enhance);
```
