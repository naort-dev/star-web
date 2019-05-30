import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./Bookings.container'),
  loading: Loader,
  timeout: 5000,
});

export const Bookings = props => <LoadableComponent {...props} />;

Bookings.displayName = 'Bookings';
