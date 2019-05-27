import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './styled';


const PrimaryButton = props => (
  <ButtonStyled {...props} className={`common-btn ${props.className}`}>{props.children}</ButtonStyled>
);

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrimaryButton;
