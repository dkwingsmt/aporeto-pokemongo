import firebase from 'firebase'

export const mustLoggedIn = (store) => (nextState, replace) => {
  if (!store.getState().auth.user) {
    console.log('must login!', nextState)
    replace('/login')
  }
}

export const mustLoggedOut = (store) => (nextState, replace) => {
  console.log('checking must logout', firebase.auth().currentUser)
  if (store.getState().auth.user) {
    console.log('must logout!', nextState)
    replace('/timeline')
  }
}
