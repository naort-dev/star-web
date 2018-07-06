import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./MyVideos.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const MyVideos = props => <LoadableComponent {...props} />;

MyVideos.displayName = 'My Videos';
