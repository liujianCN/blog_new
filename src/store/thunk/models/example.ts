/* eslint-disable import/no-cycle */
import { actionCreatorsCreator, Model } from '../d_thunk';

export interface State {
  x: number;
  y: number;
}

export interface IEffectsPayload {
  fetchUser: { id: string };
}
export interface IReducersPayload {
  saveX: { z: 1 };
}

const initialState: State = {
  x: 1,
  y: 2,
};

export const model: Model<State, IEffectsPayload, IReducersPayload> = {
  namespace: 'example',
  state: initialState,
  effects: {
    async fetchUser() {
      const res = await new Promise((r) => setTimeout(r, 2000, 567));
      console.log(res);
      return res;
    },
  },
  reducers: {
    saveX(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export const actions = actionCreatorsCreator(model);
console.log(actions);
