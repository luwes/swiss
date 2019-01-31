'use strict';
const {$} = require('../core.js');
const useReducer = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./reducer.js'));

Object.defineProperty(exports, '__esModule', {value: true}).default = value => useReducer(
  (_, value) => $(value, [_]),
  value
);
