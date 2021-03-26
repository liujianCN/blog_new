import React from 'react';
// import Sider from './Sider';
import Header from './Header';
// import Footer from './Footer';
import styles from './index.less';

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <section className={styles.section}>
        {/* <Sider /> */}
        <main className={styles.main}>{children}</main>
        {/* <Footer /> */}
      </section>
    </>
  );
};
export default AppLayout;
