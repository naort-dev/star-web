import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ROLES } from '../../constants/usertype';
import { toggleLogin } from '../../store/shared/actions/toggleModals';
import { protectedRoutes, fanRoutes, starRoutes, groupRoutes, commonAuthRoutes } from './protectedRoutes';
import { Page404 } from '../../pages/page404';

export const protectRoute = ({
  RouteComponent,
  ...routeProps
}) => {
  const ProtectedRoute = (props) => {
    const {
      location,
      role,
      isStar,
      isLoggedIn,
    } = props;
    const isProtectedRoute = protectedRoutes.includes(location.pathname);
    let hasRole;
    if (isProtectedRoute) {
      if (isStar) {
        hasRole = starRoutes.includes(location.pathname) || commonAuthRoutes.includes(location.pathname);
      } else if (role === ROLES.group) {
        hasRole = groupRoutes.includes(location.pathname) || commonAuthRoutes.includes(location.pathname);
      } else {
        hasRole = fanRoutes.includes(location.pathname) || commonAuthRoutes.includes(location.pathname);
      }
    }
    // const hasRole = roles.length ? roles.includes(role) : true;
    const allowAccess = (isLoggedIn && hasRole) || (!isProtectedRoute && !isLoggedIn);
    // const allowAccess = (isProtectedRoute && isLoggedIn);
    const unAuthorized = isLoggedIn && !hasRole;
    const shouldAuthenticate = isProtectedRoute && !isLoggedIn;

    if (allowAccess) {
      return <RouteComponent {...props} {...routeProps} />;
    } else if (unAuthorized) {
      return (
        <Redirect
          to={{
            pathname: '/unauthorized',
          }}
        />
      );
    } else if (shouldAuthenticate) {
      props.toggleLogin(true);
      return null;
      // return (
      //   <Redirect
      //     to={{
      //       pathname: '/',
      //       state: { from: location },
      //     }}
      //   />
      // );
    }
    return <Page404 {...props} />;
  };

  ProtectedRoute.displayName = 'ProtectedRoute';

  ProtectedRoute.propTypes = {
    location: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
    isStar: PropTypes.bool.isRequired,
    toggleLogin: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = dispatch => ({
    toggleLogin: state => dispatch(toggleLogin(state)),
  })

  const mapState = state => ({
    isLoggedIn: state.session.isLoggedIn,
    isStar: state.userDetails.isStar,
    role: state.userDetails.role,
  });

  return connect(mapState, mapDispatchToProps)(ProtectedRoute);
};
