import React, { memo, useEffect } from 'react';
import { Input, Avatar, Button, Space, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { storeActions } from '@/store/thunk';
import Logo from '../../Logo';
// import { Menu, Input, Avatar, Dropdown } from 'antd';
// import { BellOutlined } from '@ant-design/icons';

import styles from './index.less';

const LgHeader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // const io = new IntersectionObserver(([intersect]) => {
    //   dispatch(storeActions.common.reducers.save({ headerIntersect: intersect.isIntersecting }));
    // });
    // io.observe(document.getElementById('header')!);
  }, [dispatch]);
  return (
    <div className={styles.lgHeader} id="header">
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.right}>
          <Select defaultValue="推荐" style={{ width: 100 }}>
            <Select.Option value="推荐">推荐</Select.Option>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
          </Select>
          <Input.Search style={{ width: 200 }} placeholder="搜索" />
          <div style={{ flex: 1 }} />
          <div>
            <Space>
              <Button>
                <Link to="/draft">记录</Link>
              </Button>
              <Avatar />
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LgHeader);
