import { loginUserFailed, loginUserSuccess, logoutUserFailed, logoutUserSuccess, prepareUserFinished, USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST, USER_PREPARE_REQUEST } from './actions';
import { call, fork, put, take } from 'redux-saga/effects'
import { Api } from 'services/api';
import { getStorage } from './selectors';

export function* prepareUser(payload: any, api: Api) {
  const currentToken = payload.token;
  const { callback } = payload;

  try {
    if (!currentToken) {
      throw new Error(`토큰이 없습니다.`);
    }
    const { response } = yield call([api, api.post], '/api/v1/auths');
    const { token, user } = response
    const { accessToken } = token
    if (accessToken && user && user.userId) {
      getStorage().setItem('token', accessToken);
      api.setToken(accessToken);
      yield put(loginUserSuccess(user));
      yield callback ? callback(null, user) : null;
    } else {
      throw new Error(`토큰이 유효하지 않습니다.`)
    }
  } catch(e) {
    // getStorage().removeItem('token')
    api.unsetToken();
    yield put(prepareUserFinished())
    yield callback ? callback(e) : null;
  }
}

export function* loginUser({ username = '', password = '', callback = () => {}} : { username: string, password: string, callback: Function }, api: Api) {
  try {
    const { response } = yield call([api, api.post], '/api/v1/auths/login', { username, password });
    const { token, user } = response
    const { accessToken } = token
    getStorage().setItem('token', accessToken);
    api.setToken(accessToken);
    yield put(loginUserSuccess(user));
    yield callback ? callback(null, user) : null;
  } catch(e) {
    // getStorage().removeItem('token')
    api.unsetToken();
    yield put(loginUserFailed());
    yield callback(e)
  }
}

export function* logoutUser({ user = {}, callback = () => {}} : { user: any, callback: Function }, api: Api) {
  try {
    yield call([api, api.post], '/api/v1/auths/logout');
    getStorage().removeItem('token')
    api.unsetToken();
    yield put(logoutUserSuccess());
    yield callback ? callback() : null;
  } catch(e) {
    yield put(logoutUserFailed());
    yield callback ? callback(e) : null;
  }
}

export function* watchPrepareUser (api: Api) {
  // 최초 접속시
  const token = getStorage().getItem('token');
  if (token) {
    api.setToken(token);
  }
  yield call(prepareUser, { token }, api)
  // 이후
  while (true) {
    const { payload } = yield take(USER_PREPARE_REQUEST);
    yield call(prepareUser, payload, api)
  }
}

export function* watchLoginUser (api: Api) {
  while (true) {
    const { payload } = yield take(USER_LOGIN_REQUEST);
    yield call(loginUser, payload, api)
  }
}

export function* watchLogoutUser (api: Api) {
  while (true) {
    const { payload } = yield take(USER_LOGOUT_REQUEST);
    yield call(logoutUser, payload, api)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* ({ api }: { api: Api }) {
  yield fork(watchPrepareUser, api);
  yield fork(watchLoginUser, api);
  yield fork(watchLogoutUser, api);
}
