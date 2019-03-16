# <a href="https://github.com/luwes/swiss-element"><img src="https://raw.githubusercontent.com/luwes/swiss-element/master/media/swiss-logo.svg?sanitize=true" height="36" alt="Swiss Element" /></a>

[![Build Status](https://img.shields.io/travis/luwes/swiss-element/master.svg?style=flat-square&label=Travis+CI)](https://travis-ci.org/luwes/swiss-element)
[![codecov](https://img.shields.io/codecov/c/github/luwes/swiss-element.svg?style=flat-square&version=v0.12.0)](https://codecov.io/gh/luwes/swiss-element)
![Badge size](http://img.badgesize.io/https://unpkg.com/swiss-element@latest/dist/swiss-element.js?compression=gzip&label=gzip&style=flat-square&version=v0.12.0)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**npm**: `npm install swiss-element --save`  
**cdn**: https://unpkg.com/swiss-element@latest/dist/swiss-element.js

### Intro

Swiss Element provides a functional way of defining custom elements.

- React-like [hooks](https://reactjs.org/docs/hooks-intro.html) (useEffect, useState, useCallback, useMemo, useReducer, useRef)
- Extend the custom element with composition via [enhancers](#enhancers)
- Observed attributes are also accessible via element properties
- Choose your own renderer
  - [Lighterhtml](site/content/fixtures/renderers/lighterhtml)
  - [Lit-html](site/content/fixtures/renderers/lit-html)
  - [Htm-preact](site/content/fixtures/renderers/htm-preact) (vdom)
  - [Superfine](site/content/fixtures/renderers/superfine) (vdom)
  - [Nanomorph](site/content/fixtures/renderers/nanomorph)
  - everything that outputs DOM...

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

### element(name, component, [enhancer], [options]) ⇒ <code>HTMLElement</code>

Defines a custom element in the `CustomElementRegistry` which renders the component which is passed as an argument.

**Kind**: global function

| Param                        | Type                                                             | Description                                                                                                                                                                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name                         | <code>string</code>                                              | The tag name for the custom element.                                                                                                                                                                                                                         |
| component                    | <code>function</code>                                            | The component that is rendered in the element.                                                                                                                                                                                                               |
| [enhancer]                   | <code>function</code>                                            | The element enhancer. You may optionally specify it to enhance the element with third-party capabilities such as middleware, custom renderer, public API, etc. The only element enhancers that ship with Swiss Element are `applyMiddleware` and `renderer`. |
| [options]                    | <code>Object</code> \| <code>Array</code>                        | Options object or `observedAttributes` only array for shorter syntax.                                                                                                                                                                                        |
| [options.observedAttributes] | <code>Array</code>                                               | Attributes to observe for adding, removing or changing which will trigger a component update if needed.                                                                                                                                                      |
| [options.extends]            | <code>string</code>                                              | Specifies the built-in element your element inherits from if any (e.g. `extends: 'button'`).                                                                                                                                                                 |
| [options.shadow]             | <code>&#x27;open&#x27;</code> \| <code>&#x27;closed&#x27;</code> | Defines the shadow root mode, by default no shadow root is created and everything is rendered straight on the custom element. The options object is also passed to all the enhancers.                                                                        |

---

# Enhancers

###

- [applyMiddleware(...middleware)](#applyMiddleware) ⇒ <code>function</code>
- [renderer(customRenderer)](#renderer) ⇒ <code>function</code>

<a name="applyMiddleware"></a>

### applyMiddleware(...middleware) ⇒ <code>function</code>

Middleware lets you wrap the element's render method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.

**Kind**: global function

| Param         | Type                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ...middleware | <code>function</code> | Functions that conform to the Swiss Element _middleware_ API. Each middleware receives `SwissElement`'s `render` function as a named argument, and returns a function. That function will be given the `next` middleware's render method, and is expected to return a function of `fragment` calling `next(fragment)` with a potentially different argument, or at a different time, or maybe not calling it at all. The last middleware in the chain will receive the real element's `render` method as the `next` parameter, thus ending the chain. So, the middleware signature is `({ render }) => next => fragment`. |

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

SwissElement doesn't use ES6 classes, Proxy, Shadow DOM (can be configured), etc because IE11 should still be easy to support. The only needed polyfill is the one for `window.customElements`.

```html
<script src="https://unpkg.com/@webcomponents/custom-elements"></script>
```

# Credits

- [Augmentor](https://github.com/WebReflection/augmentor) the only dependency that provides the hooks
- [React](https://reactjs.org/) for the hooks concept
- [Redux](https://redux.js.org/) for concepts and adapted docs (writings docs is hard (:)
