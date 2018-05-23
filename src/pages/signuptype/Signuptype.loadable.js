import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
  loader: () => import('./Signuptype.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const SignupType = props => <LoadableComponent {...props} />;

SignupType.displayName = 'SignupType';
