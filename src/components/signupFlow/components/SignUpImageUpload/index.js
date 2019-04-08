import React from 'react';
import { connect } from 'react-redux';
import { updateLoginStatus } from '../../../../store/shared/actions/login';
import { UploadContainer } from './styled';
import { fetchUserDetails } from '../../../../store/shared/actions/getUserDetails';
import ProfileUpload from './components/profileUpload';

class SignUpImageUpload extends React.Component {

  state = {
    profileImage: {
      fileName: null,
      image: null,
    },
    verificationDisable: false,
  }

  componentWillMount() {
  }

  setProfileImage = (fileName, image) => {
    this.setState({
      profileImage: {
        ...this.state.profileImage,
        fileName,
        image,
      },
    });
    // this.goToStep('next');
  }

  goToStep = (type) => {
    const { verificationDisable } = this.state;
    if (type === 'prev') {
      if (verificationDisable && this.props.currentStep === 8) {
        this.props.changeStep(this.props.currentStep - 2);
      } else {
        this.props.changeStep(this.props.currentStep - 1);
      }
    } else if (verificationDisable && this.props.currentStep === 6) {
      this.props.changeStep(this.props.currentStep + 2);
    } else {
      this.props.changeStep(this.props.currentStep + 1);
    }
  }

  render() {
    return (
      <UploadContainer.Container>
        <UploadContainer.Heading>Give your fans what they want</UploadContainer.Heading>
        <ProfileUpload
          starMode
          onComplete={this.setProfileImage}
        />
      </UploadContainer.Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.session.loading,
});

const mapProps = dispatch => ({
  updateLoginStatus: sessionDetails => dispatch(updateLoginStatus(sessionDetails)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export default connect(mapStateToProps, mapProps)(SignUpImageUpload);
