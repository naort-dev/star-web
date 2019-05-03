import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { isEmpty } from 'lodash';
// import { Redirect } from 'react-router-dom';
// import Helmet from 'react-helmet';
// import AppBanner from '../../components/AppBanner';
// import Loader from '../../components/Loader';
// import Popup from '../../components/Popup';
// import { getStarsonaVideo } from '../../services';
// import { requestTypes } from '../../constants/requestTypes';
// import { fetch } from '../../services/fetch';
// import { checkPrerender } from '../../utils/checkOS';
import StarProfileStyled from './styled';
// import { setMetaTags } from '../../utils/setMetaTags';
// import { starProfessionsDotFormater } from '../../utils/dataToStringFormatter';
// import ShareView from '../../components/ShareView';
import CallToAction from './components/CallToAction';
import DetailSection from './components/DetailSection';
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

  useEffect(() => {
    props.fetchStarDetails(getUserId());
    return () => {
      props.resetStarDetails();
    }
  }, [])

  useEffect(() => {
    props.fetchStarDetails(getUserId());
  }, [props.isLoggedIn])

  useEffect(() => {
    props.fetchStarDetails(getUserId());
  }, [props.match.params.id])

  return (
    <StarProfileStyled>
      <StarProfileStyled.Container>
        <Header
          onBackClick={onBackClick}
          showBack
        />
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
      {/* {
        this.state.showAppBanner && Object.keys(props.userDetails).length && Object.keys(props.celebrityDetails).length ?
          <AppBanner
            androidUrl={`profile/${props.match.params.id.toLowerCase()}`}
            iosUrl={`profile/?profile_id=${props.match.params.id.toLowerCase()}`}
            hideAppBanner={() => this.setState({ showAppBanner: false })}
          />
          : null
      } */}
      {/* <Helmet
        title={fullName}
        meta={[...setMetaTags(
          fullName,
          props.userDetails.avatar_photo ? props.userDetails.avatar_photo.thumbnail_url : '../../assets/images/profile.png',
          `Get your personalized video from ${fullName}`,
        ),
        { property: 'al:ios:app_store_id', content: env('IOS_APP_ID') },
        { property: 'al:ios:url', content: `${env('ANDROID_APP_ID')}://profile/?profile_id=${props.match.params.id.toLowerCase()}` },
        { property: 'al:ios:app_name', content: env('IOS_APP_NAME') },
        { property: 'al:android:package', content: env('ANDROID_APP_ID') },
        { property: 'al:android:url', content: `${env('ANDROID_APP_ID')}://profile/${props.match.params.id.toLowerCase()}` },
        { property: 'al:android:app_name', content: env('ANDROID_APP_NAME') },
        ]}
      /> */}
      </StarProfileStyled.Container>
  </StarProfileStyled>
  )
}

StarProfile.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  celebDetails: PropTypes.object.isRequired,
  fetchStarDetails: PropTypes.func.isRequired,
  resetStarDetails: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  followCelebrity: PropTypes.func.isRequired,
  updateFavouritesQueue: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
}

export default StarProfile;
