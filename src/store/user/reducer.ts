import { UserActions, USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAILED, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_PREPARE_FINISHED, USER_PREPARE_REQUEST, } from "./actions";

export type UserState = {
  _prepare: boolean;
  [key: string]: any;
}

export const initialState: UserState = { _prepare: false };
export const preparedState: UserState = { _prepare: true };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: UserState = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case USER_PREPARE_REQUEST:
      return {
        ...state,
        ...preparedState
      }
    case USER_PREPARE_FINISHED:
      return {
      ...action.payload.user,
      ...preparedState
    }
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        ...preparedState
      }
    case USER_LOGIN_SUCCESS:
      return {
      ...action.payload.user,
      ...preparedState
    }
    case USER_LOGIN_FAILED:
      return {
      ...action.payload.user,
      ...preparedState
    }
    case USER_LOGOUT_REQUEST:
      return {
        ...preparedState
      }
    case USER_LOGOUT_SUCCESS:
      return {
        ...preparedState
      }
    case USER_LOGOUT_FAILED:
      return {
        ...preparedState
      }
    default: 
      return state;
  }
}
