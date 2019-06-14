import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './styled';


const PrimaryButton = React.forwardRef((props, forwardRef) => (
  <ButtonStyled {...props} className={`common-btn ${props.className}`} innerRef={forwardRef}>{props.children}</ButtonStyled>
));

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default PrimaryButton;
