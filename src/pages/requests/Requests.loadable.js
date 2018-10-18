import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Requests.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Requests = props => <LoadableComponent {...props} />;

Requests.displayName = 'Requests';
