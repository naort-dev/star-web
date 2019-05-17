import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import fitty from 'fitty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { numberToDollarFormatter } from '../../utils/dataformatter';
import { toggleQuickView } from '../../store/shared/actions/toggleModals';
import { starProfessionsFormater, getStarName } from '../../utils/dataToStringFormatter';
import AvatarContainer from './styled';

const StarAvatar = ({ star, type, ...props }) => {

  const [profileImage, setProfileImage] = useState(null);
  let isMounted = true;

  const autoSize = {
    'featured': {
      name: {
        minSize: 30,
        maxSize: 47,
        multiLine: true,
      },
      category: {
        minSize: 15,
        maxSize: 20,
      }
    },
    'secondary': {
      name: {
        minSize: 10,
        maxSize: 17,
      },
      category: {
        minSize: 10,
        maxSize: 13,
      }
    }
  }

  const autoFitText = () => {
    fitty(`#${star.user_id}-${type}-name`, type ? autoSize[type].name : {
      minSize: 10,
      maxSize: 17,
    });
    fitty(`#${star.user_id}-${type}-category`, type ? autoSize[type].category : {
      minSize: 10,
      maxSize: 13,
    });
  }

  useEffect(() => {
    if ((star.avatar_photo && star.avatar_photo.thumbnail_url) || star.profileImage) {
      const profileImg = new Image();
      profileImg.onload = () => {
        if (isMounted) {
          setProfileImage(profileImg.src);
        }
      };
      profileImg.src = star.profileImage || (star.avatar_photo && star.avatar_photo.thumbnail_url);
    } else {
      setProfileImage('');
    }
  });

  useEffect(() => {
    autoFitText();
  }, [star.nick_name, star.first_name, star.last_name])

  useEffect(() => {
    return (() => {
      isMounted = false
    });
  });

  const toggleQuickViewModal = () => {
    if ((document.body.getBoundingClientRect().width >= 832 || window.innerWidth >= 832) && star.celebrity_user && star.celebrity_user.rate) {
      props.toggleQuickView(true, star.user_id);
    } else {
      props.history.push(`/${star.user_id}`)
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
      <AvatarContainer.Content className={type} to={`${star.user_id}`}>
        <AvatarContainer.Category title={star.celebrity_profession && starProfessionsFormater(star.celebrity_profession)}>
          <span id={`${star.user_id}-${type}-category`}>
            { star.celebrity_profession && starProfessionsFormater(star.celebrity_profession) }
          </span>
        </AvatarContainer.Category>
        <AvatarContainer.StarDescription>
          <AvatarContainer.Name title={getStarName(star.nick_name, star.first_name, star.last_name)}>
            <span id={`${star.user_id}-${type}-name`}>
              {
                getStarName(star.nick_name, star.first_name, star.last_name)
              }
            </span>
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
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  toggleQuickView: (state, modalData) => dispatch(toggleQuickView(state, modalData)),
});

export default withRouter(connect(null, mapDispatchToProps)(StarAvatar));
