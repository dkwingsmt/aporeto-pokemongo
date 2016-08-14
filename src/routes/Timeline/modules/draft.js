import Promise from 'bluebird'
import firebase from 'firebase'
import { PromiseAction } from 'store/promise-action'

const initState = {
  contents: {},
}

export default function reducer(state=initState, action) {
  const {type, contents} = action
  switch (type) {
    case '@@Post/setDraftInfo':
      return {
        ...state,
        contents: {
          ...state.contents,
          ...contents,
        },
      }
    case '@@Post/clearDraftInfo':
      return {
        ...state,
        contents: {},
      }
    case '@@Post/submit@catch':
      return {
        ...state,
        alert: {
          type: 'error',
          detail: action.error,
        },
      }
    case '@@Post/submit@then':
      return {
        ...state,
        contents: {
          ...state.contents,
          pmId: null,
        },
        alert: {
          type: 'success',
          detail: 'Successfully posted!',
        },
      }
  }
  return state
}

export function setDraftInfo(contents) {
  return {
    type: '@@Post/setDraftInfo',
    contents,
  }
}

export function clearDraftInfo(contents) {
  return {
    type: '@@Post/clearDraftInfo',
  }
}

export function submitPost(userId, draft) {
  const postContents = {
    ...draft,
    userId: userId,
  }
  return new PromiseAction('@@Post/submit', () => {
    if (postContents.userId)
      return Promise.reject(new Error('userId must not be empty'))
    return firebase.database().ref('posts/' + userId).push(postContents)
  })
}
