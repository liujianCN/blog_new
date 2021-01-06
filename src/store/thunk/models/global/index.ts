import { AnyAction } from 'redux';
import * as globalTypes from './types';

export * as globalActions from './actions';

const initialState = {
  menuVisible: false
};

export type IGlobalState = Readonly<typeof initialState>;

export default (state: IGlobalState = initialState, action: AnyAction): IGlobalState => {
  switch (action.type) {
    case globalTypes.GLOBAL_TOGGLE_MENU_VISIBLE:
      return {
        ...state,
        menuVisible: action.menuVisible
      };
    default:
      return state;
  }
};
