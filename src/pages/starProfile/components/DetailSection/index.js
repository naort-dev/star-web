import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { pipeSeparator, getStarName } from '../../../../utils/dataToStringFormatter';
import VideoRender from '../../../../components/VideoRender';
import StarProfileStyled from '../../styled';
import DetailStyled from './styled';

const DetailSection = (props) => {
  return (
    <DetailStyled>
      <DetailStyled.ProfileContent>
        <DetailStyled.StarAvatarWrapper>
          <StarProfileStyled.Avatar size={200} imageUrl={props.userDetails.avatar_photo && props.userDetails.avatar_photo.thumbnail_url}>
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
      </DetailStyled.ProfileContent>
      <DetailStyled.ProfileVideo>
        <VideoRender
          // variableWidth
          // variableHeight
          videoSrc={props.celebDetails.profile_video}
          cover="assets/images/default-cover.jpg"
        />
      </DetailStyled.ProfileVideo>
    </DetailStyled>
  )
}

DetailSection.propTypes = {
  userDetails: PropTypes.object.isRequired,
  celebDetails: PropTypes.object.isRequired,
}

export default DetailSection;
