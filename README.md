# augmentor

Extensible, general purpose, React like [hooks](https://reactjs.org/docs/hooks-reference.html) for the masses.

Code Pen **[playground](https://codepen.io/WebReflection/pen/qLMyOM?editors=0010)**.

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

To help developers define whenever effects should run, or cleanup, instead of passing an empty array one can pass a callback which will be executed right _after_ the augmented function is invoked, receiving effect callback, and its returned value. In this case, the _augmentor_ will invoke such callback once and never again for the whole augmented lifecycle (unless forced via explicit `.reset()`).

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

You can see this mechanism in practice applied through the [neverland](https://github.com/WebReflection/neverland) library.


### About `useContext` and `useImperativeMethods`

These two hooks are strictly _React_ oriented and have no meaning in current _augmentor_ world.
