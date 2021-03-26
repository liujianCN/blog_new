import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Layout from '@/components/Layout';
import Home from './home';
import Draft from './draft';
import Detail from './detail';
import Repos from './repos';
import Repo from './repos/repo';
import Example from './example';
import Login from './login';

import './app.less';
import '@/assets/css/draft.global.less';

moment.locale('zh-cn');

const routes = [
  {
    path: '/example',
    Component: Example,
  },
  {
    path: '/home',
    Component: Home,
  },
  {
    path: '/draft',
    Component: Draft,
  },
  {
    path: '/draft/:id',
    Component: Draft,
  },
  {
    path: '/blog/:id',
    Component: Detail,
  },
  // 仓库列表
  {
    path: '/repos',
    Component: Repos,
  },
  // 仓库详情
  {
    path: '/repos/:repo/:branch',
    Component: Repo,
  },
];

const RootRouter = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Layout>
            <Redirect path="/" exact to="/home" />
            {routes.map(({ path, Component }) => (
              <Route path={path} key={path} exact>
                <Component />
              </Route>
            ))}
          </Layout>
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

export default RootRouter;
