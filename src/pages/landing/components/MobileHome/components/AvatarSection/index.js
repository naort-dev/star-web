import React from 'react';
import PropTypes from 'prop-types';
import AvatarStyled from './styled';

const AvatarSection = ({ stars }) => {
  const modifiedStars = stars.slice(0, stars.length);
  return (
    <AvatarStyled>
      {
        modifiedStars.map((star, index) => (
          <AvatarStyled.Avatar key={star.id} index={index} totalCount={stars.length} className={`avatar-${index + 1}`} imageUrl={star.avatar_photo ? star.avatar_photo.medium_thumbnail_url : null} />
        ))
      }
    </AvatarStyled>
  );
};

AvatarSection.propTypes = {
  stars: PropTypes.array.isRequired,
};

export default AvatarSection;
