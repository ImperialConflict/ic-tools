import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers'
import thunk from 'redux-thunk';
// create history
export const history = createHashHistory();

// define on your own as per requirment
const preloadedState = {};

const store = createStore(
  createRootReducer(history), // root reducer with router state
  preloadedState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
  )
)
export default store;