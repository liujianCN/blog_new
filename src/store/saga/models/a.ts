import { AnyAction, combineReducers } from 'redux';
import { call, takeLatest, put } from 'redux-saga/effects';
import * as draftApi from '@/server/draft';
import { actionCreatorsCreator, Model } from './md';

export interface IState {
  x: number;
  y: number;
}

export interface IEffectsPayload {
  fetchUser: { x: string };
}

export interface IReducersPayload {}
export const model: Model<IState, IEffectsPayload, IReducersPayload> = {
  namespace: 'a',
  state: {
    x: 1,
    y: 2
  },
  effects: {
    *fetchUser(action) {
      // console.log(action);
      const data = yield call(draftApi.getBlogDetail, { id: '3' });
      // return res;
      // console.log(res);
    }
  },
  reducers: {}
};

export const aActions = actionCreatorsCreator(model);
