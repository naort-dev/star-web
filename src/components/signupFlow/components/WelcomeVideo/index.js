import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, Heading, Wrapper } from './styled';
import DotsContainer from '../../../../components/Dots';
import About from './About';
import Video from './Video';
import { BackArrow } from '../../../../styles/CommonStyled';
import getAWSCredentials from '../../../../utils/AWSUpload';
import { locations } from '../../../../constants/locations';
import {
  loaderAction,
  setVideoUploadedFlag,
  updateMediaStore,
  updateToast,
} from '../../../../store/shared/actions/commonActions';
import { audioVideoSupport, isIOSDevice } from '../../../../utils/checkOS';

const WelcomeVideo = props => {
  const [compSwitch, compSwitchHandler] = useState(
    props.switched ? props.switched : false,
  );
  const [isDeviceSupported, setDeviceSupport] = useState(false);
  useEffect(() => {
    checkforAudioVideoSupport();
    props.updateMediaStore({
      videoSrc: props.signupDetails.welcomeVideo,
      recordedTime: props.signupDetails.welcomeVideoLength,
    });
    props.setVideoUploadedFlag(props.signupDetails.videoUploaded);
  }, []);
  const checkforAudioVideoSupport = async () => {
    const deviceSupport = await audioVideoSupport('videoinput');
    console.log(deviceSupport);
    if (deviceSupport) {
      setDeviceSupport(true);
      props.audioVideoSupport(true);
    } else {
      props.audioVideoSupport(false);
    }
  };
  const continueCallback = () => {
    if (!isIOSDevice() && !isDeviceSupported) {
      props.changeStep(props.currentStep + 2);
    } else {
      compSwitchHandler(true);
    }
  };

  const backArrowClick = () => {
    if (compSwitch) {
      compSwitchHandler(false);
    } else {
      props.onBack(false);
    }
  };

  const uploadVideo = file => {
    const video = new File([file], 'welcome-video.mp4');
    props.loaderAction(true);
    getAWSCredentials(locations.getAwsVideoCredentials, video)
      .then(response => {
        if (response && response.filename) {
          axios
            .post(response.url, response.formData)
            .then(() => {
              props.setProfileVideo(response.filename);
              props.changeStep(props.currentStep + 2);
              props.loaderAction(false);
              props.setVideoUploadedFlag(true);
            })
            .catch(() => {
              props.loaderAction(false);
            });
        }
      })
      .catch(() => {
        props.loaderAction(false);
      });
  };

  return (
    <Layout compSwitch={compSwitch}>
      <BackArrow className="leftArrow" onClick={backArrowClick} />
      <Heading>Welcome Video - Say Hello!</Heading>
      <DotsContainer dotsCount={3} selectedDot={3} />
      <Wrapper>
        <Scrollbars className="scrollbar">
          {compSwitch ? (
            <Video
              skipCallback={props.skipCallback}
              changeStep={props.changeStep}
              currentStep={props.currentStep}
              uploadVideo={uploadVideo}
              loaderAction={props.loaderAction}
              setVideoUploadedFlag={props.setVideoUploadedFlag}
              updateToast={props.updateToast}
            />
          ) : (
            <About
              continueCallback={continueCallback}
              skipCallback={props.skipCallback}
              isDeviceSupported={isDeviceSupported}
            />
          )}
        </Scrollbars>
      </Wrapper>
    </Layout>
  );
};

WelcomeVideo.propTypes = {
  onBack: PropTypes.func.isRequired,
  skipCallback: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  setProfileVideo: PropTypes.func.isRequired,
  setVideoUploadedFlag: PropTypes.func.isRequired,
  switched: PropTypes.bool,
  updateToast: PropTypes.func.isRequired,
};

WelcomeVideo.defaultProps = {
  switched: false,
  // setProfileVideo: () =>{ },
};

function mapDispatchToProps(dispatch) {
  return {
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
    updateMediaStore: payload => dispatch(updateMediaStore(payload)),
    setVideoUploadedFlag: value => {
      dispatch(setVideoUploadedFlag(value));
    },
    updateToast: toastObj => dispatch(updateToast(toastObj)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(WelcomeVideo);
