/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Card, List, Skeleton, Button, Grid } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { storeActions, StoreState } from '@/store/thunk';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Gauge from '@/components/Gauge';
import Radar from '@/components/Radar';
import styles from './index.less';

const { useBreakpoint } = Grid;

const Home: React.FC = () => {
  const { lg } = useBreakpoint();
  const dispatch = useDispatch();
  const { cardIntersect } = useSelector((state: StoreState) => state.common);
  const { page } = useSelector((state: StoreState) => state.home);

  useEffect(() => {
    // const io = new IntersectionObserver(([intersect]) => {
    //   dispatch(storeActions.common.reducers.save({ cardIntersect: intersect.isIntersecting }));
    // });
    // io.observe(document.getElementById('cardIntersect')!);
  }, [cardIntersect, dispatch]);
  useEffect(() => {
    if (page.length) return;
    dispatch(storeActions.home.effects.getBlogPage({ size: 10 }));
  }, [dispatch, page]);
  return (
    <div className={`${styles.home} ${lg ? styles.lg : ''}`}>
      <div className={styles.list}>
        {page.length ? (
          <List
            style={{ background: '#fff' }}
            dataSource={page}
            renderItem={({ updatedAt, belong, title, _id }) => (
              <List.Item>
                <Card bordered={false} style={{ width: '100%' }} bodyStyle={{ padding: '0 24px' }}>
                  <div className={styles.info}>
                    <p className={styles.meta}>
                      <span>{moment(updatedAt).format('MM-DD')}</span> · <span>{belong}</span>
                    </p>
                    <Link to={`/blog/${_id}`}>
                      <p className={styles.title}>{title}</p>
                    </Link>
                    <Button.Group size="small">
                      <Button>
                        <LikeOutlined /> 0
                      </Button>
                      <Button>
                        <MessageOutlined /> 0{/* <MessageTwoTone /> 0 */}
                      </Button>
                    </Button.Group>
                  </div>
                  {/* <img
                    src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bc4aa9350284169a9b93ddd28048ba8~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:120:120.awebp"
                    alt=""
                  /> */}
                </Card>
              </List.Item>
            )}
          />
        ) : (
          Array.from({ length: 5 }).map((_, i) => <Skeleton active key={i} />)
        )}
      </div>
      {lg && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 233,
          }}
        >
          <div className={`${styles.desc}`}>
            <Card title="完成率" bodyStyle={{ height: 200 }}>
              <Gauge />
            </Card>
            <Card title="分布" bodyStyle={{ height: 200, padding: '10px 0' }}>
              <Radar />
            </Card>
            <Card title="标签">1</Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
