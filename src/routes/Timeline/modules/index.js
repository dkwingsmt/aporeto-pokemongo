import { errorReducerFactory } from 'utils/actions'
import { combineReducers } from 'redux'

import draftReducer from './draft'

function alertReducer(state={}, action) {
  const {type} = action
  switch (type) {
    case '@@Timeline@Error':
      return {
        type: 'error',
        detail: action.error || undefined
      }
  }
  return state
}

export default combineReducers({
  alert: alertReducer,
  draft: draftReducer,
})

export const timelineError = errorReducerFactory('Timeline')
export const postError = errorReducerFactory('Timeline/Post')
