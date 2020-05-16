/* eslint-env node */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        targets: {
          browsers: ['ie >= 11']
        }
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread'],
    ['babel-plugin-transform-async-to-promises', {
      inlineHelpers: true
    }],
  ],
};
