import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'timeline',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./containers').default
      const reducer = require('./modules').default
      injectReducer(store, { key: 'timeline', reducer })

      cb(null, component)

    }, 'timeline')
  },
})
