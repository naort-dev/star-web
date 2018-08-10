import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./Event.container'),
  loading: () => <Loader />,
  timeout: 5000,
});

export const Event = props => <LoadableComponent {...props} />;

Event.displayName = 'Event';
