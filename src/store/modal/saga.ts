import { MODAL_SHOW, MODAL_HIDE, ModalActions } from './actions';
import { fork, take } from 'redux-saga/effects'

export function* watchModalShow() {
  while (true) {
    const { payload }: ModalActions = yield take(MODAL_SHOW);
    return payload.callback ? payload.callback(null, payload) : null;
  }
}

export function* watchModalHide() {
  while (true) {
    const { payload }: ModalActions = yield take(MODAL_HIDE);
    return payload.callback ? payload.callback(null, payload) : null;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(watchModalShow);
  yield fork(watchModalHide);
}