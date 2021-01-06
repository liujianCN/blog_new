import React, { memo } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { globalActions } from '@thunk/models/global';

import SiderMenu from '../Sider';

import styles from './index.less';

const SmHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.smHeader}>
      <MenuOutlined
        className={styles.fold}
        onClick={() => {
          dispatch(globalActions.toggleMenuVisible(true));
        }}
      />
      <Link to="/" className={styles.smLogo}>
        logo
      </Link>
      <SiderMenu />
    </div>
  );
};

export default memo(SmHeader);
