
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
    input: 'packages/swiss-element/src/index.js',
  },
  {
    externals: ['lit-html'],
    formats: [UMD],
    global: 'swissElementFullname',
    input: 'fixtures/fullname/src/fullname.js',
  },
  {
    externals: ['htm'],
    formats: [UMD],
    global: 'swissElementCounter',
    input: 'fixtures/htm-preact/src/counter.js',
  },
  {
    externals: ['superfine'],
    formats: [UMD],
    global: 'swissElementCounter',
    input: 'fixtures/superfine/src/counter.js',
  }
];
