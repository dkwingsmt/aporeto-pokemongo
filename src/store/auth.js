export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function loginSuccess(user) {
  console.log('loginSuccess')
  return {
    type: LOGIN_SUCCESS,
    user,
  }
}

export function logoutSuccess() {
  console.log('logoutSuccess')
  return {
    type: LOGOUT_SUCCESS,
  }
}

export default function reducer(state={}, action) {
  const {type} = action
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
      }
  }
  return state
}
