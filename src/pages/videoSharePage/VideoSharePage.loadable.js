import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./VideoSharePage.component'),
  loading: Loader,
  timeout: 5000,
});

export const VideoSharePage = props => <LoadableComponent {...props} />;

VideoSharePage.displayName = 'VideoSharePage';
