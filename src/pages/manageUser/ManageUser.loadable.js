import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./ManageUser.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const ManageUser = props => <LoadableComponent {...props} />;

ManageUser.displayName = 'ManageUser';
