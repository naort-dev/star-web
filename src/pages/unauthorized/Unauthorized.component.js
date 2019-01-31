import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import UnauthorizedStyled from './styled';

const Unauthorized = props => (
  <UnauthorizedStyled>
    <Header
      disableMenu
      history={props.history}
    />
    <UnauthorizedStyled.Content>
      {
        props.isLoggedIn ?
          'The account to which you are logged in does not have permission to view this page'
        : 'You are not authorized to view this page'
      }
    </UnauthorizedStyled.Content>
  </UnauthorizedStyled>
);

Unauthorized.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

Unauthorized.displayName = 'Unauthorized';
export default Unauthorized;
