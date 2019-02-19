import { element } from 'swiss-element';
import { useState } from 'swiss-hooks';
import { h } from 'stage0';
import { useView } from './utils.js';

function Counter() {
  const [count, setCount] = useState(0);

  const { html, down, up, counter } = useView(() => h`
    <div class="box level">
      <div class="level-item">
        <button class="button" #down>-</button>
      </div>
      <div class="level-item">
        <h1 class="title">#counter</h1>
      </div>
      <div class="level-item">
        <button class="button" #up>+</button>
      </div>
    </div>
  `);

  down.onclick = () => setCount(count - 1);
  up.onclick = () => setCount(count + 1);
  counter.nodeValue = count;

  return html;
}

element('s-counter', Counter);
