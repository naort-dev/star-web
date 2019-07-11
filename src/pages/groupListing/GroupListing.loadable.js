import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./GroupListing.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const GroupListing = props => <LoadableComponent {...props} />;

GroupListing.displayName = 'GroupListing';
