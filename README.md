# <a href="https://github.com/luwes/swiss-element">![SwissElement](./media/swiss-element.svg 'SwissElement')</a>

[![Build Status](https://img.shields.io/travis/luwes/swiss-element/master.svg?style=flat-square&label=Travis+CI)](https://travis-ci.org/luwes/swiss-element)
[![codecov](https://img.shields.io/codecov/c/github/luwes/swiss-element.svg?style=flat-square&version=$VERSION)](https://codecov.io/gh/luwes/swiss-element)
![Badge size](http://img.badgesize.io/luwes/swiss-element/master/packages/swiss-element/dist/swiss-element.js.svg?style=flat-square&compression=gzip&version=$VERSION)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**npm**: `npm install swiss-element --save`  
**cdn**: https://unpkg.com/swiss-element@latest/dist/swiss-element.js

### Intro

Swiss Element provides a functional way of defining custom elements.

- React-like [hooks](https://reactjs.org/docs/hooks-intro.html) (useEffect, useState, useCallback, useMemo, useReducer, useRef)
- Extend the custom element with composition via enhancers
- Choose your own renderer

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
    </a>
  `;
}

customElements.define('s-counter', lighterElement(Counter));
```

A starter app is available at https://codesandbox.io/s/github/luwes/swiss-element-starter-app/tree/master/

# API

## `element([...enhancers])`

Returns a function to create a Swiss Element with.

#### Arguments

1. `[...enhancers]` _(Function)_: The element enhancer. You may optionally specify it to enhance the element with third-party capabilities such as middleware, custom renderer, public API, etc. The only element enhancers that ship with Swiss Element are `applyMiddleware` and `renderer`.

#### Returns

_`Function`_ A custom element creator function.

## `element()(component, options)`

Returns a custom element which can be passed in `customElements.define`

#### Arguments

1. `component` _(Function)_: The functional component.

2. `options` _(Object)_: An options object with 2 optional properties `observedAttributes` and `extends` (e.g. `extends: 'button'`). The options object is also passed to all the enhancers.

#### Returns

_`SwissElement`_ A custom element.

# Enhancers

## `renderer(render)`

Adds a simple way to define your own renderer.

#### Arguments

1. `render(root, html)` _(Function)_: A function that takes the custom element root and a function `html` which once executed renders the created dom nodes to the root node of the custom element.

## `applyMiddleware(...middleware)`

Middleware is the suggested way to extend Swiss Element with custom functionality. Middleware lets you wrap the element's render method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.

#### Arguments

1. `...middleware` _(arguments)_: Functions that conform to the Swiss Element _middleware_ API. Each middleware receives `SwissElement`'s `render` function as a named argument, and returns a function. That function will be given the `next` middleware's render method, and is expected to return a function of `fragment` calling `next(fragment)` with a potentially different argument, or at a different time, or maybe not calling it at all. The last middleware in the chain will receive the real element's `render` method as the `next` parameter, thus ending the chain. So, the middleware signature is `({ render }) => next => fragment`.

# FAQ

### Why another dude?

There are dozens of custom element libraries out there, sorry to say, I didn't find one that fit my exact requirements.

- No ES6 classes and classical inheritance ~~hyperHTML-element, lit-element, skatejs~~
- Choose your own render engine ~~neverland, hybrids~~
- Opt-in web component features like ShadowDOM and minimal polyfill requirements ~~switzerland, haunted~~

SwissElement doesn't use ES6 classes, Proxy, Shadow DOM (can be configured), etc because IE11 should still be easy to support. The only needed polyfill is the one for `window.customElements`.

```html
<script src="https://unpkg.com/@webcomponents/custom-elements"></script>
```

# Credits

- [Augmentor](https://github.com/WebReflection/augmentor) the only dependency that provides the hooks
- [React](https://reactjs.org/) for the hooks concept
- [Redux](https://redux.js.org/) for concepts and adapted docs (writings docs is hard (:)
