import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';
// import { StoreState } from '@thunk/reducer';
// import { reposActions } from '@thunk/models/repos';

const Repos = () => {
  const dispatch = useDispatch();
  // const { repoList } = useSelector((state) => state.repos);
  useEffect(() => {
    // dispatch(reposActions.asyncActionGeiGithubRepos());
  }, [dispatch]);
  return (
    <Card title="代码库" extra="添加代码库">
      {/* <List
        dataSource={repoList}
        renderItem={({ name, description, created_at, updated_at, default_branch }) => (
          <List.Item className={styles.repoItem}>
            <div>
              <div>
                <Link className={styles.title} to={`/repos/${name}/${default_branch}`}>
                  {name}
                </Link>
              </div>
              <Space className={styles.subtext} split={<Divider type="vertical" />}>
                <div>{description}</div>
                <div>创建于{moment(created_at).format('MM-DD HH:mm')}</div>
                <div>更新于{moment(updated_at).format('MM-DD HH:mm')}</div>
              </Space>
            </div>
          </List.Item>
        )}
      /> */}
    </Card>
  );
};

export default Repos;
