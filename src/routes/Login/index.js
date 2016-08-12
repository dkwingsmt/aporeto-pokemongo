import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Google = require('./containers/google').default
      const reducer = require('./modules').default

      injectReducer(store, { key: 'login', reducer })

      cb(null, Google)

    }, 'login')
  },
})
