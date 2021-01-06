import { AnyAction } from 'redux';
import { GithubBrachList, GithubReposList, GithubBrachCommitList } from '@server/github';
import * as reposTypes from './types';

export * as reposActions from './actions';

export interface IReposState {
  repoList: GithubReposList;
  branchList: GithubBrachList;
  commitList: GithubBrachCommitList;
}

const initialState: IReposState = {
  repoList: [],
  branchList: [],
  commitList: []
};

export default (state: IReposState = initialState, action: AnyAction): IReposState => {
  switch (action.type) {
    case reposTypes.SAVE_REPOS_LIST:
      return {
        ...state,
        repoList: action.repoList
      };
    case reposTypes.SAVE_REPO_BRANCH_LIST:
      return {
        ...state,
        branchList: action.branchList
      };
    case reposTypes.SAVE_REPO_BRANCH_COMMIT_LIST:
      return {
        ...state,
        commitList: action.commitList
      };
    default:
      return state;
  }
};
