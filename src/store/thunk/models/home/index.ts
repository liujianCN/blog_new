import { AnyAction } from 'redux';
import * as homeTypes from './types';

export * as homeActions from './actions';

const initialState = {
  number: 0
};

export type IHomeState = Readonly<typeof initialState>;

export default (state: IHomeState = initialState, action: AnyAction) => {
  switch (action.type) {
    case homeTypes.HOME_ADD:
      return {
        ...state,
        number: state.number + (action.number || 1)
      };
    case homeTypes.HOME_MIN:
      return {
        ...state,
        number: state.number - (action.number || 1)
      };
    default:
      return state;
  }
};
