'use strict';
const useReducer = (m => m.__esModule ? m.default : m)(require('./reducer.js'));

Object.defineProperty(exports, '__esModule', {value: true}).default = value => useReducer(
  (_, value) => value,
  value
);
