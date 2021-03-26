import { actionCreatorsCreator, Model } from '@store/d_thunk';

export interface State {
  repoList: string[];
  branchList: string[];
  commitList: string[];
}

const initialState: State = {
  repoList: [],
  branchList: [],
  commitList: [],
};

export interface EffectsPayload {}
export interface ReducersPayload {}

export const model: Model<State, EffectsPayload, ReducersPayload> = {
  namespace: 'repos',
  state: initialState,
  effects: {},
  reducers: {},
};

export const actions = actionCreatorsCreator(model);
