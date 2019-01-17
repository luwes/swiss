<p align="center">
<a href="https://github.com/luwes/swiss-element">
  
![SwissElement](./media/swiss-element.svg "SwissElement")

</a>
</p>

**npm**: `npm install swiss-element --save`  
**cdn**: https://unpkg.com/swiss-element@latest/dist/swiss-element.js  

### Intro

Swiss Element provides a functional way of defining custom elements.

- React-like [hooks](https://reactjs.org/docs/hooks-intro.html) (useEffect, useState, useCallback, useMemo, useReducer, useRef)
- Extend the custom element with composition via enhancers
- Tiny in size (2.5kB)

### Example

```js
import { html, render } from 'lighterhtml';
import { element, renderer, useState } from 'swiss-element';

const lighterElement = element(renderer(render));

function Counter(element) {
  const [count, setCount] = useState(0);

  return html`
    <a href="#" onclick="${() => setCount(count + 1)}">
      Clicked ${count} times
    </a>`;
}

customElements.define('s-counter', lighterElement(Counter));
```

A starter app is available at https://codesandbox.io/s/github/luwes/swiss-element-starter-app/tree/master/

### API

## `element([...enhancers])`

Returns a function to create a Swiss Element with.

#### Arguments

1. `[...enhancers]` _(Function)_: The element enhancer. You may optionally specify it to enhance the element with third-party capabilities such as middleware, custom renderer, public API, etc. The only element enhancers that ship with Swiss Element are `applyMiddleware` and `renderer`.

#### Returns

_`Function`_ A custom element creator function.

## `element()(renderFn, options)`

Returns a custom element which can be passed in `customElements.define`

#### Arguments

1. `renderFn` _(Function)_: The render function or functional component.

2. `options` _(Object)_: An options object with 2 optional properties `observedAttributes` and `extends` (e.g. `extends: 'button'`). The options object is also passed to all the enhancers.

#### Returns

_`SwissElement`_ A custom element.

### Why another?

There are dozens of custom element libraries out there, sorry to say, I didn't find one that fit the exact requirements I needed.

- No ES6 classes and classical inheritance ~~hyperHTML-element, lit-element, skatejs~~
- Choose your own render engine ~~neverland, hybrids~~
- Opt-in web component features like ShadowDOM and minimal polyfill requirements ~~switzerland, haunted~~

SwissElement doesn't use ES6 classes, Proxy, Shadow DOM (can be configured), etc because IE11 should still be easy to support.  
The only needed polyfill is the one for `window.customElements`.

```html 
<script src="https://unpkg.com/@webcomponents/custom-elements"></script>
```
