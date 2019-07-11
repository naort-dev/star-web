import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Dashboard.Container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Dashboard = props => <LoadableComponent {...props} />;
