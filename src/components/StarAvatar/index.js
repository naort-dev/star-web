import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { numberToDollarFormatter } from '../../utils/dataformatter';
import { toggleQuickView } from '../../store/shared/actions/toggleModals';
import { starProfessionsFormater, getStarName } from '../../utils/dataToStringFormatter';
import AvatarContainer from './styled';

const StarAvatar = ({ star, type, ...props }) => {

  const [profileImage, setProfileImage] = useState(null);
  let isMounted = true;

  useEffect(() => {
    if (star.avatar_photo && star.avatar_photo.thumbnail_url) {
      const profileImg = new Image();
      profileImg.onload = () => {
        if (isMounted) {
          setProfileImage(profileImg.src);
        }
      };
      profileImg.src = star.avatar_photo && star.avatar_photo.thumbnail_url;
    } else {
      setProfileImage('');
    }
  });

  useEffect(() => {
    return (() => {
      isMounted = false
    });
  });

  const toggleQuickViewModal = () => {
    if ((document.body.getBoundingClientRect().width >= 832 || window.innerWidth >= 832) && star.celebrity_user && star.celebrity_user.rate) {
      props.toggleQuickView(true, star.user_id);
    }
  }

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
      <WrapperComponent imageUrl={profileImage} onClick={toggleQuickViewModal}>
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
          <AvatarContainer.Name title={getStarName(star.nick_name, star.first_name, star.last_name)}>
            {
              getStarName(star.nick_name, star.first_name, star.last_name)
            }
          </AvatarContainer.Name>
          {
            star.celebrity_user && star.celebrity_user.rate ?
              <AvatarContainer.Price>{numberToDollarFormatter(star.celebrity_user ? star.celebrity_user.rate : 0)}</AvatarContainer.Price>
            : null
          }
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
  toggleQuickView: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  toggleQuickView: (state, modalData) => dispatch(toggleQuickView(state, modalData)),
});

export default connect(null, mapDispatchToProps)(StarAvatar);
