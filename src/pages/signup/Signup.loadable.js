import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Signup.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const SignUp = props => <LoadableComponent {...props} />;

SignUp.displayName = 'SignUp';
