import Promise from 'bluebird'
import { pick } from 'lodash'
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
          detail: {message: 'Successfully posted!'},
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

export function submitPost(user, provider, draft) {
  const selectedUser = pick(user, ['displayName', 'photoURL', 'email', 'providerData', 'uid'])
  const postContents = {
    ...selectedUser,
    ...draft,
    provider,
  }
  return new PromiseAction('@@Post/submit', () => {
    return firebase.database().ref('posts/').push(postContents)
  })
}
