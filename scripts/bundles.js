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
    input: 'packages/swiss/core/src/core.js'
  },
  {
    formats: [ESM, UMD],
    global: 'swiss',
    name: 'swiss',
    input: 'packages/swiss/src/index.js'
  },
  {
    external: ['swiss'],
    formats: [ESM, UMD],
    global: 'swissHooks',
    name: 'swiss-hooks',
    input: 'packages/swiss/hooks/src/index.js'
  },
  {
    external: ['swiss'],
    formats: [ESM, UMD],
    global: 'swissRedux',
    name: 'swiss-redux',
    input: 'packages/swiss-redux/src/swiss-redux.js'
  },
  {
    external: ['swiss'],
    formats: [ESM, UMD],
    global: 'swissThunk',
    name: 'swiss-thunk',
    input: 'packages/swiss-thunk/src/swiss-thunk.js'
  },
  {
    external: ['swiss'],
    formats: [ESM, UMD],
    global: 'swissLogger',
    name: 'swiss-logger',
    input: 'packages/swiss-logger/src/swiss-logger.js'
  }
];

export const fixtures = [
  {
    formats: [UMD],
    global: 'swissCounter',
    name: 'counter',
    input: 'fixtures/state/redux/src/counter.js',
    sourcemap: true,
    babelPlugins: [["htm", {
      "import": "preact"
    }]]
  },
  {
    formats: [UMD],
    global: 'swissFullname',
    name: 'app',
    input: 'fixtures/renderers/lighterhtml/src/app.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissFullname',
    name: 'app',
    input: 'fixtures/renderers/lit-html/src/app.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissCounter',
    name: 'counter',
    input: 'fixtures/renderers/htm-preact/src/counter.js',
    sourcemap: true,
    babelPlugins: [["htm", {
      "import": "preact"
    }]]
  },
  {
    formats: [UMD],
    global: 'swissCounter',
    name: 'counter',
    input: 'fixtures/renderers/superfine/src/counter.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissCounter',
    name: 'counter',
    input: 'fixtures/renderers/nanomorph/src/counter.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissThunk',
    name: 'thunk',
    input: 'fixtures/middleware/thunk/src/thunk.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissLogger',
    name: 'logger',
    input: 'fixtures/middleware/logger/src/logger.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissCounter',
    name: 'counter',
    input: 'fixtures/renderers/stage0/src/counter.js',
    sourcemap: true
  },
  {
    formats: [UMD],
    global: 'swissCounter',
    name: 'counter',
    input: 'fixtures/renderers/sinuous/src/counter.js',
    sourcemap: true,
    babelPlugins: ['htm']
  }
];
