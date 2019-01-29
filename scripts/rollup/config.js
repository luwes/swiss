import path from 'path';
import * as R from 'ramda';
import { ESM, UMD, bundles } from '../bundles';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';
import replace from 'rollup-plugin-replace';

const formatOptions = {
  [ESM]: { ext: '.mjs' },
  [UMD]: { ext: '.js' }
};

const env = process.env.NODE_ENV;

// For every type in bundle.types creates a new bundle obj.
const unbundle = ({ formats, ...rest }) =>
  formats.map(format => ({ ...rest, format }));
let allBundles = R.chain(unbundle, bundles);

function getConfig({ name, global, input, format, external, sourcemap }) {
  return {
    input,
    external,
    watch: {
      clearScreen: false
    },
    output: {
      format,
      sourcemap,
      file: path.join(
        path.dirname(input),
        '..',
        `dist/${name}${formatOptions[format].ext}`
      ),
      name: global
    },
    plugins: [
      replace({
        values: {
          __DEBUG__: env !== 'production',
          __DEV__: env === 'dev',
          'process.env.NODE_ENV': JSON.stringify('production')
        }
      }),
      nodeResolve({ module: true }),
      commonjs(),
      format === UMD && babel(),
      format === UMD && terser(),
      bundleSize()
    ].filter(Boolean),
    onwarn: function(warning) {
      // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
      if (warning.code === 'THIS_IS_UNDEFINED') return;

      console.error(warning.message);
    }
  };
}

export default allBundles.map(getConfig);
