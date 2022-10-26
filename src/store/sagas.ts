import { all, fork } from 'redux-saga/effects'
import modal from './modal/saga';
import user from './user/saga';

const sagas = [
  modal,
  user
]

// eslint-disable-next-line import/no-anonymous-default-export
export default function* (services = {}) {
  yield all(sagas.map((saga: any) => fork(saga, services)));
}