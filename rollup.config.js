import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-size';
import sourcemaps from 'rollup-plugin-sourcemaps';

const production = !process.env.ROLLUP_WATCH;

const terserPlugin = terser({
  warnings: true,
  compress: {
    passes: 2,
    drop_console: production,
  },
  mangle: {
    properties: {
      regex: /^_\w/,
    },
  },
  nameCache: {
    props: {
      cname: 6,
      props: {
        $_connected: '__c',
        $_attributeChanged: '__a',
      },
    },
  },
});

const config = {
  input: 'src/index.js',
  watch: {
    clearScreen: false,
  },
  output: {
    format: 'es',
    sourcemap: true,
    file: 'dist/swiss.js',
    name: 'swiss',
  },
  plugins: [bundleSize(), sourcemaps(), nodeResolve(), terserPlugin],
};

export default [
  config,
  {
    ...config,
    input: 'src/element.js',
    output: {
      ...config.output,
      file: 'dist/element.js',
      format: 'es',
    },
  },
  {
    ...config,
    input: 'src/styles.js',
    output: {
      ...config.output,
      file: 'dist/styles.js',
      format: 'es',
    },
  },
];
