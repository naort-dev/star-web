import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import isEmpty from 'lodash/isEmpty';
import fitty from 'fitty';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import { fetchStarDetails } from '../../pages/starProfile/actions';
import { toggleQuickView } from '../../store/shared/actions/toggleModals';
import { pipeSeparator, getStarName } from '../../utils/dataToStringFormatter';
import RequestFlowPopup from '../RequestFlowPopup';
import StarDrawer from '../StarDrawer';
import PrimaryButton from '../PrimaryButton';
import VideoRender from '../VideoRender';
import QuickViewStyled from './styled';

const QuickViewModal = (props) => {
  const { paleSkyBlue } = props.theme;
  const starData = [{
    size: '105px',
    horizontal: '85%',
    vertical: '60%',
    rotation: '15deg',
    color: paleSkyBlue,
  }];

  const autoFitText = () => {
    fitty('#star-name', {
      minSize: 50,
      maxSize: 74,
      multiLine: true,
    })
    fitty('#star-categories', {
      minSize: 15,
      maxSize: 24,
    })
  }

  const [showVideo, toggleVideoView] = useState(false);
  // const [video, updateVideoTag] = useState(document.createElement("video"));

  useEffect(() => {
    const { userDetails, celebDetails } = props;
    const isPresentCelebDetails = !isEmpty(userDetails) && !isEmpty(celebDetails);
    const deferFetchCeleb = isPresentCelebDetails && userDetails.user_id === props.quickViewModal.data;
    if (props.quickViewModal.data && !deferFetchCeleb) {
      props.fetchStarDetails(props.quickViewModal.data);
    }
    autoFitText();
  }, []);

  useEffect(() => {
    autoFitText();
  });

  useEffect(() => {
    if (props.celebDetails.profile_video) {
      // console.log(props.celebDetails)
      // video.src= props.celebDetails.profile_video;
      // video.onloadeddata = () => {
      //   toggleVideoView(true);
      // }
      // video.onerror = () => {
      //   toggleVideoView(false);
      // }
      toggleVideoView(true);
    } else {
      toggleVideoView(false);
    }
  }, [props.celebDetails.profile_video]);

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

  return (
    <RequestFlowPopup
      dotsCount={0}
      selectedDot={0}
      closePopUp={props.toggleQuickView(false)}
      smallPopup
    >
      <QuickViewStyled>
        <QuickViewStyled.VideoContainer>
          {
            showVideo ?
              <VideoRender
                variableWidth
                variableHeight
                noBorder
                videoSrc={props.celebDetails.profile_video}
                cover="assets/images/default-cover.jpg"
              />
            : <QuickViewStyled.Avatar size={200} imageUrl={props.userDetails.avatar_photo && props.userDetails.avatar_photo.thumbnail_url}/>

          }
        </QuickViewStyled.VideoContainer>
        <QuickViewStyled.Content>
          <div>
            <QuickViewStyled.Categories id="star-categories">
              { pipeSeparator(props.celebDetails.profession_details, 'title') }
            </QuickViewStyled.Categories>
          </div>
          <div>
            <QuickViewStyled.StarName id="star-name">
              { getStarName(props.userDetails.nick_name, props.userDetails.first_name, props.userDetails.last_name) }
            </QuickViewStyled.StarName>
          </div>
          <QuickViewStyled.SubHeader>Average Response Time</QuickViewStyled.SubHeader>
          <QuickViewStyled.SubDescription>2 Days</QuickViewStyled.SubDescription>
          <QuickViewStyled.HeartIcon>
            <FontAwesomeIcon icon={faHeart} />
          </QuickViewStyled.HeartIcon>
          <QuickViewStyled.MiniDescription onClick={props.toggleQuickView(false)} to="/browse-stars">Read full profile</QuickViewStyled.MiniDescription>
        </QuickViewStyled.Content>
      </QuickViewStyled>
      <QuickViewStyled.StarWrapper>
        <StarDrawer starData={starData} />
      </QuickViewStyled.StarWrapper>
      <QuickViewStyled.ActionBar>
        <QuickViewStyled.ActionContent>
          <span>
            <QuickViewStyled.Avatar size={80} imageUrl={props.userDetails.avatar_photo && props.userDetails.avatar_photo.thumbnail_url}/>
          </span>
          <QuickViewStyled.Description>
            Book a shoutout 
            from <strong>{getShortName()}</strong> for <strong>${ props.celebDetails.rate && parseInt(props.celebDetails.rate, 0)}</strong> 
          </QuickViewStyled.Description>
        </QuickViewStyled.ActionContent>
        <QuickViewStyled.ActionSection>
            <PrimaryButton className='action-button'>Book Now</PrimaryButton>
        </QuickViewStyled.ActionSection>
      </QuickViewStyled.ActionBar>
    </RequestFlowPopup>
  );
};

QuickViewModal.propTypes = {
  toggleQuickView: PropTypes.func.isRequired,
  quickViewModal: PropTypes.object.isRequired,
  fetchStarDetails: PropTypes.func.isRequired,
  celebDetails: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  quickViewModal: state.modals.quickViewModal,
  celebDetails: state.starDetails.celebDetails.celebrityDetails,
  userDetails: state.starDetails.celebDetails.userDetails,
});

const mapDispatchToProps = dispatch => ({
  toggleQuickView: state => () => dispatch(toggleQuickView(state)),
  fetchStarDetails: id => dispatch(fetchStarDetails(id)),
});

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(QuickViewModal));
