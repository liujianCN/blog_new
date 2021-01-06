import { create } from 'dva-core';
import createLoading from 'dva-loading';

const app = create();

app.use(createLoading());

// 批量引入models
const context = require.context('./models/', true, /\.js$/);
context.keys().forEach((i) => {
  app.model(context(i).default);
});

app.start();

// eslint-disable-next-line no-underscore-dangle
export default app._store;
