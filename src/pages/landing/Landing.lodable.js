import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Landing.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Landing = props => <LoadableComponent {...props} />;

Landing.displayName = 'Landing';
