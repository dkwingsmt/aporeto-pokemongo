import { injectReducer } from '../../store/reducers'
import { mustLoggedOut } from 'utils/routers'

export default (store) => ({
  path: 'login',
  onEnter: mustLoggedOut(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'login', reducer })

      cb(null, container)

    }, 'login')
  },
})
