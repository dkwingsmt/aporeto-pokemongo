import { injectReducer } from '../../store/reducers'
import { mustLoggedOut } from 'utils/routers'

export default (store) => ({
  path: 'login',
  onEnter: mustLoggedOut(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Google = require('./containers/google').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'login', reducer })

      cb(null, Google)

    }, 'login')
  },
})
