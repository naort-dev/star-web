import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Login.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const Login = props => <LoadableComponent {...props} />;

Login.displayName = 'Login';
