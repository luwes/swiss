const browserSync = require('browser-sync').create();

browserSync.init({
  server: '.',
  files: [
    'dist/*.{js,html,css}',
    'node_modules/swiss-element/dist/*'
  ],
});
