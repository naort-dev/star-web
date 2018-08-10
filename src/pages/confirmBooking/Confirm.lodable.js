import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./Confirm.container'),
  loading: () => <Loader />,
  timeout: 5000,
});

export const Confirm = props => <LoadableComponent {...props} />;

Confirm.displayName = 'Confirm';
