export const ESM = 'esm';
export const UMD = 'umd';

export const bundleFormats = {
  ESM,
  UMD
};

export const bundles = [
  {
    formats: [ESM, UMD],
    global: 'swissCore',
    name: 'swiss-core',
    input: 'packages/swiss-element/core/src/core.js',
  },
  {
    formats: [ESM, UMD],
    global: 'swissElement',
    name: 'swiss-element',
    input: 'packages/swiss-element/src/index.js'
  },
  {
    external: ['swiss-element'],
    formats: [ESM, UMD],
    global: 'swissHooks',
    name: 'swiss-hooks',
    input: 'packages/swiss-element/hooks/src/index.js',
  },
  {
    external: ['swiss-hooks'],
    formats: [ESM, UMD],
    global: 'swissRedux',
    name: 'swiss-redux',
    input: 'packages/swiss-redux/src/swiss-redux.js'
  },
  {
    external: ['swiss-element'],
    formats: [ESM, UMD],
    global: 'swissThunk',
    name: 'swiss-thunk',
    input: 'packages/swiss-thunk/src/swiss-thunk.js'
  },
  {
    external: ['swiss-element'],
    formats: [ESM, UMD],
    global: 'swissLogger',
    name: 'swiss-logger',
    input: 'packages/swiss-logger/src/swiss-logger.js'
  }
];

export const fixtures = [
  {
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/state/redux/src/counter.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementFullname',
    name: 'app',
    input: 'fixtures/renderers/lighterhtml/src/app.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementFullname',
    name: 'app',
    input: 'fixtures/renderers/lit-html/src/app.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/renderers/htm-preact/src/counter.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/renderers/superfine/src/counter.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/renderers/nanomorph/src/counter.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementThunk',
    name: 'thunk',
    input: 'fixtures/middleware/thunk/src/thunk.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementLogger',
    name: 'logger',
    input: 'fixtures/middleware/logger/src/logger.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/renderers/stage0/src/counter.js',
    sourcemap: true
  }
];
