/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { Card, List, Space, Divider, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import { StoreState } from '@thunk/reducer';
// import { reposActions } from '@thunk/models/repos';
import moment from 'moment';

import styles from './index.less';

const Repo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { repo, branch } = useParams<{ repo: string; branch: string }>();
  console.log(repo, branch);
  // const { branchList, commitList } = useSelector((state: StoreState) => state.repos);

  useEffect(() => {
    // dispatch(reposActions.asyncActionGeiGithubRepoBranches(repo));
  }, [dispatch, repo]);

  useEffect(() => {
    // dispatch(reposActions.asyncActionGeiGithubRepoCommits(repo, branch));
  }, [dispatch, repo, branch]);

  const handleBranchChange = useCallback(
    (value) => {
      history.replace(`/repos/${repo}/${value}`);
    },
    [history, repo]
  );
  return (
    <Card
    // title={
    //   <Select value={branch} style={{ width: 120 }} onChange={handleBranchChange}>
    //     {branchList.map(({ name }) => (
    //       <Select.Option key={name} value={name}>
    //         {name}
    //       </Select.Option>
    //     ))}
    //   </Select>
    // }
    >
      {/* <List
        // bordered
        dataSource={commitList}
        renderItem={({
          sha,
          commit: {
            author: { name, date },
            message
          }
        }) => (
          <List.Item className={styles.repoItem}>
            <div>
              <div>
                {message}
                {sha.slice(0, 6)}
              </div>
              <Space className={styles.subtext} split={<Divider type="vertical" />}>
                <div>{name}</div>
                <div>提交于{moment(date).format('MMM-Do HH:mm')}</div>
              </Space>
            </div>
          </List.Item>
        )}
      /> */}
    </Card>
  );
};

export default Repo;
