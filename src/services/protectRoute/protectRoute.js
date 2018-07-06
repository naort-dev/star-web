import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { protectedRoutes } from './protectedRoutes';
import { Page404 } from '../../pages/page404';

export const protectRoute = ({
  RouteComponent,
}) => {
  const ProtectedRoute = (props) => {
    const {
      location,
      // role,
      isLoggedIn,
    } = props;
    const isProtectedRoute = protectedRoutes.includes(location.pathname);
    // const hasRole = roles.length ? roles.includes(role) : true;

    // const allowAcceess = (isLoggedIn && hasRole) || (!isProtectedRoute && !isLoggedIn);
    const allowAccess = (isProtectedRoute && isLoggedIn);
    // const unAuthorized = isLoggedIn && !hasRole;
    const shouldAuthenticate = isProtectedRoute && !isLoggedIn;

    if (allowAccess) {
      return <RouteComponent {...props} />;
    } 
    // else if (unAuthorized) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/unauthorized',
    //       }}
    //     />
    //   );
    // } else if (shouldAuthenticate) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/login',
    //         state: { from: location },
    //       }}
    //     />
    //   );
    // }
    else if (shouldAuthenticate) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
    }
    return <Page404 {...props} />;
  };

  ProtectedRoute.displayName = 'ProtectedRoute';

  ProtectedRoute.propTypes = {
    location: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    // role: PropTypes.string.isRequired,
  };

  const mapState = state => ({
    isLoggedIn: state.session.isLoggedIn,
    role: state.session.role,
  });

  return connect(mapState)(ProtectedRoute);
};
