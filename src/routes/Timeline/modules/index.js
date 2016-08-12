import { errorReducerFactory } from 'utils/actions'

export default function reducer(state={}, action) {
  const {type} = action
  switch (type) {
    case '@@Timeline@Error':
      return {
        ...state,
        error: action.error,
      }
  }
  return state
}

export const timelineError = errorReducerFactory('Timeline')
