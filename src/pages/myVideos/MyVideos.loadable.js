import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./MyVideos.container'),
  loading: Loader,
  timeout: 5000,
});

export const MyVideos = props => <LoadableComponent {...props} />;

MyVideos.displayName = 'MyVideos';
