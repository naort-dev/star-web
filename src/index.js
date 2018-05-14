// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './store/configureStore';
import App from './App';
import './globalStyles';
import DevTools from './store/DevTools';

// @TODO: read localForage and set the inital/preloaded state
const store = configureStore();
const DevToolsWrapper = () => (process.env.NODE_ENV === 'development' ? <DevTools /> : null);

render(
  <Provider store={store}>
    <ThemeProvider theme={{}}>
      <Router>
        <div>
          <App />
          <DevToolsWrapper />
        </div>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
