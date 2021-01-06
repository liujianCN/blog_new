import React, { memo } from 'react';
import useScreenfull from '@/hooks/useScreenfull';
import styles from './index.less';

const Footer = () => {
  const [isScreenfull, toggle] = useScreenfull();
  console.log(isScreenfull);
  return (
    <footer className={styles.footer} onClick={toggle}>
      <div className={`${styles.footerBg1}`} />
      <div className={`${styles.footerBg2}`} />
      <div className={`${styles.footerBg3}`} />
      123
    </footer>
  );
};

export default memo(Footer);
