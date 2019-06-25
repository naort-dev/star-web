import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const ManageStarProfileComponent = Loadable({
  loader: () => import('./manageStarProfile.container'),
  loading: ComponentLoading,
  timeout: 5000,
});

export const ManageStarProfile = props => <ManageStarProfileComponent {...props} />;

ManageStarProfile.displayName = 'manageStarProfile';