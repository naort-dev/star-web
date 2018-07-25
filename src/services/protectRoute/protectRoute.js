import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { protectedRoutes } from './protectedRoutes';
import { Page404 } from '../../pages/page404';

export const protectRoute = ({
  RouteComponent,
  star,
}) => {
  const ProtectedRoute = (props) => {
    const {
      location,
      // role,
      sessionDetails,
      isLoggedIn,
    } = props;
    const isProtectedRoute = protectedRoutes.includes(location.pathname);
    let hasRole;
    if (star && isLoggedIn) {
      hasRole = sessionDetails.celebrity;
    }
    // const hasRole = roles.length ? roles.includes(role) : true;
    const allowAccess = (isLoggedIn && hasRole) || (!isProtectedRoute && !isLoggedIn);
    // const allowAccess = (isProtectedRoute && isLoggedIn);
    const unAuthorized = isLoggedIn && !hasRole;
    const shouldAuthenticate = isProtectedRoute && !isLoggedIn;

    if (allowAccess) {
      return <RouteComponent {...props} />;
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
    sessionDetails: state.session.auth_token,
  });

  return connect(mapState)(ProtectedRoute);
};
