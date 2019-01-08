'use strict';
const useMemo = (m => m.__esModule ? m.default : m)(require('./memo.js'));

const empty = [];

Object.defineProperty(exports, '__esModule', {value: true}).default = (fn, inputs) => useMemo(() => fn, inputs || empty);
