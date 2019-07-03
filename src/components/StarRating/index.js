import React from 'react';
import Rating from 'react-rating';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faLightStar } from '@fortawesome/pro-light-svg-icons';
import RatingStyled from './styled';

const StarRating = props => {
  return (
    <RatingStyled className={props.rootClass}>
      <Rating
        className={`rate ${props.ratingClass}`}
        emptySymbol={
          <FontAwesomeIcon className="rating-star" icon={faLightStar} />
        }
        fullSymbol={<FontAwesomeIcon className="rating-star" icon={faStar} />}
        fractions={2}
        initialRating={props.rating}
        readonly={props.readOnly}
        onChange={props.onChange}
        onClick={props.onClick}
        onHover={props.onHover}
      />
    </RatingStyled>
  );
};

StarRating.propTypes = {
  rootClass: PropTypes.string,
  ratingClass: PropTypes.string,
  rating: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
};

StarRating.defaultProps = {
  rootClass: '',
  ratingClass: '',
  rating: '',
  readOnly: false,
  onChange: () => {},
  onClick: () => {},
  onHover: () => {},
};

export default StarRating;
