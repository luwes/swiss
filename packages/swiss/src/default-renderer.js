import { append, isString } from './utils.js';

export default function renderer(root, html, old) {
  if (html !== old) {
    if (isString(html)) {
      root.innerHTML = html;
    } else {
      root.innerHTML = '';
      append(root, html);
    }
  }
}
