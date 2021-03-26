/* eslint-disable @typescript-eslint/no-shadow */
import React, { memo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
// import HeaderMenu from '../Header/Menu';

import styles from './index.less';

const menu = [
  {
    title: '代码',
    link: '/repos',
  },
  {
    title: 'xie xie',
    link: '/draft',
  },
  {
    title: '基础',
    children: [
      {
        title: 'html',
      },
      {
        title: 'css',
      },
      {
        title: 'js',
      },
    ],
  },
  {
    title: '框架',
    children: [
      {
        title: 'react',
      },
      {
        title: 'redux',
      },
      {
        title: 'router',
      },
      {
        title: 'axios',
      },
    ],
  },
];
const SiderMenu = () => {
  const location = useLocation();
  return (
    <Menu
      mode="inline"
      inlineIndent={40}
      selectedKeys={[location.pathname]}
      className={styles.menu}
    >
      {/* {!Grid.useBreakpoint().lg && <HeaderMenu mode="vertical" />} */}
      {menu.map(({ title, children, link }) =>
        children ? (
          <Menu.ItemGroup key={title} title={title}>
            {children.map(({ title: link }) => (
              <Menu.Item key={`/${link}`}>
                <Link to={`/${link}`}>{link}</Link>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        ) : (
          <Menu.Item key={`${link}`}>
            <Link to={`${link}`}>{title}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default memo(SiderMenu);
