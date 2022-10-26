import { UserState, preparedState } from "./reducer";

// 유저 로그인 체크
export const USER_PREPARE_REQUEST = 'USER_PREPARE_REQUEST' as const;
export const USER_PREPARE_FINISHED = 'USER_PREPARE_FINISHED' as const;

// 유저 찾기
// export const USER_FIND_REQUEST = 'USER_FIND_REQUEST' as const

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST' as const
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS' as const
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED' as const

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST' as const
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS' as const 
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED' as const 

export const prepareUser = (token: string, callback: Function = () => {}) => ({
  type: USER_PREPARE_REQUEST,
  payload: { token, callback },
})

export const loginUser = (username: string= '', password: string = '', callback: Function = () => {}) => ({
  type: USER_LOGIN_REQUEST,
  payload: { username, password, callback },
})

export const logoutUser = (callback: Function = () => {}) => ({
  type: USER_LOGOUT_REQUEST,
  payload: { callback },
})

export const prepareUserFinished = (user: any = {}) => ({
  type: USER_PREPARE_FINISHED,
  payload: { user }
})

export const loginUserSuccess= (user: any = {}) => ({
  type: USER_LOGIN_SUCCESS,
  payload: { user }
})

export const loginUserFailed= (user: any= {}) => ({
  type: USER_LOGIN_FAILED,
  payload: { user }
})

export const logoutUserSuccess= () => ({
  type: USER_LOGOUT_SUCCESS,
  payload: { }
})

export const logoutUserFailed = () => ({
  type: USER_LOGOUT_FAILED,
  payload: { }
})

export type UserActions = 
  | ReturnType<typeof prepareUser>
  | ReturnType<typeof loginUser>
  | ReturnType<typeof logoutUser>
  | ReturnType<typeof prepareUserFinished>
  | ReturnType<typeof loginUserSuccess>
  | ReturnType<typeof loginUserFailed>
  | ReturnType<typeof logoutUserSuccess>
  | ReturnType<typeof logoutUserFailed>