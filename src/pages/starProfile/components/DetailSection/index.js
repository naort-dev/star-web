import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart as faHeartSolid, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { pipeSeparator, getStarName } from '../../../../utils/dataToStringFormatter';
import VideoRender from '../../../../components/VideoRender';
import StarRating from '../../../../components/StarRating';
import StarProfileStyled from '../../styled';
import DetailStyled from './styled';

const DetailSection = (props) => {

  const [followStatus, toggleFollowStatus] = useState(props.userDetails.is_follow ? props.userDetails.is_follow : false);

  const toggleProfileVideo = () => {
    if (document.body.getBoundingClientRect().width < 832 || window.innerWidth < 832) {
      props.toggleProfileVideo(!props.showProfileVideo);
    }
  }

  const getShortName = () => {
    const { userDetails } = props;
    let shortName = '';
    if (userDetails.nick_name) {
      [shortName] = userDetails.nick_name.split(' ');
    } else if (userDetails.first_name) {
      [shortName] = userDetails.first_name.split(' ');
    }
    return shortName;
  }

  const followCelebrityAction = () => {
    if (props.isLoggedIn) {
      toggleFollowStatus(!followStatus);
      props.followCelebrity(props.userDetails.id, !followStatus)
    } else {
      props.updateFavouritesQueue(props.userDetails.id, !followStatus);
      props.toggleLogin(true);
    }
  }

  useEffect(() => {
    toggleFollowStatus(props.userDetails.is_follow);
  }, [props.userDetails.is_follow]);

  return (
    <DetailStyled>
      <DetailStyled.BackButton onClick={props.onBackClick}>
        <span className="back-icon">
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        Back
      </DetailStyled.BackButton>
      <DetailStyled.ProfileContent visible={!props.showProfileVideo}>
        <DetailStyled.StarAvatarWrapper>
          <StarProfileStyled.Avatar
            imageUrl={props.userDetails.avatar_photo && props.userDetails.avatar_photo.thumbnail_url}
            onClick={toggleProfileVideo}
          >
            <span className="avatar-play-control">
              <span className="avatar-play">
                <FontAwesomeIcon icon={faPlay} />
              </span>
            </span>
          </StarProfileStyled.Avatar>
          <span className="favorite-icon" onClick={followCelebrityAction}>
            <FontAwesomeIcon icon={followStatus ? faHeartSolid : faHeart} />
          </span>
        </DetailStyled.StarAvatarWrapper>
        <DetailStyled.StarDetailsWrapper>
          <DetailStyled.StarName>
            {
              getStarName(props.userDetails.nick_name, props.userDetails.first_name, props.userDetails.last_name)
            }            
          </DetailStyled.StarName>
          <DetailStyled.Categories>
            { pipeSeparator(props.celebDetails.profession_details, 'title') }
          </DetailStyled.Categories>
          <DetailStyled.StarDetails>
            <div className='rating-section'>
              <span className="details-header">Avg Rating: {props.celebDetails.rating}</span>
              <StarRating
                readOnly
                ratingClass="star-item"
                rating={props.celebDetails.rating}
              />
            </div>
            <div className='response-section'>
              <span className="details-header">Avg Response Time</span>
              <span className="response-item">{props.celebDetails.average_response_time}</span>
            </div>
          </DetailStyled.StarDetails>
          <DetailStyled.Description>
            { props.celebDetails.description }
          </DetailStyled.Description>
        </DetailStyled.StarDetailsWrapper>
      </DetailStyled.ProfileContent>
      <DetailStyled.ProfileVideoSection visible={props.showProfileVideo}>
        <DetailStyled.StarName>
          {
            getStarName(props.userDetails.nick_name, props.userDetails.first_name, props.userDetails.last_name)
          }            
        </DetailStyled.StarName>
        <DetailStyled.ProfileVideo>
          <VideoRender
            variableWidth
            variableHeight
            customText={`Watch ${getShortName()}’s Welcome Message`}
            noBorder={document.body.getBoundingClientRect().width < 832 || window.innerWidth < 832}
            videoSrc={props.celebDetails.profile_video}
            cover="assets/images/default-cover.jpg"
          />
        </DetailStyled.ProfileVideo>
      </DetailStyled.ProfileVideoSection>
    </DetailStyled>
  )
}

DetailSection.propTypes = {
  userDetails: PropTypes.object.isRequired,
  celebDetails: PropTypes.object.isRequired,
  toggleProfileVideo: PropTypes.func.isRequired,
  showProfileVideo: PropTypes.bool.isRequired,
  onBackClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  followCelebrity: PropTypes.func.isRequired,
  updateFavouritesQueue: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
}

export default DetailSection;
