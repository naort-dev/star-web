import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Favourites.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Favourites = props => <LoadableComponent {...props} />;

Favourites.displayName = 'Favourites';
