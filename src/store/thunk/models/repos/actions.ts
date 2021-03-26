import { Dispatch } from 'redux';
import * as githubServer from '@/server/github';
import * as reposTypes from './types';

// eslint-disable-next-line import/prefer-default-export
export const asyncActionGeiGithubRepos = () => async (dispatch: Dispatch) => {
  const data = await githubServer.getGithubRepos();
  dispatch({
    type: reposTypes.SAVE_REPOS_LIST,
    repoList: data,
  });
};
export const asyncActionGeiGithubRepoBranches = (repo: string) => async (dispatch: Dispatch) => {
  const data = await githubServer.getGithubBrachList(repo);
  dispatch({
    type: reposTypes.SAVE_REPO_BRANCH_LIST,
    branchList: data,
  });
};
export const asyncActionGeiGithubRepoCommits = (repo: string, branch: string) => async (
  dispatch: Dispatch,
) => {
  const data = await githubServer.getGithubBrachCommitList(repo, branch);
  dispatch({
    type: reposTypes.SAVE_REPO_BRANCH_COMMIT_LIST,
    commitList: data,
  });
};
