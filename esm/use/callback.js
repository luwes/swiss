import useMemo from './memo.js';

const empty = [];

export default (fn, inputs) => useMemo(() => fn, inputs || empty);
