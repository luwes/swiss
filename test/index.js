require('./runner.js');

setTimeout(() => {

  delete require.cache[require.resolve('basichtml')];
  delete require.cache[require.resolve('../cjs')];
  delete require.cache[require.resolve('../cjs/use/effect.js')];
  delete require.cache[require.resolve('./runner.js')];

  global.requestAnimationFrame = setTimeout;
  global.cancelAnimationFrame = clearTimeout;

  require('./runner.js');

}, 1000);
