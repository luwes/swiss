# augmentor

[![Build Status](https://travis-ci.com/WebReflection/augmentor.svg?branch=master)](https://travis-ci.com/WebReflection/augmentor) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/augmentor/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/augmentor?branch=master) ![WebReflection status](https://offline.report/status/webreflection.svg)

Extensible, general purpose, React like [hooks](https://reactjs.org/docs/hooks-reference.html) for the masses.

Code Pen **[playground](https://codepen.io/WebReflection/pen/qLMyOM?editors=0010)**.

Include via:

  * CDN as global utility, via https://unpkg.com/domtagger
  * CJS via `const domtagger = require('domtagger')`
  * ESM via `import domtagger from 'domtagger'`
  * ESM CDN via `import domtagger from 'https://unpkg.com/domtagger?module'`

## example

You can test this example [directly on Code Pen](https://codepen.io/WebReflection/pen/zymKBb?editors=0011).

```js
import augmentor, {useState} from 'augmentor';

// augment any function once
const a = augmentor(test);
a();

// ... or many times ...
const [b, c] = [test, test].map(augmentor);
b();
c();

function test() {

  const [count, setCount] = useState(0);

  // log current count value
  console.log(count);

  // will invoke this augmented function each second
  setTimeout(() => setCount(count + 1), 1000);
}
```

## Available Hooks

All hooks behave as close as possible to their _React_ counter part, with a notable difference for `useEffect`.

  * Basic Hooks
    * [useState](https://reactjs.org/docs/hooks-reference.html#usestate)
    * [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
  * Additional Hooks
    * [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
    * [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
    * [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
    * [useRef](https://reactjs.org/docs/hooks-reference.html#useref)
    * [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)


### A DOM oriented `useEffect`

If you'd like to have DOM nodes `connect/disconnect` hooks, similarly to how _React_ mount and unmount work, consider using **[dom-augmentor](https://github.com/WebReflection/dom-augmentor)** or keep reading to understand how to write your own.


### What's different in `useEffect`

With React components, when you pass an empty array to `useEffect` the effects, and their cleanup, would run only on component mounted or unmounted.

However, being _augmentor_ a general purpose utility, there is no notion of any component, so that an empty array will result into an effect that will run once, but it'll never clean up unless explicitly forced through the augmented function `.reset()` method.

```js
import augmentor, {useEffect} from 'augmentor';

const effected = augmentor(() => {
  useEffect(
    () => {
      const i = setInterval(console.log, 1000, Math.random());
      return () => clearInterval(i);
    },
    []
  );
});

// will start showing the random number every second
effected();

// will cleanup the effect in 5 seconds
setTimeout(effected.reset, 5000);
```

This behavior might be OK in some well orchestrated case, but it's quite unpractical in the real world.

To help developers define whenever effects should run, or cleanup, instead of passing an empty array one can pass a callback which will be executed right _after_ the augmented function is invoked, receiving effect callback, and the augmented function returned value.

In this case, the _augmentor_ will invoke such callback once, and never again, for the whole augmented lifecycle (unless forced via explicit `.reset()`), so that it's safe to setup an effect behavior within the provided effects handler.

```js
import augmentor, {useEffect} from 'augmentor';

const effected = augmentor(() => {
  useEffect(
    () => {
      const i = setInterval(console.log, 1000, Math.random());
      return () => clearInterval(i);
    },
    lifecycleHandler
  );
  // returning some value
  return 5000;
});

// will start showing the random number every second
// and it will automatically clean up after 5 seconds
effected(); // returns 5000

function lifecycleHandler(callback, result) {
  const cleanUp = callback();
  // returned value used to clear the timer after 5 seconds
  setTimeout(cleanUp, result);
}
```

You can see this mechanism in practice applied through the [neverland](https://github.com/WebReflection/neverland) library, where passing an empty array will implicitly result into observing nodes through the DOM.


### About `useContext` and `useImperativeMethods`

These two hooks are strictly _React_ oriented and have no meaning in current _augmentor_ world.


### Create your own hook

The _augmentor_ core provides various utilities to make your own hook and export these like any other.

Following a `useUpdate` example.

```js
import {setup, stacked, unstacked, uid} from 'augmentor/core.js';

// create a unique identifier for this hook
const id = uid();

// add to each runner setup a new stack for this hook
setup.push(stacked(id));

// export the updater
export const useUpdate = value => {
  const {i, stack, update, unknown} = unstacked(id);
  // if unknown, add this this hook stack any value
  // this could be also the update function itself
  // which will re-invoke the callback any time it's used
  if (unknown)
    stack.push(update);
  // return the current stack position at index `i`
  return stack[i];
};
```

Now import the code in your project, and see every time an updater is invoked the whole callback is re-executed.

```js
import augmentor from 'augmentor';
import { useUpdate } from './use-update.js';

const zero = augmentor(increment);

zero({value: 0});

function increment(ref) {
  // used to invoke again the augmented function
  const update = useUpdate();
  setTimeout(update, 1000);

 // log and increment the reference value
  console.log(ref.value++);
}
```

You can test both files, as CJS version, through the [example](./example) folder.
