# <a href="https://github.com/luwes/swiss"><img src="https://raw.githubusercontent.com/luwes/swiss/master/media/swiss-logo.svg?sanitize=true" height="36" alt="Swiss" /></a>

[![Version](https://img.shields.io/npm/v/swiss.svg?color=success&style=flat-square)](https://www.npmjs.com/package/swiss)
[![codecov](https://img.shields.io/codecov/c/github/luwes/swiss.svg?style=flat-square&color=success&version=v0.16.0)](https://codecov.io/gh/luwes/swiss)
![Badge size](http://img.badgesize.io/https://unpkg.com/swiss@latest/dist/swiss.js?compression=gzip&label=gzip&style=flat-square&version=v0.16.0)

**npm**: `npm i swiss`  
**cdn**: https://unpkg.com/swiss

### Intro

Swiss provides a functional way of defining custom elements.

- Extend the custom element with composition via mixins.
- Easy configuration of props, syncing to attributes and vice versa.
- Batched property sets to a single update callback.


### Example - Counter

```js
import { define } from 'swiss';
import { html, render } from 'lit-html';

const Counter = (CE) => (element) => ({
  update: ({ count }) => render(html`
    <a href="#" @click="${() => element.set(count + 1)}">
      Clicked ${count} times
    </a>
  `, element)
});

define('s-counter', {
  props: { count: 0 },
  setup: Counter
});
```
