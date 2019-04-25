import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { TextInput } from '../../../TextField';
import { updateLoginStatus } from '../../../../store/shared/actions/login';
import { UploadContainer, ImageUpload } from './styled';
import { fetchUserDetails } from '../../../../store/shared/actions/getUserDetails';
import ProfileUpload from './components/profileUpload';
import TakePhoto from './components/takePhoto';
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
    categoriesValue: '',
    takePicture: false,
  };

  componentWillMount() {}

  onBack = () => {
    this.setState({
      cropper: false,
      takePicture: false,
    });
  };

  setProfileImage = (imageResult, exif, extension) => {
    this.setState({
      cropper: true,
      currentExif: exif,
      cropImage: imageResult,
    });
    // this.goToStep('next');
  };

  getCroppedImage = (file, image) => {
    this.setState({ finalImage: image, finalFile: file });
  };

  closeCropper = () => {
    this.setState({ cropImage: null, cropper: false, takePicture: false });
  };

  goToStep = type => {
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
  };

  getCategories = e => {
    this.setState({
      categoriesValue: e.target.value,
    });
  };

  setTakePicture = () => {
    this.setState({ takePicture: true });
  };
  continueClickHandler = () => {
    this.props.continueClickCallback();
  };

  renderContent = () => {
    const { cropper, takePicture } = this.state;
    if (cropper) {
      return (
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
      );
    } else if (takePicture) {
      return (
        <UploadContainer.CropperContainer>
          <ImageUpload.CropWrapper>
            <ImageUpload.BackButton onClick={this.onBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ImageUpload.BackButton>
            <ImageUpload.CloseButton onClick={this.props.closeSignupFlow}>
              <FontAwesomeIcon icon={faTimes} />
            </ImageUpload.CloseButton>
            <ImageUpload.Heading>Take your photo</ImageUpload.Heading>
            <TakePhoto
              takePicture={takePicture}
              onPictureCapture={this.setProfileImage}
            />
          </ImageUpload.CropWrapper>
        </UploadContainer.CropperContainer>
      );
    }
    return (
      <UploadContainer.Wrapper>
        <UploadContainer.Heading>
          {this.state.finalImage
            ? 'You look great. Now select a category.'
            : 'Give your fans what they want'}
        </UploadContainer.Heading>
        <DotsContainer dotsCount={3} selectedDot={2} />
        <ProfileUpload
          starMode
          onTakePicture={this.setTakePicture}
          onComplete={this.setProfileImage}
          image={this.state.finalImage}
        />

        <UploadContainer.CategoriesWrapper>
          <TextInput
            type="text"
            name="categoriesList"
            label="Categorize yourself. This helps fans find you. (up to 3)"
            value={this.state.categoriesValue}
            onChange={event => this.getCategories(event)}
          />
          <UploadContainer.BrowseCategories>
            Not finding one?{' '}
            <UploadContainer.BrowseCategoriesLink>
              Browse categories
            </UploadContainer.BrowseCategoriesLink>
          </UploadContainer.BrowseCategories>
        </UploadContainer.CategoriesWrapper>
        <UploadContainer.ButtonWrapper>
          <UploadContainer.ContinueButton
            type="submit"
            onClick={this.continueClickHandler}
          >
            Continue
          </UploadContainer.ContinueButton>
        </UploadContainer.ButtonWrapper>
      </UploadContainer.Wrapper>
    );
  };

  render() {
    return (
      <UploadContainer.Container>
        {this.renderContent()}
      </UploadContainer.Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.session.loading,
});

const mapProps = dispatch => ({
  updateLoginStatus: sessionDetails =>
    dispatch(updateLoginStatus(sessionDetails)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export default connect(
  mapStateToProps,
  mapProps,
)(SignUpImageUpload);
