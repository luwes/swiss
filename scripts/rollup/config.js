import path from 'path';
import * as R from 'ramda';
import { ESM, UMD, bundles } from '../bundles';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import bundleSize from 'rollup-plugin-bundle-size';

const formatOptions = {
  [ESM]: { ext: '.mjs' },
  [UMD]: { ext: '.js' }
};

// const dev = process.env.NODE_ENV == 'dev';

// For every type in bundle.types creates a new bundle obj.
const unbundle = ({ formats, ...rest }) =>
  formats.map(format => ({ ...rest, format }));
let allBundles = R.chain(unbundle, bundles);

function getConfig({ name, global, input, format }) {
  const [base, folder] = input.split('/');
  return {
    input,
    watch: {
      clearScreen: false,
    },
    output: {
      format,
      file: path.join(base, folder, `dist/${name}${formatOptions[format].ext}`),
      name: global,
    },
    plugins: [
      nodeResolve({ module: true }),
      format === UMD && babel(),
      format === UMD && terser(),
      bundleSize(),
    ].filter(Boolean),
    onwarn: function (warning) {
      // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
      if (warning.code === 'THIS_IS_UNDEFINED')
        return;

      console.error(warning.message);
    }
  };
}

export default allBundles.map(getConfig);
