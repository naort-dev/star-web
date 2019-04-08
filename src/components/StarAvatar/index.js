import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { numberToDollarFormatter } from '../../utils/dataformatter';
import { starProfessionsDotFormater, getStarName } from '../../utils/dataToStringFormatter';
import AvatarContainer from './styled';

const StarAvatar = ({ star, type }) => {

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const profileImg = new Image();
    profileImg.onload = () => {
      setProfileImage(profileImg.src);
    };
    profileImg.src = star.avatar_photo.thumbnail_url;
  });

  const getWrapperComponent = () => {
    if (type === 'featured') {
      return AvatarContainer.BigAvatar;
    } else if (type === 'secondary') {
      return AvatarContainer.MediumAvatar;
    }
    return AvatarContainer.Avatar;
  };

  const WrapperComponent = getWrapperComponent();

  return (
    <AvatarContainer>
      <WrapperComponent imageUrl={profileImage}>
        <AvatarContainer.ControlWrapper>
          <AvatarContainer.ControlButton>
            <FontAwesomeIcon icon={faPlay} />
          </AvatarContainer.ControlButton>
        </AvatarContainer.ControlWrapper>
      </WrapperComponent>
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

StarAvatar.defaultProps = {
  type: '',
};

StarAvatar.propTypes = {
  star: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default StarAvatar;
