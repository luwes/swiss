export function createContext(defaultValue) {
  let context = {
    value: defaultValue,
    provide
  };

  function provide(value) {
    if (!provide._subscribe) {
      let subs = [];
      provide._subscribe = function(update) {
        /* eslint-disable-next-line */
        subs.push(update);
      };
      provide._update = function() {
        // Leave render debouncing up to the render library.
        subs.map(u => u());
      };
    }
    if (context.value != value) {
      context.value = value;
      provide._update();
    }
    return context;
  }

  return context;
}
