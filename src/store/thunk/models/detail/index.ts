/* eslint-disable @typescript-eslint/no-use-before-define */
import { actionCreatorsCreator, Model } from '@store/d_thunk';
import * as draftApi from '@/server/draft';

export interface State {
  content: string;
  updatedAt: string;
}

const initialState: State = {
  content: '',
  updatedAt: '',
};

export interface EffectsPayload {
  getBlogDetail: draftApi.IGetBlogDetailParams;
}
export interface ReducersPayload {
  reset: void;
}

export const model: Model<State, EffectsPayload, ReducersPayload> = {
  namespace: 'detail',
  state: initialState,
  effects: {
    async getBlogDetail(data, dispatch) {
      const { content, updatedAt } = await draftApi.getBlogDetail(data);
      dispatch(actions.reducers.save({ content, updatedAt }));
    },
  },
  reducers: {
    reset() {
      return initialState;
    },
  },
};

export const actions = actionCreatorsCreator(model);
