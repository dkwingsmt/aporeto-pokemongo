import firebase from 'firebase'
import { errorReducerFactory } from 'utils/actions'
import { PromiseAction } from 'store/promise-action'

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
