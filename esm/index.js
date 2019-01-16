import augmentor from './core.js';

import {useEffect, useLayoutEffect} from './use/effect.js';

import useRef from './use/ref.js';

import useMemo from './use/memo.js';
import useCallback from './use/callback.js';

import useReducer from './use/reducer.js';
import useState from './use/state.js';

import {createContext, useContext} from './use/context.js';

export default augmentor;
export {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
};
