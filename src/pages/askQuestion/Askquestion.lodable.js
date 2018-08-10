import React from 'react';
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const LoadableComponent = Loadable({
  loader: () => import('./Askquestion.container'),
  loading: () => <Loader />,
  timeout: 5000,
});

export const Askquestion = props => <LoadableComponent {...props} />;

Askquestion.displayName = 'Askquestion';
