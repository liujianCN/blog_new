/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { combineReducers } from 'redux';
import sagaEffects, { put, takeLatest } from 'redux-saga/effects';

interface Index {
  [key: string]: any;
}
interface Action<P> {
  type: string;
  payload: P;
}

export type Effect<EP> = (action: Action<EP>) => Generator;
export type Effects<EPs> = {
  [P in keyof EPs]: Effect<EPs[P]>;
};

export type Reducer<State, RP> = (state: State, action: Action<RP>) => State;
export type Reducers<State, RPs> = {
  [P in keyof RPs]: Reducer<State, RPs[P]>;
};

export interface Model<State, EP, RP> {
  namespace: string;
  state: State;
  effects: Effects<EP>;
  reducers: Reducers<State, RP>;
}
const genDispatchType = (
  effectOrReducer: 'effect' | 'reducer',
  namespace: string,
  effectName: string
) => `@@_${effectOrReducer}_${namespace}_${effectName}`;

const mapToCreators = (model: any, type: 'effect' | 'reducer') => {
  const creators: any = {};
  Object.keys(model[`${type}s`]).forEach((key) => {
    creators[key] = (payload: any) => ({
      // type: `@@${type.replace('s', '')}_${model.namespace}_${key}`,
      type: genDispatchType(type, model.namespace, key),
      payload
    });
  });
  return creators;
};
/**
 * @param EP Effect Payload type
 * @param RP Reducer Payload type
 */
export interface Creator<T> {
  (payload: T): Promise<any> & Action<T>;
}
export type ActionCreatorsCreator = <State, EP, RP>(
  model: Model<State, EP, RP>
) => {
  effects: { [P in keyof EP]: Creator<EP[P]> };
  reducers: {
    [P in keyof RP]: Creator<RP[P]>;
  } & {
    // TODO save类型
    save: Creator<Partial<State>>;
    // save: <T extends keyof State>(name: T, value: State[T]) => Action<{ T: State[T] }>;
    // save: <T extends State>(payload: { [P in keyof]}) => Action<T>;
    // save: (payload: { [K in keyof State]: State[K] }) => Action<typeof payload>;
  };
};
export const actionCreatorsCreator: ActionCreatorsCreator = (model) => ({
  effects: mapToCreators(model, 'effect'),
  reducers: mapToCreators(model, 'reducer')
});

const effectWithLoading = (effect: Effect<unknown>, namespace: string) =>
  function* (action: Action<any>) {
    const { type: effectType, resolve, reject }: any = action;
    try {
      yield put({ type: '@@_loading_show', effectType });
      yield put({ type: `${effectType}_start` });
      const res = yield effect(action);
      resolve(res);
      yield put({ type: `${effectType}_end` });
      yield put({ type: '@@_loading_hide', effectType });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  };
export const getRootSaga = (models: { [key: string]: Model<any, any, any> }) => {
  return function* rootSaga() {
    for (const modelKey in models) {
      if (Object.prototype.hasOwnProperty.call(models, modelKey)) {
        const { effects = {}, namespace } = models[modelKey];
        for (const effectKey in effects) {
          if (Object.prototype.hasOwnProperty.call(effects, effectKey)) {
            const effect = effects[effectKey];
            yield takeLatest(
              genDispatchType('effect', namespace, effect.name),
              effectWithLoading(effect, namespace)
            );
          }
        }
      }
    }
  };
};

export const getRootReducer = (models: { [key: string]: Model<any, any, any> }) => {
  const rootReducer: any = {};
  Object.keys(models).forEach((modelKey) => {
    const { namespace, reducers = {}, state: defaultState } = models[modelKey];
    rootReducer[namespace] = (state = defaultState, action: Action<any>) => {
      const { type } = action;
      const unit = `@@_reducer_${namespace}_`;
      if (type.startsWith(unit)) {
        const handler = {
          ...reducers,
          // eslint-disable-next-line @typescript-eslint/no-shadow
          save(state: any, { payload }: Action<any>) {
            return {
              ...state,
              ...payload
            };
          }
          // TODO 类型不正确，需要调整
        }[type.replace(unit, '') as 'save'];
        return handler(state, action);
      }
      return state;
    };
  });
  return combineReducers(rootReducer);
};
