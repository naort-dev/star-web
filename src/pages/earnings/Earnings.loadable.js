import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Earnings.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Earnings = props => <LoadableComponent {...props} />;

Earnings.displayName = 'Earnings';
