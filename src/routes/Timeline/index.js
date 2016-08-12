import { injectReducer } from '../../store/reducers'
import { mustLoggedIn } from 'utils/routers'

export default (store) => ({
  path: 'timeline',
  onEnter: mustLoggedIn(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./containers').default
      const reducer = require('./modules').default
      injectReducer(store, { key: 'timeline', reducer })

      cb(null, component)

    }, 'timeline')
  },
})
