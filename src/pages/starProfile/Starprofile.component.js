import React, { useEffect } from 'react';
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
import CallToAction from './components/CallToAcion';
import DetailSection from './components/DetailSection';
import Header from '../../components/Header';

const StarProfile = (props) => {
  
  const getUserId = () => {
    return props.match.params.id;
  }

  const onBackClick = () => {
    props.history.goBack();
  }

  useEffect(() => {
    props.fetchStarDetails(getUserId());
    return () => {
      props.resetStarDetails();
    }
  }, [])

  return (
    <StarProfileStyled>
      <Header
        onBackClick={onBackClick}
        showBack
      />
      <CallToAction
        userDetails={props.userDetails}
        celebDetails={props.celebDetails}
      />
      <DetailSection
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
    asdasdasdasd
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
}

export default StarProfile;
