import React, { ReactElement } from 'react';
import styles from './index.less';

interface Props {
  title?: ReactElement;
}
const Header: React.FC<Props> = ({ title }) => {
  return <header className={styles.header}>{title}</header>;
};

export default Header;
