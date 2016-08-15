import { errorReducerFactory } from 'utils/actions'
import { combineReducers } from 'redux'

import draftReducer from './draft'

function postsReducer(state={}, action) {
  const {type, key, value} = action 
  switch (type) {
    case '@@Timeline/posts/add':
      return {
        ...state,
        [key]: value,
      }
    case '@@Timeline/posts/clear':
      return {}
  }
  return state
}

function alertReducer(state={}, action) {
  const {type} = action
  switch (type) {
    case '@@Timeline@Error':
      return {
        type: 'error',
        detail: action.error || undefined,
      }
  }
  return state
}

export default combineReducers({
  alert: alertReducer,
  draft: draftReducer,
  posts: postsReducer,
})

export const timelineError = errorReducerFactory('Timeline')
export const postError = errorReducerFactory('Timeline/Post')

export function addPost(key, value) {
  return {
    type: '@@Timeline/posts/add',
    key,
    value,
  }
}

export function clearAllPosts() {
  return {
    type: '@@Timeline/posts/clear'
  }
}
