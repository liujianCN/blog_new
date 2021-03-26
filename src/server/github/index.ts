import { githubRequest as request } from '@/utils/request';

export type GithubReposList = Array<{
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  default_branch: string;
}>;
export const getGithubRepos = () => {
  return request.get<GithubReposList>('/users/liujiancn/repos');
};

export type GithubBrachList = Array<{ name: string }>;
export const getGithubBrachList = (repo: string) => {
  return request.get<GithubBrachList>(`/repos/liujiancn/${repo}/branches`);
};

export type GithubBrachCommitList = Array<{
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
}>;
export const getGithubBrachCommitList = (repo: string, branch: string) => {
  return request.get<GithubBrachCommitList>(`/repos/liujianCN/${repo}/commits?sha=${branch}`);
};
