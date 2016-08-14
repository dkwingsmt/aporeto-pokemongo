import firebase from 'firebase'
import { errorReducerFactory } from 'utils/actions'
import { PromiseAction } from 'store/promise-action'
import { combineReducers } from 'redux'

import draftReducer from './draft'

function errorReducer(state=null, action) {
  const {type} = action
  switch (type) {
    case '@@Timeline@Error':
      return action.error || null
  }
  return state
}

export default combineReducers({
  error: errorReducer,
  draft: draftReducer,
})

export const timelineError = errorReducerFactory('Timeline')
export const postError = errorReducerFactory('Timeline/Post')

export function submitPost(userId, pmId) {
  const postContents = {
    userId: userId,
    pmId: pmId,
    time: Date.now(),
  }
  return new PromiseAction('@@Timeline/submit', () => {
    return firebase.database().ref('posts/' + userId).push(postContents)
  })
}
