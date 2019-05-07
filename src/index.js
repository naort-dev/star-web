// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { StripeProvider } from 'react-stripe-elements';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import App from './App';
import { colorThemes } from './styles/colorThemes';
import './globalStyles';

import DevTools from './store/DevTools';

const store = configureStore();
const DevToolsWrapper = () => (process.env.NODE_ENV === 'development' ? <DevTools /> : null);

render(
  <Provider store={store}>
    <ThemeProvider theme={colorThemes}>
      <StripeProvider apiKey={env('STRIPE_PUBLISH_KEY')}>
        <Router>
          <div>
            <App />
            <DevToolsWrapper />
          </div>
        </Router>
      </StripeProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
