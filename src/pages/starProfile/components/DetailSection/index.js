import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { pipeSeparator, getStarName } from '../../../../utils/dataToStringFormatter';
import VideoRender from '../../../../components/VideoRender';
import StarRating from '../../../../components/StarRating';
import StarProfileStyled from '../../styled';
import DetailStyled from './styled';

const DetailSection = (props) => {

  const toggleProfileVideo = () => {
    if (document.body.getBoundingClientRect().width < 832 || window.innerWidth < 832) {
      props.toggleProfileVideo(!props.showProfileVideo);
    }
  }

  return (
    <DetailStyled>
      <DetailStyled.ProfileContent visible={!props.showProfileVideo}>
        <DetailStyled.StarAvatarWrapper>
          <StarProfileStyled.Avatar
            size={200}
            imageUrl={props.userDetails.avatar_photo && props.userDetails.avatar_photo.thumbnail_url}
            onClick={toggleProfileVideo}
          >
            <span className="avatar-play-control">
              <span className="avatar-play">
                <FontAwesomeIcon icon={faPlay} />
              </span>
            </span>
          </StarProfileStyled.Avatar>
        </DetailStyled.StarAvatarWrapper>
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
}

export default DetailSection;
