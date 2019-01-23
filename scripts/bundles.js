
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
    input: 'packages/swiss-element/src/index.js',
  },
  {
    externals: ['lighterhtml'],
    formats: [UMD],
    global: 'swissElementFullname',
    name: 'fullname',
    input: 'fixtures/lighterhtml/src/fullname.js',
  },
  {
    externals: ['lit-html'],
    formats: [UMD],
    global: 'swissElementFullname',
    name: 'fullname',
    input: 'fixtures/lit-html/src/fullname.js',
  },
  {
    externals: ['htm'],
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/htm-preact/src/counter.js',
  },
  {
    externals: ['superfine'],
    formats: [UMD],
    global: 'swissElementCounter',
    name: 'counter',
    input: 'fixtures/superfine/src/counter.js',
  }
];
