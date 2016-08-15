import { observe } from 'redux-observers'
import { injectReducer } from '../../store/reducers'
import { mustLoggedIn } from 'utils/routers'
import { currentUserObserver } from 'store/observers'
import { listenToUserPost } from 'utils/listeners'
import { listenToCounts } from './modules/counts'

export default (store) => ({
  path: 'timeline',
  onEnter: mustLoggedIn(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./containers').default
      const reducer = require('./modules').default
      const countsReducer = require('./modules/counts').default
      injectReducer(store, { key: 'timeline', reducer })
      injectReducer(store, { key: 'counts', reducer: countsReducer })

      listenToUserPost(store.dispatch)
      listenToCounts(store.dispatch)

      cb(null, component)

    }, 'timeline')
  },
})
