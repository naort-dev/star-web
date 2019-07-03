import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, Heading, Wrapper } from './styled';
import About from './About';
import Video from './Video';
import { BackArrow } from '../../../../../../styles/CommonStyled';
import getAWSCredentials from '../../../../../../utils/AWSUpload';
import { locations } from '../../../../../../constants/locations';
import {
  loaderAction,
  setVideoUploadedFlag,
  updateMediaStore,
  updateToast,
} from '../../../../../../store/shared/actions/commonActions';
import { audioVideoSupport, isIOSDevice } from '../../../../../../utils/checkOS';
import { updateUserDetails } from '../../../../../../store/shared/actions/saveSettings'; 

const WelcomeVideo = props => {
  const [compSwitch, compSwitchHandler] = useState(
    props.switched ? props.switched : false,
  );
  const [isDeviceSupported, setDeviceSupport] = useState(false);
  useEffect(() => {
    checkforAudioVideoSupport();
    props.updateMediaStore({
      videoSrc: props.userDetails.settings_celebrityDetails.profile_video,
      recordedTime: props.userDetails.settings_celebrityDetails.duration,
    });
  }, []);
  const checkforAudioVideoSupport = async () => {
    const deviceSupport = await audioVideoSupport('videoinput');
    if (deviceSupport) {
      setDeviceSupport(true);
    }
  };
  const continueCallback = () => {
      compSwitchHandler(true);
  };

  const backArrowClick = () => {
    if (compSwitch) {
      compSwitchHandler(false);
    } else {
      props.onBack();
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
              // props.setProfileVideo(response.filename);
              const finalUserDetails = {
                celebrity_details: {
                  profile_video: response.filename,
                },
                user_details: {},
              };
              props.updateUserDetails(props.userDetails.settings_userDetails.id, finalUserDetails);
              props.loaderAction(false);
              // props.setVideoUploadedFlag(true);
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
      <Heading>Welcome Video</Heading>
      <Wrapper>
        {/* <Scrollbars className="scrollbar"> */}
          {/* {compSwitch ? ( */}
            <Video
              uploadVideo={uploadVideo}
              loaderAction={props.loaderAction}
              // setVideoUploadedFlag={props.setVideoUploadedFlag}
              updateToast={props.updateToast}
              isDeviceSupported={isDeviceSupported}
              src={props.userDetails.settings_celebrityDetails.profile_video}
            />
          {/* ) : (
            <About
              continueCallback={continueCallback}
              isDeviceSupported={isDeviceSupported}
            />
          )
          } */}
        {/* </Scrollbars> */}
      </Wrapper>
    </Layout>
  );
};

WelcomeVideo.propTypes = {
  onBack: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  // setProfileVideo: PropTypes.func.isRequired,
  // setVideoUploadedFlag: PropTypes.func.isRequired,
  switched: PropTypes.bool,
  updateToast: PropTypes.func.isRequired,
};

WelcomeVideo.defaultProps = {
  switched: false,
  updateUserDetails: () =>{ },
};

function mapDispatchToProps(dispatch) {
  return {
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
    updateMediaStore: payload => dispatch(updateMediaStore(payload)),
    // setVideoUploadedFlag: value => {
    //   dispatch(setVideoUploadedFlag(value));
    // },
    updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
    updateToast: toastObj => dispatch(updateToast(toastObj)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(WelcomeVideo);
