'use strict';
const augmentor = (m => m.__esModule ? m.default : m)(require('./core.js'));

const useReducer = (m => m.__esModule ? m.default : m)(require('./use/reducer.js'));
const useRef = (m => m.__esModule ? m.default : m)(require('./use/ref.js'));
const useState = (m => m.__esModule ? m.default : m)(require('./use/state.js'));

Object.defineProperty(exports, '__esModule', {value: true}).default = augmentor;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
