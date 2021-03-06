import { observer } from 'redux-observers'
import { listenToUserPost, clearListeningUserPost } from 'utils/listeners'
import { clearAllPosts } from 'routes/Timeline/modules'
 
export const currentUserObserver = observer(
  state => state.auth.user,
  (dispatch, current, previous) => {
    if (current) {
      //dispatch(clearAllPosts)
      listenToUserPost(dispatch)
    }
  }
)
