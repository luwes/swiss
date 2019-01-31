import {$} from '../core.js';
import useReducer from './reducer.js';

export default value => useReducer(
  (_, value) => $(value, [_]),
  value
);
