import useMemo from './memo.js';

export default (fn, inputs) => useMemo(() => fn, inputs);
