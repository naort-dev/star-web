import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Unauthorized.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Unauthorized = props => <LoadableComponent {...props} />;

Unauthorized.displayName = 'Unauthorized';
