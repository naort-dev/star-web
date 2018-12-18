import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { protectedRoutes, fanRoutes, starRoutes } from './protectedRoutes';
import { Page404 } from '../../pages/page404';

export const protectRoute = ({
  RouteComponent,
  ...routeProps
}) => {
  const ProtectedRoute = (props) => {
    const {
      location,
      // role,
      starRole,
      isLoggedIn,
    } = props;
    const isProtectedRoute = protectedRoutes.includes(location.pathname);
    let hasRole;
    if (isProtectedRoute) {
      if (starRole) {
        hasRole = starRoutes.includes(location.pathname);
      } else {
        hasRole = fanRoutes.includes(location.pathname);
      }
    }
    // const hasRole = roles.length ? roles.includes(role) : true;
    const allowAccess = (isLoggedIn && hasRole) || (!isProtectedRoute && !isLoggedIn);
    // const allowAccess = (isProtectedRoute && isLoggedIn);
    const unAuthorized = isLoggedIn && !hasRole;
    const shouldAuthenticate = isProtectedRoute && !isLoggedIn;

    if (allowAccess) {
      return <RouteComponent {...props} {...routeProps} />;
    }
    else if (unAuthorized) {
      return (
        <Redirect
          to={{
            pathname: '/unauthorized',
          }}
        />
      );
    }
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
            pathname: '/',
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
    starRole: state.userDetails.starRole,
  });

  return connect(mapState)(ProtectedRoute);
};
