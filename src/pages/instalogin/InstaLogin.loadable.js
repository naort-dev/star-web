import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./InstaLogin.component'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const InstaLogin = props => <LoadableComponent {...props} />;

InstaLogin.displayName = 'InstaLogin';
