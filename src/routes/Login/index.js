import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Google = require('./containers/google').component

      //injectReducer(store, { key: 'counter', reducer })

      cb(null, Google)

    /* Webpack named bundle   */
    }, 'login')
  }
})
