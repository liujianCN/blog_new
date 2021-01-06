import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Layout from '@components/Layout';
import Home from './home';
import Draft from './draft';
import Repos from './repos';
import Repo from './repos/repo';

import './app.less';

moment.locale('zh-cn');

const routes = [
  {
    path: '/home',
    Component: Home
  },
  {
    path: '/draft',
    Component: Draft
  },
  {
    path: '/draft/:id',
    Component: Draft
  },
  // 仓库列表
  {
    path: '/repos',
    Component: Repos
  },
  // 仓库详情
  {
    path: '/repos/:repo/:branch',
    Component: Repo
  }
];

export default () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Layout>
          <Switch>
            <Redirect path="/" exact to="/home" />
            {routes.map(({ path, Component }) => (
              <Route path={path} key={path} exact>
                <Component />
              </Route>
            ))}
          </Switch>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};
