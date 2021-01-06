import { Model } from 'dva-core';

const defaultState = {
  total: 30,
  position: {}
};
const BaseModel: Model = {
  namespace: 'common',

  state: defaultState,

  effects: {},

  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  }
};

export default BaseModel;
