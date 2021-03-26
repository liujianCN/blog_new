import React, { memo } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { globalActions } from '@/store/saga';

// import SiderMenu from '../Sider';
import ScreenFull from '../../ScreenFull';

import styles from './index.less';

const SmHeader = () => {
  // const dispatch = useDispatch();
  return (
    <div className={styles.smHeader}>
      <MenuOutlined
        className={styles.fold}
        onClick={() => {
          // dispatch(globalActions.toggleMenuVisible(true));
        }}
      />
      <Link to="/" className={styles.smLogo}>
        logo
      </Link>
      <ScreenFull />
      {/* <SiderMenu /> */}
    </div>
  );
};

export default memo(SmHeader);
