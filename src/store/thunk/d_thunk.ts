/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { combineReducers, Dispatch, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { StoreState } from './index';

// interface Index {
//   [key: string]: any;
// }
export interface Action<T> {
  type: string;
  payload: T;
}
export type Effect<EP, R> = (data: EP) => Promise<R>;
export type Effects<EPs> = {
  [P in keyof EPs]: (
    payload: EPs[P],
    dispatch: Dispatch,
    getState: () => StoreState
  ) => Promise<any>;
};

export type Reducer<State, RP> = (state: State, action: Action<RP>) => State;
export type Reducers<State, RPs> = {
  [P in keyof RPs]: Reducer<State, RPs[P]>;
};

export interface Model<State = {}, EPs = {}, RPs = {}> {
  namespace: string;
  state: State;
  effects: Effects<EPs>;
  reducers: Reducers<State, RPs>;
}
const genDispatchType = (
  effectOrReducer: 'effect' | 'reducer',
  namespace: string,
  effectName: string
) => `@@_${effectOrReducer}_${namespace}_${effectName}`;

const mapToCreators = (model: any, type: 'effect' | 'reducer') => {
  const creators: any = {};
  Object.keys(model[`${type}s`]).forEach((effectKey) => {
    if (type === 'effect') {
      creators[effectKey] = (payload: any) => async (dispatch: any, getState: any) => {
        const effectName = genDispatchType('effect', model.namespace, effectKey);
        dispatch({ type: '@@_loading_show', effectType: effectName });
        dispatch({ type: `${effectName}_start` });
        try {
          return await model.effects[effectKey](payload, dispatch, getState);
        } finally {
          dispatch({ type: `${effectName}_end` });
          dispatch({ type: '@@_loading_hide', effectName });
        }
      };
    } else {
      creators[effectKey] = (payload: any) => {
        const effectName = genDispatchType('reducer', model.namespace, effectKey);
        return {
          type: effectName,
          payload,
        };
      };
    }
  });
  if (type === 'reducer') {
    creators.save = (payload: any) => {
      const effectName = genDispatchType('reducer', model.namespace, 'save');
      return {
        type: effectName,
        payload,
      };
    };
  }
  return creators;
};

// /**
//  * @param EP Effect Payload type
//  * @param RP Reducer Payload type
//  */
export interface Creator<T> {
  (data: T): Promise<any>;
}
export interface ReducerCreator<T> {
  (p: T): Action<T>;
}
export type ActionCreatorsCreator = <State, EP, RP>(
  model: Model<State, EP, RP>
) => {
  effects: { [P in keyof EP]: Creator<EP[P]> };
  reducers: {
    [P in keyof RP]: ReducerCreator<RP[P]>;
  } & {
    // save: <T extends State extends T ? Index : State>(p: T) => Action<T>;
    save: <T extends Partial<State>>(p: T) => Action<T>;
    // save: <T extends State extends T ? Pick<State, keyof T> : State>(p: T) => Action<T>;
  };
};

// type Models = { [key: string]: Model };

export const actionCreatorsCreator: ActionCreatorsCreator = (model) => ({
  effects: mapToCreators(model, 'effect'),
  reducers: mapToCreators(model, 'reducer'),
});

export const genRootReducer = (models: { [key: string]: Model }) => {
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
              ...payload,
            };
          },
          // TODO 类型不正确，需要调整
        }[type.replace(unit, '') as 'save'];
        return handler(state, action);
      }
      return state;
    };
  });
  return combineReducers(rootReducer);
};

// TODO genActions类型不正确
export const genActions = <Models extends { [key: string]: Model }>(models: Models) => {
  const actions: any = {};
  Object.keys(models).forEach((modelKey) => {
    actions[modelKey as any] = actionCreatorsCreator(models[modelKey] as any);
  });
  // eslint-disable-next-line no-unused-vars
  return actions as { [P in keyof Models]: ReturnType<ActionCreatorsCreator> };
};

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
// import { combineReducers, Dispatch, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

// interface Index {
//   [key: string]: any;
// }
// export interface Action<T> {
//   type: string;
//   payload: T;
// }
// export type Effect<EP, R> = (data: EP) => Promise<R>;
// export type Effects<EPs> = {
//   [P in keyof EPs]: (payload: EPs[P]) => (dispatch: Dispatch) => Promise<any>;
// };

// export type Reducer<State, RP> = (state: State, action: Action<RP>) => State;
// export type Reducers<State, RPs> = {
//   [P in keyof RPs]: Reducer<State, RPs[P]>;
// };

// export interface Model<State = {}, EPs = {}, RPs = {}> {
//   namespace: string;
//   state: State;
//   effects: Effects<EPs>;
//   reducers: Reducers<State, RPs>;
// }
// const genDispatchType = (
//   effectOrReducer: 'effect' | 'reducer',
//   namespace: string,
//   effectName: string
// ) => `@@_${effectOrReducer}_${namespace}_${effectName}`;

// const mapToCreators = (model: any, type: 'effect' | 'reducer') => {
//   const creators: any = {};
//   Object.keys(model.effects).forEach((effectKey) => {
//     creators[effectKey] = (payload: any) => async (dispatch: any) => {
//       const effectName = genDispatchType('effect', model.namespace, effectKey);
//       dispatch({ type: '@@_loading_show', effectType: effectName });
//       dispatch({ type: `${effectName}_start` });
//       try {
//         return await model.effects[effectKey](payload, dispatch);
//       } finally {
//         dispatch({ type: `${effectName}_end` });
//         dispatch({ type: '@@_loading_hide', effectName });
//       }
//     };
//   });
//   return creators;
// };

// // /**
// //  * @param EP Effect Payload type
// //  * @param RP Reducer Payload type
// //  */
// export interface Creator<T> {
//   (data: T): Promise<any>;
// }
// export type ActionCreatorsCreator = <State, EP, RP>(
//   model: Model<State, EP, RP>
// ) => {
//   effects: { [P in keyof EP]: Creator<EP[P]> };
//   reducers: {
//     [P in keyof RP]: Creator<RP[P]>;
//   } & {
//     // TODO save类型
//     // save: Creator<Partial<State>>;
//     // save: <T extends keyof State>(name: T, value: State[T]) => Action<{ T: State[T] }>;
//     // save: <T extends State>(payload: { [P in keyof]}) => Action<T>;
//     save: <T extends State extends T ? Index : State>(p: T) => Action<T>;
//   };
// };

// // interface C<M extends Model> {
// //   effects: { [P in keyof Pick<M, 'effects'>]: Creator<Pick<M, 'effects'>[P]> };
// //   reducers: {
// //     [P in keyof Pick<M, 'reducers'>]: Creator<Pick<M, 'reducers'>[P]>;
// //   } & {
// //     save: <T extends Pick<M, 'state'> extends T ? Index : Pick<M, 'state'>>(p: T) => Action<T>;
// //   };
// // }
// type C<E> = {
//   [P in keyof E[keyof E]]: Creator<E[keyof E][P]>;
// };

// // type Models = { [key: string]: Model };

// export const actionCreatorsCreator: ActionCreatorsCreator = (model) => ({
//   effects: mapToCreators(model, 'effect'),
//   reducers: mapToCreators(model, 'reducer')
// });

// export const genRootReducer = (models: { [key: string]: Model }) => {
//   const rootReducer: any = {};
//   Object.keys(models).forEach((modelKey) => {
//     const { namespace, reducers = {}, state: defaultState } = models[modelKey];
//     rootReducer[namespace] = (state = defaultState, action: Action<any>) => {
//       const { type } = action;
//       const unit = `@@_reducer_${namespace}_`;
//       if (type.startsWith(unit)) {
//         const handler = {
//           ...reducers,
//           // eslint-disable-next-line @typescript-eslint/no-shadow
//           save(state: any, { payload }: Action<any>) {
//             return {
//               ...state,
//               ...payload
//             };
//           }
//           // TODO 类型不正确，需要调整
//         }[type.replace(unit, '') as 'save'];
//         return handler(state, action);
//       }
//       return state;
//     };
//   });
//   return combineReducers(rootReducer);
// };

// export const genActions = <Models extends { [key: string]: Model }>(models: Models) => {
//   const actions: { [P in keyof Models]?: C<Pick<Models[P], 'effects'>> } = {};
//   Object.keys(models).forEach((modelKey) => {
//     if (modelKey in models) {
//       (actions[modelKey as keyof Models] as any) = actionCreatorsCreator(models[modelKey]);
//     }
//   });
//   return actions;
// };

// const composeEnhancers =
//   typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//       })
//     : compose;

// export const enhancer = composeEnhancers(
//   applyMiddleware(thunk)
//   // other store enhancers if any
// );
