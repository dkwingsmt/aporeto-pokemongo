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
        valid: true,
        user: action.user,
        // Hack. Should've directly used `facebook.com` as provider 
        // instead of `facebook`
        provider: action.user.providerData[0].providerId.split('.')[0],
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        valid: true,
        user: undefined,
        token: undefined,
        provider: undefined,
      }
    case '@@Login/OAuth2@then':
      return {
        ...state,
        valid: true,
        user: result.user,
        token: result.credential.accessToken,
        provider: args.provider,
      }
  }
  return state
}
