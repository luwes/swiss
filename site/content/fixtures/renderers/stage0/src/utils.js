import { useMemo } from 'swiss-hooks';

export function useView(fn) {
  const html = useMemo(fn, []);
  const refs = html.collect(html);
  return { html, ...refs };
}
