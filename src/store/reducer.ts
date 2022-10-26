import { combineReducers } from 'redux';
import { reducer as thunk } from 'redux-saga-thunk';
import modal from './modal/reducer';
import user from './user/reducer';

const reducers = {
  modal,
  user,
  thunk
}

const rootReducer = combineReducers(reducers)

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;