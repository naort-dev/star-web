import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./StarSupporters.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const StarSupporters = props => <LoadableComponent {...props} />;

StarSupporters.displayName = 'StarSupporters';
