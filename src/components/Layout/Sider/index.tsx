import { CSSProperties, useCallback } from 'react';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '@thunk/reducer';
import { globalActions } from '@thunk/models/global';

import styles from './index.less';

import SiderMenu from './Menu';

const drawerBodyStyle: CSSProperties = {
  padding: '0',
  background: `url("https://cdn.jsdelivr.net/gh/BNDong/Cnblogs-Theme-SimpleMemory@master/img/webp/home_top_bg.webp") no-repeat center`
};

const Sider = () => {
  const menuVisible = useSelector((state: StoreState) => state.global.menuVisible);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(globalActions.toggleMenuVisible(false));
  }, [dispatch]);

  // return screen.lg ? (
  //   <Layout.Sider className={styles.sider}>
  //     <SiderMenu />
  //   </Layout.Sider>
  // ) : (
  //   <Drawer
  //     placement="left"
  //     bodyStyle={{ padding: 0 }}
  //     closable={false}
  //     visible={menuVisible}
  //     onClose={handleClose}
  //   >
  //     <SiderMenu />
  //   </Drawer>
  // );
  return (
    <div>
      <Button
        className={styles.menuButton}
        icon={<MenuOutlined />}
        onClick={() => {
          dispatch(globalActions.toggleMenuVisible(true));
        }}
        ghost
      >
        MENU
      </Button>
      <Drawer
        placement="left"
        bodyStyle={drawerBodyStyle}
        closable={false}
        visible={menuVisible}
        onClose={handleClose}
      >
        <SiderMenu />
      </Drawer>
    </div>
  );
};

export default Sider;
