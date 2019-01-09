'use strict';
const augmentor = (m => m.__esModule ? m.default : m)(require('./core.js'));

const {useEffect, useLayoutEffect} = require('./use/effect.js');

const useRef = (m => m.__esModule ? m.default : m)(require('./use/ref.js'));

const useReducer = (m => m.__esModule ? m.default : m)(require('./use/reducer.js'));
const useState = (m => m.__esModule ? m.default : m)(require('./use/state.js'));

const useMemo = (m => m.__esModule ? m.default : m)(require('./use/memo.js'));
const useCallback = (m => m.__esModule ? m.default : m)(require('./use/callback.js'));

Object.defineProperty(exports, '__esModule', {value: true}).default = augmentor;
exports.useCallback = useCallback;
exports.useEffect = useEffect;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
