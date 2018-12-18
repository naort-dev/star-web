import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Starbio.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Starbio = props => <LoadableComponent {...props} />;

Starbio.displayName = 'Starbio';
