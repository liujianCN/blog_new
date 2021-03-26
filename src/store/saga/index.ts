import { createStore, applyMiddleware, compose, AnyAction, Action } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, rootSaga } from './models';

const promiseMiddleware = () => (next: any) => (action: Action<string>) => {
  // const { type } = action;
  // if (type.startsWith('@@_effect_')) {
  return new Promise((resolve, reject) => {
    next({
      resolve,
      reject,
      ...action
    });
  });
  // }
  // return next(action);
};
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(promiseMiddleware, sagaMiddleware)
  // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;
