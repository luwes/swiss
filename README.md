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
