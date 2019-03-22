import React from 'react';
import PropTypes from 'prop-types';
import StarStyled from './styled';

const StarDrawer = (props) => {
  return (
    <StarStyled xmlns="http://www.w3.org/2000/svg">
      {
        props.starData.map(star => (
          <svg viewBox="0 0 25 25" height={star.size} width={star.size} x={star.horizontal} y={star.vertical}>
            <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" fill={star.color} />
          </svg>
        ))
      }
    </StarStyled>
  );
};

StarDrawer.propTypes = {
  starData: PropTypes.object.isRequired,
};

export default StarDrawer;
