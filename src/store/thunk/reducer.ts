import { combineReducers } from 'redux';
import global, { IGlobalState } from './models/global';
import home, { IHomeState } from './models/home';
import repos, { IReposState } from './models/repos';
import draft, { IDraftState } from './models/draft';

export interface StoreState {
  global: IGlobalState;
  home: IHomeState;
  repos: IReposState;
  draft: IDraftState;
}

const reducer = combineReducers({
  global,
  home,
  repos,
  draft
});

export default reducer;
