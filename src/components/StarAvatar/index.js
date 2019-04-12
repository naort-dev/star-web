import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { numberToDollarFormatter } from '../../utils/dataformatter';
import { starProfessionsFormater, getStarName } from '../../utils/dataToStringFormatter';
import AvatarContainer from './styled';

const StarAvatar = ({ star, type }) => {

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const profileImg = new Image();
    profileImg.onload = () => {
      setProfileImage(profileImg.src);
    };
    profileImg.src = star.avatar_photo && star.avatar_photo.thumbnail_url;
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
    <AvatarContainer className={type}>
      <WrapperComponent imageUrl={profileImage}>
        <AvatarContainer.ControlWrapper>
          <AvatarContainer.ControlButton>
            <FontAwesomeIcon icon={faPlay} />
          </AvatarContainer.ControlButton>
        </AvatarContainer.ControlWrapper>
      </WrapperComponent>
      <AvatarContainer.Content className={type}>
        <AvatarContainer.Category title={star.celebrity_profession && starProfessionsFormater(star.celebrity_profession)}>
          { star.celebrity_profession && starProfessionsFormater(star.celebrity_profession) }
        </AvatarContainer.Category>
        <AvatarContainer.StarDescription>
          <AvatarContainer.Name>
            {
              getStarName(star.nick_name, star.first_name, star.last_name)
            }
          </AvatarContainer.Name>
          <AvatarContainer.Price>{numberToDollarFormatter(star.celebrity_user && star.celebrity_user.rate)}</AvatarContainer.Price>
        </AvatarContainer.StarDescription>
      </AvatarContainer.Content>
    </AvatarContainer>
  );
};

StarAvatar.defaultProps = {
  type: '',
  star: {},
};

StarAvatar.propTypes = {
  star: PropTypes.object,
  type: PropTypes.string,
};

export default StarAvatar;
