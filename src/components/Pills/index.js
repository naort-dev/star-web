import React from 'react';
import PropTypes from 'prop-types';
import { PillWrap } from './styled';

const Pill = props => {
  return <PillWrap className={props.className}>{props.text}</PillWrap>;
};

Pill.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Pill.defaultProps = {
  className: '',
};

export default Pill;
