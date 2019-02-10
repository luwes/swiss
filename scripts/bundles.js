export const ESM = 'esm';
export const UMD = 'umd';

export const bundleFormats = {
  ESM,
  UMD
};

export const bundles = [
  {
    formats: [ESM, UMD],
    global: 'swissElement',
    name: 'swiss-element',
    input: 'packages/swiss-element/src/index.js'
  },
  {
    external: ['swiss-element'],
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
  }
];

export const fixtures = [
  {
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/redux/src/counter.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementFullname',
    name: 'fullname',
    input: 'fixtures/renderers/lighterhtml/src/fullname.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissElementFullname',
    name: 'fullname',
    input: 'fixtures/renderers/lit-html/src/fullname.js',
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
  }
];
