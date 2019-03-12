import { useMemo } from 'swiss-hooks';

export function useView(fn) {
  const html = useMemo(fn, []);
  const refs = html.collect(html);
  return { html, ...refs };
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
