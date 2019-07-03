import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import AppBanner from '../../components/AppBanner';
import Loader from '../../components/Loader';
import StarProfileStyled from './styled';
import { setMetaTags } from '../../utils/setMetaTags';
import { getStarName } from '../../utils/dataToStringFormatter';
import CallToAction from './components/CallToAction';
import DetailSection from './components/DetailSection';
import ListingSection from './components/ListingSection';
import Header from '../../components/Header';

const StarProfile = (props) => {
  
  const [profVideo, toggleProfVideo] = useState(false);

  const getUserId = () => {
    return props.match.params.id;
  }

  const onBackClick = () => {
    if (profVideo && (document.body.getBoundingClientRect().width < 832 || window.innerWidth < 832)) {
      toggleProfVideo(false);
    } else {
      props.history.goBack();
    }
  }

  const toggleProfileVideo = state => {
    toggleProfVideo(state);
  }

  const showErrorMessage = () => {
    if (props.detailsError.status === "400") {
      return props.detailsError.message;
    }
    return null;
  }

  useEffect(() => {
    props.fetchStarDetails(getUserId());
    return () => {
      props.resetStarDetails();
    }
  }, [props.isLoggedIn, props.match.params.id])

  useEffect(() => {
    if (props.detailsError && props.detailsError.status !== "400") {
      props.history.push('/not-found');
    }
  })

  return (
    <StarProfileStyled centerAlign={props.detailsError || props.detailsLoading}>
      {
        props.detailsLoading ?
          <Loader />
        :
          <StarProfileStyled.Container>
            <Header
              onBackClick={onBackClick}
              showBack
            />
            {
              props.detailsError ?
                <StarProfileStyled.ErrorWrapper>
                  {showErrorMessage()}
                </StarProfileStyled.ErrorWrapper>
              :
                <React.Fragment>
                  <CallToAction
                    toggleRequestFlow={props.toggleRequestFlow}
                    userDetails={props.userDetails}
                    celebDetails={props.celebDetails}
                  />
                  <DetailSection
                    showProfileVideo={profVideo}
                    onBackClick={onBackClick}
                    isLoggedIn={props.isLoggedIn}
                    followCelebrity={props.followCelebrity}
                    toggleLogin={props.toggleLogin}
                    updateFavouritesQueue={props.updateFavouritesQueue}
                    toggleProfileVideo={toggleProfileVideo}
                    userDetails={props.userDetails}
                    celebDetails={props.celebDetails}
                  />
                  {
                    !profVideo &&
                      <ListingSection
                        userDetails={props.userDetails}
                        fetchCelebVideosList={props.fetchCelebVideosList}
                        toggleBookingModal={props.toggleBookingModal}
                        fetchCelebReactionsList={props.fetchCelebReactionsList}
                        reactionsList={props.reactionsList}
                        videosList={props.videosList}
                      />
                  }
                </React.Fragment>
            }
          {/* {
            this.state.showAppBanner && Object.keys(props.userDetails).length && Object.keys(props.celebrityDetails).length ?
              <AppBanner
                androidUrl={`profile/${props.match.params.id.toLowerCase()}`}
                iosUrl={`profile/?profile_id=${props.match.params.id.toLowerCase()}`}
                hideAppBanner={() => this.setState({ showAppBanner: false })}
              />
              : null
          } */}
          <Helmet
            title={getStarName(props.userDetails.nick_name, props.userDetails.first_name, props.userDetails.last_name)}
            meta={[...setMetaTags(
              getStarName(props.userDetails.nick_name, props.userDetails.first_name, props.userDetails.last_name),
              props.userDetails.avatar_photo ? props.userDetails.avatar_photo.thumbnail_url : '../../assets/images/profile.png',
              `Get your personalized video from ${getStarName(props.userDetails.nick_name, props.userDetails.first_name, props.userDetails.last_name)}`,
            ),
            { property: 'al:ios:app_store_id', content: env('IOS_APP_ID') },
            { property: 'al:ios:url', content: `${env('ANDROID_APP_ID')}://profile/?profile_id=${props.match.params.id.toLowerCase()}` },
            { property: 'al:ios:app_name', content: env('IOS_APP_NAME') },
            { property: 'al:android:package', content: env('ANDROID_APP_ID') },
            { property: 'al:android:url', content: `${env('ANDROID_APP_ID')}://profile/${props.match.params.id.toLowerCase()}` },
            { property: 'al:android:app_name', content: env('ANDROID_APP_NAME') },
            ]}
          />
          </StarProfileStyled.Container>
      }
  </StarProfileStyled>
  )
}

StarProfile.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  celebDetails: PropTypes.object.isRequired,
  detailsError: PropTypes.object,
  detailsLoading: PropTypes.bool.isRequired,
  fetchStarDetails: PropTypes.func.isRequired,
  resetStarDetails: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  followCelebrity: PropTypes.func.isRequired,
  fetchCelebVideosList: PropTypes.func.isRequired,
  fetchCelebReactionsList: PropTypes.func.isRequired,
  toggleRequestFlow: PropTypes.func.isRequired,
  updateFavouritesQueue: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  videosList: PropTypes.object.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  reactionsList: PropTypes.object.isRequired,
}

StarProfile.defaultProps = {
  detailsError: null
}

export default StarProfile;
