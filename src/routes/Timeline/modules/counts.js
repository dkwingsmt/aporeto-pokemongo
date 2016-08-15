import firebase from 'firebase'
import { PromiseAction } from 'store/promise-action'
//import { omit } from 'lodash'

export default function reducer(state={}, action) {
  const {type, key, value} = action 
  switch (type) {
    case '@@Counts/add':
      return {
        ...state,
        [key]: value,
      }
  }
  return state
}

function addCount(key, value) {
  return {
    type: '@@Counts/add',
    key,
    value,
  }
}

//function adjustCount(uid, postId, type, value) {
//  return {
//    type: '@@Counts/adjust',
//    uid,
//    postId,
//    type,
//    value,
//  }
//}

function dispatchAddCount(result) {
  this.dispatch(addCount(result.key, result.val()))
}

export function listenToCounts(dispatch) {
  const commentsRef = firebase.database().ref('counts/')
  commentsRef.off()
  commentsRef.on('child_added', dispatchAddCount, {dispatch})
  commentsRef.on('child_changed', dispatchAddCount, {dispatch})
}

export function changeCountValue(postId, type, uid, value) {
  value = !!value
  return new PromiseAction('@@Count/change', () =>
    firebase.database().ref(`counts/${postId}/${type}`).update({[uid]: value})
  )
}
