import firebase from 'firebase'
import { errorReducerFactory } from 'utils/actions'
import { PromiseAction } from 'store/promise-action'

export default function reducer(state={}, action) {
  const {type} = action
  switch (type) {
    case '@@Login@Error':
      return {
        ...state,
        alert: {
          type: 'error',
          detail: {message: action.error},
        },
      }
  }
  return state
}

export const loginError = errorReducerFactory('Login')

export function loginOAuth2(providerName, provider) {
  return new PromiseAction('@@Login/OAuth2', () =>
    firebase.auth().signInWithPopup(provider)
      .catch((err) => this.props.loginError(err)),
    {provider: providerName}
  )
}
