import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Starprofile.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Starprofile = props => <LoadableComponent {...props} />;

Starprofile.displayName = 'Starprofile';
