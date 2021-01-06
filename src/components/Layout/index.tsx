import React from 'react';
import Sider from './Sider';
// import Header from './Header';
import Footer from './Footer';
import styles from './index.less';

const AppLayout: React.FC = ({ children }) => {
  return (
    <section style={{ height: '100%' }}>
      {/* <Header /> */}
      <Sider />
      <main className={styles.main}>{children}</main>
      <Footer />
      {/* </Layout> */}
    </section>
  );
};
export default AppLayout;
