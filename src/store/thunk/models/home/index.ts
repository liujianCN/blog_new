/* eslint-disable @typescript-eslint/no-use-before-define */
import { actionCreatorsCreator, Model } from '@store/d_thunk';
import { getBlogPage, GetBlogPageParams } from '@/server/draft';
import { Blog } from './types';

export interface State {
  page: Blog[];
}

const initialState: State = {
  page: [],
};

export interface EffectsPayload {
  getBlogPage: GetBlogPageParams;
}
export interface ReducersPayload {}

export const model: Model<State, EffectsPayload, ReducersPayload> = {
  namespace: 'home',
  state: initialState,
  effects: {
    async getBlogPage(data, dispatch, getState) {
      const { page } = getState().home;
      const { records } = await getBlogPage(data);
      dispatch(
        actions.reducers.save({
          page: [...page, ...records],
        })
      );
    },
  },
  reducers: {},
};

export const actions = actionCreatorsCreator(model);
