import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { protectedRoutes } from './protectedRoutes';
import { Page404 } from '../../pages/page404';

export const protectRoute = ({
  RouteComponent,
  roles = [],
}) => {
  const ProtectedRoute = (props) => {
    const isProtectedRoute = protectedRoutes.includes(props.location.pathname);
    const isLoggedIn = props.isLoggedIn && isProtectedRoute;
    const hasRole = roles.length ? roles.includes(props.role) : true;

    const allowAcceess = isLoggedIn && hasRole;
    const accessDenied = isLoggedIn && !hasRole;

    if (!isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      );
    } else if (accessDenied) {
      return (
        <Redirect
          to={{
            pathname: '/unauthorized',
          }}
        />
      );
    } else if (allowAcceess) {
      return <RouteComponent {...props} />;
    }

    return <Page404 {...props} />;
  };

  ProtectedRoute.displayName = 'ProtectedRoute';

  ProtectedRoute.propTypes = {
    location: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
  };

  const mapState = state => ({
    isLoggedIn: state.session.isLoggedIn,
    role: state.session.role,
  });

  return connect(mapState)(ProtectedRoute);
};
