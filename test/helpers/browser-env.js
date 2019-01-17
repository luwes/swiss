import browserEnv from 'browser-env';
browserEnv();

window.matchMedia =
  window.matchMedia ||
  (() => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  });
