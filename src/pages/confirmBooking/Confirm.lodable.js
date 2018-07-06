import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Confirm.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Confirm = props => <LoadableComponent {...props} />;

Confirm.displayName = 'Confirm';
