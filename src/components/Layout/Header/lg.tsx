import React, { memo } from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
// import { Menu, Input, Avatar, Dropdown } from 'antd';
// import { BellOutlined } from '@ant-design/icons';

import ScreenFull from '@/components/ScreenFull';
import HeaderMenu from './Menu';
import styles from './index.less';

const LgHeader = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>logo</div>
      </Link>
      <div className={styles.right}>
        <Input.Search style={{ width: 200 }} />
        <div style={{ flex: 1 }} />
        {/* <div>
          <Dropdown
            className={styles.headerItem}
            overlay={
              <Menu>
                <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    2nd menu item
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                    3rd menu item
                  </a>
                </Menu.Item>
              </Menu>
            }
          >
            <div>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              这三
            </div>
          </Dropdown>
        </div> */}
        <HeaderMenu />
        <ScreenFull />
      </div>
    </div>
  );
};

export default memo(LgHeader);
