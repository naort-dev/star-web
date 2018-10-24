import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./GroupProfile.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const GroupProfile = props => <LoadableComponent {...props} />;

GroupProfile.displayName = 'GroupProfile';
