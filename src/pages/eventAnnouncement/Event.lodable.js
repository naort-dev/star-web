import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Event.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Event = props => <LoadableComponent {...props} />;

Event.displayName = 'Event';
