import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./FavoriteStars.container'),
  loading: Loader,
  timeout: 5000,
});

export const FavoriteStars = props => <LoadableComponent {...props} />;

FavoriteStars.displayName = 'FavoriteStars';
