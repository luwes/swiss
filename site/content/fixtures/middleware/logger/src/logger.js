import { applyMiddleware, element } from 'swiss-element';
import { useState } from 'swiss-hooks';
import logger from 'swiss-logger';
import { h } from 'stage0';
import { useView, getRandomColor } from './utils.js';

function Counter() {
  const [count, setCount] = useState(0);

  const view = useView(() => h`
    <div class="box level" #box>
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

  view.down.onclick = () => setCount(count - 1);
  view.up.onclick = () => setCount(count + 1);
  view.counter.nodeValue = count;
  view.box.style.background = getRandomColor();

  return view.html;
}

element('s-counter', Counter, applyMiddleware(logger));
