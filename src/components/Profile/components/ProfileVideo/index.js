import React from 'react';
import { connect } from 'react-redux';
import WelcomeVideo from './components/WelcomeVideo';

import fetchAWSVideo from '../../../../services/getAwsVideo';

const ProfileVideo = props => {

  // const setProfileVideo = (fileName) => {
  //   fetchAWSVideo(awsKeys.accountVideo, fileName)
  //     .then((resp => {
  //       // this.props.setSignupFlow(videoDetails);
  //     }));
  //   // this.setState({ profile_video: fileName });
  // }
  const onBack = () => {
    props.goBack();
  };
  return(
    <WelcomeVideo
      onBack={onBack}
      userDetails={props.userDetails}
      // setProfileVideo={setProfileVideo}
    />
  );

}

const mapStateToProps = (state)=> ({
  userDetails: state.userDetails,
});

const mapDispatchToProps = dispatch => ({
});

ProfileVideo.propTypes = {

};
const ProfileVideoRoot = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileVideo);
export { ProfileVideoRoot };
