import { memo } from 'react';
import { Grid } from 'antd';
import LgHeader from './lg';
import MdHeader from './md';

const { useBreakpoint } = Grid;
const Header = () => {
  const screen = useBreakpoint();
  return screen.lg ? <LgHeader /> : <MdHeader />;
};

export default memo(Header);
