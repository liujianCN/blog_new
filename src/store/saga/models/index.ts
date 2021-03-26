/* eslint-disable no-restricted-syntax */
import { getRootSaga, getRootReducer } from './md';
import * as a from './a';
import * as global from './global';

const models = {
  a: a.model,
  global: global.model
};

export const actions = {
  a: a.aActions,
  global: global.aActions
};

export interface IState {
  a: a.IState;
  global: global.IState;
}

export const rootSaga = getRootSaga(models);
export const rootReducer = getRootReducer(models);
