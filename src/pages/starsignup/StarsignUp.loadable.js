import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./StarsignUp.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const StarsignUp = props => <LoadableComponent {...props} />;

StarsignUp.displayName = 'StarsignUp';
