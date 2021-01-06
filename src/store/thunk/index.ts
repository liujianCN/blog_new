/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { createStore, applyMiddleware, compose, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import reducer, { StoreState } from './reducer';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
const store = createStore(reducer, enhancer);

export type Dispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action<string>
>;
export const useThunkDispatch = () => useDispatch<Dispatch>();
export default store;
