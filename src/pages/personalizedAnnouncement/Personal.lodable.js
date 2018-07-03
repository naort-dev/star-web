import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Personal.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Personal = props => <LoadableComponent {...props} />;

Personal.displayName = 'Personal';
