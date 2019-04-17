import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { TextInput } from '../../../TextField';
import { updateLoginStatus } from '../../../../store/shared/actions/login';
import { UploadContainer, ImageUpload } from './styled';
import { fetchUserDetails } from '../../../../store/shared/actions/getUserDetails';
import ProfileUpload from './components/profileUpload';
import { imageSizes } from '../../../../constants/imageSizes';
import DotsContainer from '../../../../components/Dots';
import ImageCropper from '../../../ImageCropper';

class SignUpImageUpload extends React.Component {

  state = {
    currentExif: null,
    verificationDisable: false,
    cropper: false,
    finalImage: null,
    finalFile: null,
    cropImage: null,
  }

  componentWillMount() {
  }

  onBack = () => {
    this.setState({
      cropper: false,
    });
  }

  setProfileImage = (flag1, imageResult, extension, flag2, exif) => {
    this.setState({
      cropper: true,
      currentExif: exif,
      cropImage: imageResult,
    });
    // this.goToStep('next');
  }

  getCroppedImage = (file, image) => {
    this.setState({ finalImage: image, finalFile: file });
  }

  closeCropper = () => {
    this.setState({ cropImage: null, cropper: false });
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
        {
          !this.state.cropper ?
            <UploadContainer.Wrapper>
              <UploadContainer.Heading>Give your fans what they want</UploadContainer.Heading>
              <DotsContainer
                dotsCount={3}
                selectedDot={2}
              />
              <ProfileUpload
                starMode
                onComplete={this.setProfileImage}
              />

              <UploadContainer.CategoriesWrapper>
                <TextInput
                  type="text"
                  name="categoriesList"
                  value=""
                  label="Categorize yourself. This helps fans find you. (up to 3)"
                />
                <UploadContainer.BrowseCategories>
                  Not finding one? <UploadContainer.BrowseCategoriesLink>Browse categories</UploadContainer.BrowseCategoriesLink>
                </UploadContainer.BrowseCategories>
              </UploadContainer.CategoriesWrapper>
              <UploadContainer.ButtonWrapper>
                <UploadContainer.ContinueButton
                  type="submit"
                >
                  Continue
                </UploadContainer.ContinueButton>
              </UploadContainer.ButtonWrapper>
            </UploadContainer.Wrapper>
          :
            <UploadContainer.CropperContainer>
              <ImageUpload.CropWrapper>
                <ImageUpload.BackButton onClick={this.onBack}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </ImageUpload.BackButton>
                <ImageUpload.CloseButton onClick={this.props.closeSignupFlow}>
                  <FontAwesomeIcon icon={faTimes} />
                </ImageUpload.CloseButton>
                <ImageUpload.Heading>Crop your photo</ImageUpload.Heading>
                <ImageCropper
                  exifData={this.state.currentExif}
                  aspectRatio={imageSizes.profile}
                  afterCrop={this.getCroppedImage}
                  closeCropper={() => this.closeCropper()}
                  cropImage={this.state.cropImage}
                />
              </ImageUpload.CropWrapper>
            </UploadContainer.CropperContainer>
        }
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
