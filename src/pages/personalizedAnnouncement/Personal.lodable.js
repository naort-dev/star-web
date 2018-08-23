import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./Personal.container'),
  loading: () => <Loader />,
  timeout: 5000,
});

export const Personal = props => <LoadableComponent {...props} />;

Personal.displayName = 'Personal';
