import { errorReducerFactory } from 'utils/actions'

export default function reducer(state={}, action) {
  const {type} = action
  switch (type) {
    case '@@Login@Error':
      return {
        ...state,
        error: action.error,
      }
  }
  return state
}

export const loginError = errorReducerFactory('Login')
