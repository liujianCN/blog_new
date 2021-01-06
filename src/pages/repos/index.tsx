import React, { useEffect } from 'react';
import { Card, List, Space, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StoreState } from '@thunk/reducer';
import { reposActions } from '@thunk/models/repos';
import moment from 'moment';

import styles from './index.less';

const Repos = () => {
  const dispatch = useDispatch();
  const { repoList } = useSelector((state: StoreState) => state.repos);
  useEffect(() => {
    dispatch(reposActions.asyncActionGeiGithubRepos());
  }, [dispatch]);
  return (
    <Card title="代码库" extra="添加代码库">
      <List
        // bordered
        dataSource={repoList}
        renderItem={({ name, description, created_at, updated_at, default_branch }) => (
          <List.Item className={styles.repoItem}>
            <div>
              <div>
                <Link className={styles.title} to={`/repos/${name}/${default_branch}`}>
                  {name}
                </Link>
              </div>
              {/* <div className={styles.description}>

              </div> */}
              <Space className={styles.subtext} split={<Divider type="vertical" />}>
                <div>{description}</div>
                <div>创建于{moment(created_at).format('MM-DD HH:mm')}</div>
                <div>更新于{moment(updated_at).format('MM-DD HH:mm')}</div>
              </Space>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Repos;
