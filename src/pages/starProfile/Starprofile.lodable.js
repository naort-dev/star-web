import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./Starprofile.container'),
  loading: Loader,
  timeout: 5000,
});

export const Starprofile = props => <LoadableComponent {...props} />;

Starprofile.displayName = 'Starprofile';
