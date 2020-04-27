import { append } from './utils.js';

export default function renderer(root, html, old) {
  if (html !== old) {
    if (typeof html === 'string') {
      root.innerHTML = html;
    } else {
      root.innerHTML = '';
      append(root, html);
    }
  }
}
