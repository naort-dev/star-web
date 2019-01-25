import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./GroupProfile.container'),
  loading: Loader,
  timeout: 5000,
});

export const GroupProfile = props => <LoadableComponent {...props} />;

GroupProfile.displayName = 'GroupProfile';
