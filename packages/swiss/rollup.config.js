import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-size';
import sourcemaps from 'rollup-plugin-sourcemaps';

const production = !process.env.ROLLUP_WATCH;

const terserPlugin = terser({
  sourcemap: true,
  warnings: true,
  compress: {
    passes: 2,
    drop_console: production,
  },
  mangle: {
    properties: {
      regex: /^_\w/
    }
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
    clearScreen: false
  },
  output: {
    format: 'iife',
    sourcemap: true,
    file: 'dist/swiss.js',
    name: 'swiss'
  },
  plugins: [
    bundleSize(),
    sourcemaps(),
    nodeResolve(),
    terserPlugin
  ]
};

export default [
  {
    ...config,
    input: 'element/element.js',
    output: {
      ...config.output,
      file: 'module/element.js',
      format: 'es'
    }
  },
  {
    ...config,
    input: 'element/element.js',
    output: {
      ...config.output,
      file: 'dist/element.js',
      format: 'umd'
    },
    plugins: [
      ...config.plugins,
      babel({
        babelHelpers: 'bundled',
        compact: false,
      })
    ]
  },
  {
    ...config,
    input: 'styles/styles.js',
    output: {
      ...config.output,
      file: 'module/styles.js',
      format: 'es'
    }
  },
  {
    ...config,
    input: 'styles/styles.js',
    output: {
      ...config.output,
      file: 'dist/styles.js',
      format: 'umd'
    },
    plugins: [
      ...config.plugins,
      babel({
        babelHelpers: 'bundled',
        compact: false,
      })
    ]
  },
  {
    ...config,
    output: {
      ...config.output,
      file: 'module/swiss.js',
      format: 'es'
    }
  },
  {
    ...config,
    output: {
      ...config.output,
      file: 'dist/swiss.js',
      format: 'umd'
    },
    plugins: [
      ...config.plugins,
      babel({
        babelHelpers: 'bundled',
        compact: false,
      })
    ]
  },
];
