'use strict';
const useMemo = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./memo.js'));

Object.defineProperty(exports, '__esModule', {value: true}).default = (fn, inputs) => useMemo(() => fn, inputs);
