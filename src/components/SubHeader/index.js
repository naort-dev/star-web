import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from 'styles/CommonStyled';
import './styles.scss';

const SubHeader = props => {
  return (
    <React.Fragment>
      <BackArrow className="arrow-head" onClick={props.onClick} />
      <h1 className="head1">{props.heading}</h1>
    </React.Fragment>
  );
};

SubHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
};

export default SubHeader;
