
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
    externals: [],
    formats: [ESM, UMD],
    global: 'swissElementTodo',
    input: 'fixtures/todo/src/todo.js',
  }
];
