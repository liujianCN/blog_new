/* eslint-disable import/no-cycle */
import { createStore } from 'redux';
import { genRootReducer, enhancer } from './d_thunk';
import * as example from './models/example';
import * as common from './models/common';
import * as home from './models/home';
import * as repos from './models/repos';
import * as draft from './models/draft';
import * as detail from './models/detail';

const models = {
  example: example.model,
  common: common.model,
  home: home.model,
  repos: repos.model,
  draft: draft.model,
  detail: detail.model,
};

export interface StoreState {
  example: example.State;
  common: common.State;
  home: home.State;
  repos: repos.State;
  draft: draft.State;
  detail: detail.State;
}

export const storeActions = {
  example: example.actions,
  common: common.actions,
  home: home.actions,
  repos: repos.actions,
  draft: draft.actions,
  detail: detail.actions,
};

export const rootReducer = genRootReducer(models);

export const store = createStore(rootReducer, enhancer);
