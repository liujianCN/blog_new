/* eslint-disable @typescript-eslint/no-use-before-define */
import { actionCreatorsCreator, Model } from '@store/d_thunk';
import * as draftApi from '@/server/draft';
import { Belong, Belongs } from './types';

export interface State {
  title: string;
  belong: string;
  content: string;
  belongs: Belongs[];
  belongList: Belong[];
}

const initialState: State = {
  title: '',
  belong: '',
  content: '',
  belongs: [],
  belongList: [],
};

export interface EffectsPayload {
  getBlogDetail: draftApi.IGetBlogDetailParams;
  addBlog: draftApi.IAddBlogParams;
  modifyBlog: draftApi.IModifyBlogParams;
  getBlogBelongs: void;
  addBelong: draftApi.AddBelongParams;
}
export interface ReducersPayload {
  genBelongs: { belongs: Belong[] };
  resetDraft: void;
}

export const model: Model<State, EffectsPayload, ReducersPayload> = {
  namespace: 'draft',
  state: initialState,
  effects: {
    async getBlogDetail(data: draftApi.IGetBlogDetailParams, dispatch) {
      const res = await draftApi.getBlogDetail(data);
      console.log();
      dispatch(actions.reducers.save(res));
    },
    async addBlog(data) {
      const res = await draftApi.addBlog(data);
      console.log(res);
      return res;
    },
    async modifyBlog(data) {
      const res = await draftApi.modifyBlog(data);
      console.log(res);
      return res;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getBlogBelongs(_, dispatch) {
      const res = await draftApi.getBelongs();
      dispatch(actions.reducers.genBelongs({ belongs: res }));
      return res;
    },
    async addBelong(data) {
      const res = await draftApi.addBelong(data);
      return res;
    },
  },
  reducers: {
    genBelongs(state, { payload: { belongs: list } }) {
      const belongs: any = list.filter((item) => item.belong === '');

      belongs.forEach((item: any) => {
        // eslint-disable-next-line no-param-reassign
        item.children = list.filter(({ belong }) => belong === item.key);
      });
      return {
        ...state,
        belongs,
        belongList: list,
      };
    },
    resetDraft(state) {
      return {
        ...state,
        title: '',
        belong: '',
        content: '',
        belongName: '请选择',
      };
    },
  },
};

export const actions = actionCreatorsCreator(model);
