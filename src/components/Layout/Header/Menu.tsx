import React, { FC, memo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const menu = [
  {
    title: '代码',
    link: '/repos'
  },
  {
    title: 'xie xie',
    link: '/draft'
  }
];

interface IProps {
  mode?: 'horizontal' | 'vertical';
}

const HeaderMenu: FC<IProps> = ({ mode = 'horizontal' }) => {
  const location = useLocation();
  return (
    <Menu mode={mode} selectedKeys={[location.pathname]}>
      {menu.map(({ title, link }) => (
        <Menu.Item key={`${link}`}>
          <Link to={`${link}`}>{title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default memo(HeaderMenu);
