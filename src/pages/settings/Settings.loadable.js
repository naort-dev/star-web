import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Settings.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Settings = props => <LoadableComponent {...props} />;

Settings.displayName = 'Settings';
