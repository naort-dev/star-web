import React from 'react';
import Loadable from 'react-loadable';
import { ComponentLoading } from '../../components/ComponentLoading';

const LoadableComponent = Loadable({
    loader: () => import('./StarsignUpVideo.container'),
    loading: ComponentLoading,
    timeout: 5000,
});

export const StarsignUpVideo = props => <LoadableComponent {...props} />;

StarsignUpVideo.displayName = 'StarsignUpVideo';