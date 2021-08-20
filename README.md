# <a href="https://github.com/luwes/swiss"><img src="https://raw.githubusercontent.com/luwes/swiss/master/public/swiss-logo.svg?sanitize=true" height="36" alt="Swiss" /></a>

[![Version](https://img.shields.io/npm/v/swiss.svg?color=success&style=flat-square)](https://www.npmjs.com/package/swiss)
[![codecov](https://img.shields.io/codecov/c/github/luwes/swiss.svg?style=flat-square&color=success)](https://codecov.io/gh/luwes/swiss)
![Badge size](http://img.badgesize.io/https://unpkg.com/swiss@latest/module/swiss.js?compression=gzip&label=gzip&style=flat-square&version=2)

**npm**: `npm i swiss`  
**cdn**: https://unpkg.com/swiss

Swiss provides a functional way of defining custom elements.

- Extend the custom element with composition via mixins.
- Easy configuration of props, syncing to attributes and vice versa.
- Batched property sets to a single update callback.

> Looking for [v1](https://github.com/luwes/swiss/tree/v1)?

### Example - Counter

```js
import { define } from 'swiss';
import { html, render } from 'lit-html';

const Counter = CE => el => ({
  update: () =>
    render(
      html`
        <a href="#" @click="${() => el.count++}">
          Clicked ${el.count} times
        </a>
      `,
      el
    )
});

define('s-counter', {
  props: { count: 0 },
  setup: Counter
});
```

https://codesandbox.io/s/swiss-counter-cb45i

### Syntax

```js
import { define, mixins } from 'swiss';

// mixins is an array containing the default mixins set in Swiss.
// for global mixins push a function in the same format as setup below.

function setup(CE, options) {
  // CE is the custom element class and options is the object defined below.
  // This is called before the custom element is defined.
  return (el) => {
    // el is an instance of your custom element.
    // anything that is returned in the object literal is mixed in the element.
    return {
      yell: () => console.log('Whahaaa')
    }
  };
}

define('s-counter', {
  // extends: 'button' // for custom element built-ins
  setup,
  props: {
    // shorthand property definition w/ default value 0
    count: 0, 

    // readonly getter w/ default value of Steve
    firstName: {
      get: (el, val = 'Steve') => val,
    },

    // getter & setter w/ default value of King
    lastName: {
      get: (el, val = 'King') => val,
      set: (host, value) => value,
    }, 

    // getter that reflects its value to the name attribute
    name: {
      get: ({ firstName, lastName }) => `${firstName} ${lastName}`,
      reflect: true,
    },

    // prop config w/ custom to/from attribute converters
    wheel: {
      get: (host, val = { hub: 1, spokes: [9, 8, 7] }) => val,
      set: (host, val) => val,
      toAttribute: JSON.stringify,
      fromAttribute: JSON.parse,
      reflect: true,
    }

  }
});
```

### Without auto props/attributes & update mixins

```js
import { Element, define, mixins } from 'swiss/element';
import { StylesMixin, css } from 'swiss/styles';

mixins.push(StylesMixin);

const styles = (selector) => css`
  ${selector} {
    display: block;
  }
`;

const props = (el) => {
  get title() {
    return el.getAttribute('title');
  },
  set title(title) {
    el.setAttribute('title', title);
  },
}

const setup = (CE) => (el) => {

  function attributeChanged(name) {
    console.log(name);
  }

  return {
    ...props(el),
    attributeChanged
  };
};

export const PlxPreview = define('plx-preview', {
  styles,
  props,
  setup,
});

```
