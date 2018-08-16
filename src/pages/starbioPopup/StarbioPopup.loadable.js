import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./StarbioPopup.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const StarbioPopup = props => <LoadableComponent {...props} />;

StarbioPopup.displayName = 'StarbioPopup';
