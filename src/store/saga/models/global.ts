import { AnyAction, combineReducers } from 'redux';
import { call, takeLatest } from 'redux-saga/effects';
import { actionCreatorsCreator, Model } from './md';

export interface IState {
  name: string;
  age: number | null;
}

export interface IEffectsPayload {}

export interface IReducersPayload {
  saveX: { x: number };
  saveY: { y: number };
}
export const model: Model<IState, IEffectsPayload, IReducersPayload> = {
  namespace: 'global',
  state: {
    name: '',
    age: null
  },
  effects: {},
  reducers: {
    saveX(state, { payload }) {
      return {
        ...state,
        x: payload.x
      };
    },
    saveY(state, { payload }) {
      return {
        ...state,
        y: payload.y
      };
    }
  }
};

export const aActions = actionCreatorsCreator(model);
