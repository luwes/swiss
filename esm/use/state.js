import useReducer from './reducer.js';

export default value => useReducer(
  (_, value) => value,
  value
);
