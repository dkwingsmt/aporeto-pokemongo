import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import auth from './auth'
import profiles from './profiles'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    auth,
    profiles,
    ...asyncReducers,
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
