'use strict';
let id = Math.random();
const uid = () => --id + '';
exports.uid = uid;

const setupStackID = id => runner => {
  const state = {i: 0, stack: []};
  runner[id] = state;
  runner.on('before', () => {
    state.i = 0;
  });
};
exports.setupStackID = setupStackID;
