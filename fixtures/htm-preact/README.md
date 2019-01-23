# 🇨🇭element + [htm-preact](https://github.com/developit/htm/)

```js
import { html, render } from '../node_modules/htm/preact/standalone.mjs';
import { element, renderer, useState } from 'swiss-element';

function Counter() {
  const [count, setCount] = useState(0);

  return html`
    <a href="#" onclick="${() => setCount(count + 1)}">
      Clicked ${count} times
    </a>
  `;
}

element('s-counter', Counter, renderer(render));
```
