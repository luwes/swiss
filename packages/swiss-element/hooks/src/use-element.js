import CurrentElement from './current-element.js';

export function useElement() {
  return CurrentElement.current;
}
