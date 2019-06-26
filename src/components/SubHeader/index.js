import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from 'styles/CommonStyled';
import { SubHeaderWrap } from './styled';

const SubHeader = props => {
  return (
    <SubHeaderWrap headercolor={props.headercolor} size={props.size}>
      <BackArrow className="arrow-head" onClick={props.onClick} />
      <h1 className="head1" >{props.heading}</h1>
    </SubHeaderWrap>
  );
};

SubHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
};

export default SubHeader;
