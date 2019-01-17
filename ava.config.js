export default {
    files: ['packages/*/test/**/*.js'],
    sources: ['packages/*/src/**/*.js'],
    failWithoutAssertions: false,
    babel: false,
    compileEnhancements: false,
    require: ['esm', './test/helpers/browser-env.js']
};
