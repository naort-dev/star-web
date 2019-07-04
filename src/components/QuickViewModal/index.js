import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronRight } from '@fortawesome/pro-light-svg-icons';
import isEmpty from 'lodash/isEmpty';
import fitty from 'fitty';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import { fetchStarDetails } from '../../pages/starProfile/actions';
import { toggleQuickView, toggleLogin, toggleRequestFlow } from '../../store/shared/actions/toggleModals';
import { followCelebrity, updateFavouritesQueue } from '../../store/shared/actions/followCelebrity';
import { pipeSeparator, getStarName } from '../../utils/dataToStringFormatter';
import RequestFlowPopup from '../RequestFlowPopup';
import StarDrawer from '../StarDrawer';
import PrimaryButton from '../PrimaryButton';
import Loader from '../Loader';
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
      minSize: 46,
      maxSize: 74,
      multiLine: true,
    })
    fitty('#star-categories', {
      minSize: 15,
      maxSize: 18,
    })
  }

  const [showVideo, toggleVideoView] = useState(false);
  const [followStatus, toggleFollowStatus] = useState(props.userDetails.is_follow ? props.userDetails.is_follow : false);

  const onModalMounted = () => {
    autoFitText();
  }

  const handleWindowResize = () => {
    if (document.body.getBoundingClientRect().width < 832 || window.innerWidth < 832) {
      props.toggleQuickView(false)();
    }
  }

  const onBookAction = () => {
    if (props.celebDetails.availability && props.celebDetails.remaining_limit > 0) {
      props.toggleQuickView(false)();
      props.toggleRequestFlow(true);
    }
  }

  useEffect(() => {
    const { userDetails, celebDetails } = props;
    const isPresentCelebDetails = !isEmpty(userDetails) && !isEmpty(celebDetails);
    const deferFetchCeleb = isPresentCelebDetails && userDetails.user_id === props.quickViewModal.data;
    if (props.quickViewModal.data && !deferFetchCeleb) {
      props.fetchStarDetails(props.quickViewModal.data);
    }
    autoFitText();
    window.addEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    autoFitText();
  });

  useEffect(() => {
    if (props.celebDetails.profile_video) {
      toggleVideoView(true);
    } else {
      toggleVideoView(false);
    }
  }, [props.celebDetails.profile_video]);

  useEffect(() => {
    toggleFollowStatus(props.userDetails.is_follow);
  }, [props.userDetails.is_follow]);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, [])

  const onVideoError = () => {
    toggleVideoView(false);
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
      onMounted={onModalMounted}
      closePopUp={props.toggleQuickView(false)}
      smallPopup
    >
      {
        props.detailsLoading ?
          <Loader />
          :
          <React.Fragment>
            <QuickViewStyled>
              <QuickViewStyled.VideoContainer className={!showVideo && "image-only"}>
                {
                  showVideo ?
                    <VideoRender
                      variableWidth
                      variableHeight
                      noBorder
                      autoPlay
                      onVideoError={onVideoError}
                      videoSrc={props.celebDetails.profile_video}
                      cover="assets/images/default-cover.jpg"
                    />
                    : <QuickViewStyled.Avatar size={200} imageUrl={props.userDetails.avatar_photo && props.userDetails.avatar_photo.thumbnail_url} />

                }
              </QuickViewStyled.VideoContainer>
              <QuickViewStyled.Content>
                <div>
                  <QuickViewStyled.Categories id="star-categories">
                    {pipeSeparator(props.celebDetails.profession_details, 'title')}
                  </QuickViewStyled.Categories>
                </div>
                <div>
                  <QuickViewStyled.StarName id="star-name">
                    {getStarName(props.userDetails.nick_name, props.userDetails.first_name, props.userDetails.last_name)}
                  </QuickViewStyled.StarName>
                </div>
                {
                  props.celebDetails.average_response_time !== '' &&
                  <React.Fragment>
                    <QuickViewStyled.SubHeader>Average Response Time</QuickViewStyled.SubHeader>
                    <QuickViewStyled.SubDescription>{props.celebDetails.average_response_time}</QuickViewStyled.SubDescription>
                  </React.Fragment>
                }
                <QuickViewStyled.HeartIcon onClick={followCelebrityAction}>
                  <FontAwesomeIcon icon={followStatus ? faHeartSolid : faHeart} />
                </QuickViewStyled.HeartIcon>
                <QuickViewStyled.MiniDescription onClick={props.toggleQuickView(false)} to={`/${props.userDetails.user_id}`}>Read full profile</QuickViewStyled.MiniDescription>
              </QuickViewStyled.Content>
            </QuickViewStyled>
            <QuickViewStyled.StarWrapper>
              <StarDrawer starData={starData} />
            </QuickViewStyled.StarWrapper>
            <QuickViewStyled.ActionBar available={props.celebDetails.availability && props.celebDetails.remaining_limit > 0} onClick={onBookAction}>
              <QuickViewStyled.ActionContent available={props.celebDetails.availability && props.celebDetails.remaining_limit > 0}>
                <span>
                  <QuickViewStyled.Avatar size={80} imageUrl={props.userDetails.avatar_photo && props.userDetails.avatar_photo.thumbnail_url} />
                </span>
                <QuickViewStyled.Description>
                  {
                    props.celebDetails.availability && props.celebDetails.remaining_limit > 0 ?
                      <React.Fragment>
                        Book a shoutout
                      from <strong>{getShortName()}</strong> for <strong> ${props.celebDetails.rate && parseInt(props.celebDetails.rate, 0)}</strong>
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <strong>{getShortName()}</strong> is temporarily unavailable. Come back later.
                    </React.Fragment>
                  }
                </QuickViewStyled.Description>
              </QuickViewStyled.ActionContent>
              {
                props.celebDetails.availability && props.celebDetails.remaining_limit > 0 &&
                <QuickViewStyled.ActionSection>
                  <QuickViewStyled.ArrowWrapper>
                    <FontAwesomeIcon icon={faChevronRight} />
                    <FontAwesomeIcon icon={faChevronRight} />
                    <FontAwesomeIcon icon={faChevronRight} />
                  </QuickViewStyled.ArrowWrapper>
                  <PrimaryButton className='action-button'>Book Now</PrimaryButton>
                </QuickViewStyled.ActionSection>
              }
            </QuickViewStyled.ActionBar>
          </React.Fragment>
      }
    </RequestFlowPopup>
  );
};

QuickViewModal.propTypes = {
  toggleQuickView: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  quickViewModal: PropTypes.object.isRequired,
  fetchStarDetails: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  followCelebrity: PropTypes.func.isRequired,
  toggleRequestFlow: PropTypes.func.isRequired,
  updateFavouritesQueue: PropTypes.func.isRequired,
  celebDetails: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  quickViewModal: state.modals.quickViewModal,
  isLoggedIn: state.session.isLoggedIn,
  detailsLoading: state.starDetails.celebDetails.loading,
  celebDetails: state.starDetails.celebDetails.celebrityDetails,
  userDetails: state.starDetails.celebDetails.userDetails,
});

const mapDispatchToProps = dispatch => ({
  toggleQuickView: state => () => dispatch(toggleQuickView(state)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  fetchStarDetails: id => dispatch(fetchStarDetails(id)),
  toggleRequestFlow: state => dispatch(toggleRequestFlow(state)),
  updateFavouritesQueue: (id, follow) => dispatch(updateFavouritesQueue(id, follow)),
  followCelebrity: (id, isFollow) => dispatch(followCelebrity(id, isFollow)),
});

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(QuickViewModal));
