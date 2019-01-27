export const ESM = 'esm';
export const UMD = 'umd';

export const bundleFormats = {
  ESM,
  UMD
};

export const bundles = [
  {
    externals: ['augmentor'],
    formats: [ESM, UMD],
    global: 'swissElement',
    name: 'swiss-element',
    input: 'packages/swiss-element/src/index.js'
  },
  {
    externals: ['lighterhtml'],
    formats: [UMD],
    global: 'swissElementFullname',
    name: 'fullname',
    input: 'fixtures/renderers/lighterhtml/src/fullname.js',
    sourcemap: true
  },
  {
    externals: ['lit-html'],
    formats: [UMD],
    global: 'swissElementFullname',
    name: 'fullname',
    input: 'fixtures/renderers/lit-html/src/fullname.js',
    sourcemap: true
  },
  {
    externals: ['htm'],
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/renderers/htm-preact/src/counter.js',
    sourcemap: true
  },
  {
    externals: ['superfine'],
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/renderers/superfine/src/counter.js',
    sourcemap: true
  },
  {
    externals: ['nanomorph', 'nanohtml'],
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/renderers/nanomorph/src/counter.js',
    sourcemap: true
  }
];
