import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { get } from 'lodash'
import { observe } from 'redux-observers'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import createStore from './store/createStore'
import { loginSuccess, logoutSuccess } from './store/auth'
import AppContainer from './containers/AppContainer'
import { currentUserObserver } from './store/observers'

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA2myVJkO-gqrbKYTqAD2GVu2IIwoNi9b8",
  authDomain: "aporeto-pokemongo.firebaseapp.com",
  databaseURL: "https://aporeto-pokemongo.firebaseio.com",
  storageBucket: "aporeto-pokemongo.appspot.com",
})

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
})
window.store = store
window.getStore = (path) => path && path.length ? get(store.getState(), path) : store.getState()

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(loginSuccess(user))
  } else {
    store.dispatch(logoutSuccess())
  }
})

observe(store, [currentUserObserver])

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
    />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    })
  }
}

// ========================================================
// Go!
// ========================================================
render()
