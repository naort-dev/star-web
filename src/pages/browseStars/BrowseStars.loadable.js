import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./BrowseStars.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const BrowseStars = props => <LoadableComponent {...props} />;

BrowseStars.displayName = 'BrowseStars';
