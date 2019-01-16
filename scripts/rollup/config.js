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

// For every type in bundle.types creates a new bundle obj.
const unbundle = ({ formats, ...rest }) =>
  formats.map(format => ({ ...rest, format }));
let allBundles = R.chain(unbundle, bundles);

function getConfig({ global, input, format }) {
  const [base, name] = input.split('/');
  return {
    input,
    output: {
      format,
      file: path.join(base, name, `dist/${name}${formatOptions[format].ext}`),
      name: global,
    },
    plugins: [
      nodeResolve({ module: true }),
      format === UMD && babel(),
      format === UMD && terser(),
      bundleSize(),
    ].filter(Boolean)
  };
}

export default allBundles.map(getConfig);
