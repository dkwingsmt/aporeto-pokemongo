import firebase from 'firebase'
import { addPost } from 'routes/Timeline/modules'

const listeningUser = {}

function listenerAddPost(data) {
  this.dispatch(addPost(data.key, data.val()))
}

export function listenToUserPost(dispatch, userId) {
  listeningUser[userId] = true
  const commentsRef = firebase.database().ref('posts/')
  commentsRef.off()
  commentsRef.on('child_added', listenerAddPost, {dispatch})
}

export function clearListeningUserPost(userId) {
  const commentsRef = firebase.database().ref('posts/')
  commentsRef.off('child_added', listenerAddPost)
}
