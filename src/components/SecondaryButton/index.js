import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './styled';


const SecondaryButton = props => (
  <ButtonStyled {...props}>{props.children}</ButtonStyled>
);

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SecondaryButton;
