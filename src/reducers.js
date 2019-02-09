import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// import your Module reducers here and combine them
import home from './fleet/reducers'

export default (history) => combineReducers({
  router: connectRouter(history),
  home,
  // rest of your reducers
});