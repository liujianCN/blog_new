/* eslint-disable import/no-cycle */
import { actionCreatorsCreator, Model } from '../../d_thunk';

export interface State {
  menuVisible: boolean;
  headerIntersect: boolean;
  cardIntersect: boolean;
}

export interface IEffectsPayload {}
export interface IReducersPayload {}

const initialState: State = {
  menuVisible: false,
  headerIntersect: true,
  cardIntersect: false,
};

export const model: Model<State, IEffectsPayload, IReducersPayload> = {
  namespace: 'common',
  state: initialState,
  effects: {},
  reducers: {},
};

export const actions = actionCreatorsCreator(model);
console.log(actions);
