import { AnyAction, combineReducers } from 'redux';
import { call, takeEvery } from 'redux-saga/effects';

// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
function* fetchUser(action: { x: string }) {
  const res = yield call(
    () =>
      new Promise((r) => {
        setTimeout(r, 2000, action.x);
      })
  );
  console.log(res);
}

/*
  在每个 `USER_FETCH_REQUESTED` action 被 dispatch 时调用 fetchUser
  允许并发（译注：即同时处理多个相同的 action）
*/
export function* mySaga() {
  yield takeEvery<any>('USER_FETCH_REQUESTED', fetchUser);
}

/*
  也可以使用 takeLatest

  不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
  如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }
const initialState: IState = {
  x: 1
};

interface IState {
  x: number;
}

const aReducer = (state: IState = initialState, action: AnyAction & IState): IState => {
  switch (action.type) {
    case 'x':
      return {
        ...state,
        x: action.x
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  aReducer
});
