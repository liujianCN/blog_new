import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages';
import { store } from './store/thunk';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
