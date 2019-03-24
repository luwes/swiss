# <a href="https://github.com/luwes/swiss"><img src="https://raw.githubusercontent.com/luwes/swiss/master/media/swiss-logo.svg?sanitize=true" height="36" alt="Swiss" /></a>

[![Build Status](https://img.shields.io/travis/luwes/swiss/master.svg?style=flat-square&label=Travis+CI)](https://travis-ci.org/luwes/swiss)
[![codecov](https://img.shields.io/codecov/c/github/luwes/swiss.svg?style=flat-square&version=v0.16.0)](https://codecov.io/gh/luwes/swiss)
![Badge size](http://img.badgesize.io/https://unpkg.com/swiss-element@0.16.0/dist/swiss-element.js?compression=gzip&label=gzip&style=flat-square&version=v0.16.0)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**npm**: `npm install swiss-element --save`  
**cdn**: https://unpkg.com/swiss-element@latest/dist/swiss-element.js

### Intro

Swiss provides a functional way of defining custom elements.

- React-like [hooks](https://reactjs.org/docs/hooks-intro.html) (useEffect, useState, useCallback, useMemo, useReducer, useRef)
- Extend the custom element with composition via [enhancers](#enhancers)
- Observed attributes are also accessible via element properties
- Choose your own renderer:
  [`Htm-preact`](https://swiss.netlify.com/fixtures/renderers/htm-preact/)
  [`Lighterhtml`](https://swiss.netlify.com/fixtures/renderers/lighterhtml/)
  [`Lit-html`](https://swiss.netlify.com/fixtures/renderers/lit-html/)
  [`Nanomorph`](https://swiss.netlify.com/fixtures/renderers/nanomorph/)
  [`Stage0`](https://swiss.netlify.com/fixtures/renderers/stage0/)
  [`Superfine`](https://swiss.netlify.com/fixtures/renderers/superfine/)

### Example - Counter

```js
import { html, render } from 'lit-html';
import { element, renderer } from 'swiss-element';
import { useState } from 'swiss-hooks';

function Counter(element) {
  const [count, setCount] = useState(0);

  return html`
    <a href="#" @click="${() => setCount(count + 1)}">
      Clicked ${count} times
    </a>
  `;
}

element('s-counter', Counter, renderer(render));
```

A starter app is available at https://codesandbox.io/s/github/luwes/swiss-element-starter-app/tree/master/

### Example - Hello world

```js
document.body.appendChild(
  element('hello-world', ({ w }) => `Hello ${w}`, ['w'])()
).w = 'world';
```

# API

<a name="element"></a>

### element(name, comp, [enhancer], [options]) ⇒ <code>HTMLElement</code>

Defines a custom element in the `CustomElementRegistry` which renders the component which is passed as an argument.

**Kind**: global function

| Param                        | Type                                                             | Description                                                                                                                                                                                                                                          |
| ---------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                         | <code>string</code>                                              | The tag name for the custom element.                                                                                                                                                                                                                 |
| comp                         | <code>function</code>                                            | The component that is rendered in the element.                                                                                                                                                                                                       |
| [enhancer]                   | <code>function</code>                                            | The element enhancer. You may optionally specify it to enhance the element with third-party capabilities such as middleware, custom renderer, public API, etc. The only element enhancers that ship with Swiss are `applyMiddleware` and `renderer`. |
| [options]                    | <code>Object</code> \| <code>Array</code>                        | Options object or `observedAttributes` only array for shorter syntax.                                                                                                                                                                                |
| [options.observedAttributes] | <code>Array</code>                                               | Attributes to observe for adding, removing or changing which will trigger a component update if needed.                                                                                                                                              |
| [options.extends]            | <code>string</code>                                              | Specifies the built-in element your element inherits from if any (e.g. `extends: 'button'`).                                                                                                                                                         |
| [options.shadow]             | <code>&#x27;open&#x27;</code> \| <code>&#x27;closed&#x27;</code> | Defines the shadow root mode, by default no shadow root is created and everything is rendered straight on the custom element. The options object is also passed to all the enhancers.                                                                |

---

# Enhancers

###

- [applyMiddleware(...middleware)](#applyMiddleware) ⇒ <code>function</code>
- [renderer(customRenderer)](#renderer) ⇒ <code>function</code>

<a name="applyMiddleware"></a>

### applyMiddleware(...middleware) ⇒ <code>function</code>

Middleware lets you wrap the element's render method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.

**Kind**: global function

| Param         | Type                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ...middleware | <code>function</code> | Functions that conform to the Swiss _middleware_ API. Each middleware receives `SwissElement`'s `render` function as a named argument, and returns a function. That function will be given the `next` middleware's render method, and is expected to return a function of `fragment` calling `next(fragment)` with a potentially different argument, or at a different time, or maybe not calling it at all. The last middleware in the chain will receive the real element's `render` method as the `next` parameter, thus ending the chain. So, the middleware signature is `({ render }) => next => fragment`. |

---

<a name="renderer"></a>

### renderer(customRenderer) ⇒ <code>function</code>

Adds a simple way to define your own renderer.
Verified libraries working by passing just the `render` or `patch` function:

- Lighterhtml
- Lit-html
- HTM-Preact
- Superfine

**Kind**: global function

| Param          | Type                  | Description                                                                                                                                                   |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customRenderer | <code>function</code> | A function that takes the custom element root and a function `html` which once executed renders the created dom nodes to the root node of the custom element. |

---

# FAQ

### Why another dude?

There are dozens of custom element libraries out there, sorry to say, I didn't find one that fit my exact requirements.

- No ES6 classes and classical inheritance ~~hyperHTML-element, lit-element, skatejs~~
- Choose your own render engine ~~neverland, hybrids~~
- Opt-in web component features like ShadowDOM and minimal polyfill requirements ~~switzerland, haunted~~

Swiss doesn't use ES6 classes, Proxy, Shadow DOM (can be configured), etc because IE11 should still be easy to support. The only needed polyfill is the one for `window.customElements`.

```html
<script src="https://unpkg.com/@webcomponents/custom-elements"></script>
```

# Credits

- [Preact](https://github.com/developit/preact) adopted code for Swiss hooks and html
- [React](https://github.com/facebook/react) for the hooks concept
- [Redux](https://github.com/reduxjs/redux) for concepts and adapted docs
- [Augmentor](https://github.com/WebReflection/augmentor) formerly used for the hooks
