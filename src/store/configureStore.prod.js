import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

// Middleware you want to use in production:
const enhancer = compose(applyMiddleware(thunkMiddleware));

export default function configureStore(preloadedState = {}) {
  return createStore(rootReducer, preloadedState, enhancer);
}
