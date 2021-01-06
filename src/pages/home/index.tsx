import React, { useEffect } from 'react';
import request from '@utils/request';
import styles from './index.less';

const Home: React.FC = () => {
  useEffect(() => {
    request.get('https://liujiancn.cn/api/v1/blog/5fe98195a0023c0a5369d9cd').then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div className={styles.home}>
      <header className={styles.header}>123</header>
    </div>
  );
};

export default Home;
