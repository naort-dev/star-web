import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { numberToDollarFormatter } from '../../utils/dataformatter';
import { starProfessionsDotFormater, getStarName } from '../../utils/dataToStringFormatter';
import AvatarContainer from './styled';

const StarAvatar = ({ star }) => {

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const profileImg = new Image();
    profileImg.onload = () => {
      setProfileImage(profileImg.src);
    };
    profileImg.src = star.avatar_photo.thumbnail_url;
  });

  return (
    <AvatarContainer>
      <AvatarContainer.Avatar imageUrl={profileImage} />
      <AvatarContainer.Content>
        <AvatarContainer.StarDescription>
          <AvatarContainer.Category title={starProfessionsDotFormater(star.celebrity_profession)}>
            { starProfessionsDotFormater(star.celebrity_profession) }
          </AvatarContainer.Category>
          <AvatarContainer.Name>
            {
              getStarName(star.nick_name, star.first_name, star.last_name)
            }
          </AvatarContainer.Name>
        </AvatarContainer.StarDescription>
        <AvatarContainer.Price>{numberToDollarFormatter(star.celebrity_user.rate)}</AvatarContainer.Price>
      </AvatarContainer.Content>
    </AvatarContainer>
  );
};

StarAvatar.propTypes = {
  star: PropTypes.object.isRequired,
};

export default StarAvatar;
