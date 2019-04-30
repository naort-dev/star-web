import React, { useState } from 'react';
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
} from '../../../../store/shared/actions/commonActions';

const WelcomeVideo = props => {
  const [compSwitch, compSwitchHandler] = useState(
    props.switched ? props.switched : false,
  );
  const continueCallback = () => {
    compSwitchHandler(true);
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
          const payload = {
            starDetail: {
              id: 'MYervpeO',
            },
            fileName: response.filename,
          };
          axios
            .post(response.url, response.formData)
            .then(() => {
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
    <Layout>
      <BackArrow className="leftArrow" onClick={backArrowClick} />
      <Heading>Welcome Video - Say Hello!</Heading>
      <DotsContainer dotsCount={3} selectedDot={3} />
      <Wrapper>
        <Scrollbars className="scrollbar">
          {compSwitch ? (
            <Video
              skipCallback={props.skipCallback}
              uploadVideo={uploadVideo}
              loaderAction={props.loaderAction}
              setVideoUploadedFlag={props.setVideoUploadedFlag}
            />
          ) : (
            <About
              continueCallback={continueCallback}
              skipCallback={props.skipCallback}
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
  setVideoUploadedFlag: PropTypes.func.isRequired,
  switched: PropTypes.bool,
};

WelcomeVideo.defaultProps = {
  switched: false,
};

function mapDispatchToProps(dispatch) {
  return {
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
    setVideoUploadedFlag: value => {
      dispatch(setVideoUploadedFlag(value));
    },
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(WelcomeVideo);
