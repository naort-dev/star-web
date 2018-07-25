import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./StarRequests.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const StarRequests = props => <LoadableComponent {...props} />;

StarRequests.displayName = 'Star Requests';
