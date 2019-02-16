# 🇨🇭element + [htm-preact](https://github.com/developit/htm/)

```js
import { html, render } from 'htm/preact/standalone';
import { element, renderer } from 'swiss-element';
import { useState } from 'swiss-hooks';

function Counter() {
  const [count, setCount] = useState(0);

  return html`
    <div class="box level">
      <div class="level-item">
        <button class="button" onclick="${() => setCount(count - 1)}">-</button>
      </div>
      <div class="level-item">
        <h1 class="title">${count}</h1>
      </div>
      <div class="level-item">
        <button class="button" onclick="${() => setCount(count + 1)}">+</button>
      </div>
    </div>
  `;
}

element('s-counter', Counter, renderer(render));
```
