import React from 'react';
import PropTypes from 'prop-types';
import CardStyled from './styled';

const CardContent = (props) => (
  <CardStyled>
    {
      props.children
    }
  </CardStyled>
);

CardContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export default CardContent;
