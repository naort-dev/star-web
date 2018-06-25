import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Requestvideo.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Requestvideo = props => <LoadableComponent {...props} />;

Requestvideo.displayName = 'Requestvideo';
