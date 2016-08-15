//import { get } from 'lodash'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export default function reducer(state={}, action) {
  const {type, result, args} = action
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: undefined,
        token: undefined,
        provider: undefined,
      }
    case '@@Login/OAuth2@then':
      return {
        ...state,
        user: result.user,
        token: result.credential.accessToken,
        provider: args.provider,
      }
  }
  return state
}
