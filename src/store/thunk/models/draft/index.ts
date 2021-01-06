import { AnyAction } from 'redux';
import * as reposTypes from './types';

export * as reposActions from './actions';

export interface IBlogDetail {
  _id: string;
  title: string;
  belong: string;
  content: string;
}

export type IDraftState = Omit<IBlogDetail, '_id'>;

const initialState: IDraftState = {
  title: '',
  belong: '',
  content: ''
};

export default (
  state: IDraftState = initialState,
  action: IDraftState & AnyAction
): IDraftState => {
  switch (action.type) {
    case reposTypes.SAVE_DRAFT_BELONG:
      return {
        ...state,
        belong: action.belong
      };
    case reposTypes.SAVE_DRAFT_TITLE:
      return {
        ...state,
        title: action.title
      };
    case reposTypes.SAVE_DRAFT_CONTENT:
      return {
        ...state,
        content: action.content
      };
    default:
      return state;
  }
};
