import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./TwitterLogin.component'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const TwitterLogin = props => <LoadableComponent {...props} />;

TwitterLogin.displayName = 'TwitterLogin';
