import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./StarbioPopup.container'),
  loading: () => <Loader />,
  timeout: 5000,
});

export const StarbioPopup = props => <LoadableComponent {...props} />;

StarbioPopup.displayName = 'StarbioPopup';
