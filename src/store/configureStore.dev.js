import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import DevTools from './DevTools';
import rootReducer from './reducers';

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
);

export default function configureStore(preloadedState = {}) {
  const store = createStore(rootReducer, preloadedState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  /* eslint-disable global-require */
  /* eslint-disable import/no-unresolved */
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers')),
    );
  }

  return store;
}
