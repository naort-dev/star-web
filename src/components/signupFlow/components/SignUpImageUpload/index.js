import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { updateLoginStatus } from '../../../../store/shared/actions/login';
import { UploadContainer, ImageUpload } from './styled';
import { fetchUserDetails } from '../../../../store/shared/actions/getUserDetails';
import { updateCategory } from '../../../../pages/landing/actions/updateFilters';
import ProfileUpload from './components/profileUpload';
import TakePhoto from './components/takePhoto';
import { fetchSuggestionList } from '../../../../store/shared/actions/getSuggestionsList';
import { imageSizes } from '../../../../constants/imageSizes';
import DotsContainer from '../../../../components/Dots';
import ImageCropper from '../../../ImageCropper';
import MultiSelect from '../../../MultiSelect';

class SignUpImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExif: null,
      verificationDisable: false,
      cropper: false,
      finalImage: null,
      finalFile: null,
      cropImage: null,
      takePicture: false,
      showBrowseCategory: false,
      subCategoriesArray: [],
      selectedProfessions: [],
      selectedCategory: [],
    };
    this.cursorPos = -1;
    this.suggestionsFetchDelay = undefined;
  }
  componentWillMount() {}

  onBack = () => {
    this.setState({
      cropper: false,
      takePicture: false,
      showBrowseCategory: false,
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

  setTakePicture = () => {
    this.setState({ takePicture: true });
  };

  getSubCategoryList = id => {
    let { professions } = this.props.professionsList;
    professions = professions.filter(profession => profession.id === id);
    professions[0].child.map(function(obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
    this.setState({
      subCategoriesArray: professions[0].child,
      selectedCategory: professions,
    });
  };

  getSelectedCategoryList = profession => {
    let { selectedProfessions } = this.state;
    if (selectedProfessions.find(cat => cat.id === profession.id)) {
      selectedProfessions = selectedProfessions.filter(
        cat => cat.id !== profession.id,
      );
      this.setState({ selectedProfessions });
    } else if (selectedProfessions.length < 3) {
      selectedProfessions = [...selectedProfessions, profession];
      this.setState({ selectedProfessions });
    }
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

  closeCropper = () => {
    this.setState({
      cropImage: null,
      cropper: false,
      takePicture: false,
      showBrowseCategory: false,
    });
  };

  browserCategory = () => {
    this.setState({ showBrowseCategory: true });
  };

  updateMainCategory = (title, value, subCategories) => () => {
    this.props.updateCategory(title, value, subCategories);
  };

  browserCategoryList = () => {
    const professionsList = this.props.professionsList.allProfessions;
    return (
      <UploadContainer.ItemWrapper>
        {professionsList.map(profession => {
          return (
            <UploadContainer.Item
              key={profession.id}
              onClick={() => this.getSubCategoryList(profession.id)}
              selected={this.state.selectedCategory.find(
                cat => cat.id === profession.id,
              )}
              className="categoryItem"
            >
              {profession.title}
            </UploadContainer.Item>
          );
        })}
      </UploadContainer.ItemWrapper>
    );
  };

  showSubCategoryList = () => {
    const { subCategoriesArray } = this.state;
    return (
      <React.Fragment>
        <div className="right-section">
          <div className="subCategoryHeading">
            Choose the category that describes what you do best:
            <span>{`(${3 -
              this.state.selectedProfessions.length} remaining)`}</span>
          </div>
          <Scrollbars className="browse-category-list">
            <UploadContainer.SubItemWrapper>
              {subCategoriesArray.map(profession => {
                return (
                  <UploadContainer.Item
                    key={profession.id}
                    onClick={() => this.getSelectedCategoryList(profession)}
                    selected={this.state.selectedProfessions.find(
                      cat => cat.id === profession.id,
                    )}
                  >
                    {profession.title}
                  </UploadContainer.Item>
                );
              })}
            </UploadContainer.SubItemWrapper>
          </Scrollbars>
        </div>
      </React.Fragment>
    );
  };

  handleMultiSelect = list => {
    if (list.length < 4) {
      this.setState({ selectedProfessions: list });
    }
  };
  handleFocusSelect = () => {
  };
  renderContent = () => {
    const { cropper, takePicture, selectedProfessions } = this.state;
    const { subcategories } = this.props.professionsList;
    subcategories.map(function(obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
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
        {this.state.showBrowseCategory && (
          <UploadContainer.BrowseCategoryWrapper>
            <ImageUpload.BackButton onClick={this.onBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ImageUpload.BackButton>
            <ImageUpload.CloseButton onClick={this.props.closeSignupFlow}>
              <FontAwesomeIcon icon={faTimes} />
            </ImageUpload.CloseButton>
            <UploadContainer.Heading>Browse categories</UploadContainer.Heading>
            <UploadContainer.BrowseCategoryContainer>
              {this.browserCategoryList()}
              {this.showSubCategoryList()}
            </UploadContainer.BrowseCategoryContainer>
          </UploadContainer.BrowseCategoryWrapper>
        )}
        {!this.state.showBrowseCategory && (
          <React.Fragment>
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
              <MultiSelect
                value={this.state.selectedProfessions}
                options={subcategories}
                placeholder=""
                onChange={this.handleMultiSelect}
                onFocus={this.handleFocusSelect}
                label="Categorize yourself. This helps fans find you. (up to 3)"
              />
              <UploadContainer.BrowseCategories>
                Not finding one?{' '}
                <UploadContainer.BrowseCategoriesLink
                  onClick={this.browserCategory}
                >
                  Browse categories
                </UploadContainer.BrowseCategoriesLink>
              </UploadContainer.BrowseCategories>
            </UploadContainer.CategoriesWrapper>
            <UploadContainer.ButtonWrapper>
              <UploadContainer.ContinueButton
                type="submit"
                onClick={this.props.continueClickCallback}
              >
                Continue
              </UploadContainer.ContinueButton>
            </UploadContainer.ButtonWrapper>
          </React.Fragment>
        )}
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
  professionsList: state.professionsList,
});

const mapProps = dispatch => ({
  updateLoginStatus: sessionDetails =>
    dispatch(updateLoginStatus(sessionDetails)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  fetchSuggestionList: searchParam =>
    dispatch(fetchSuggestionList(searchParam)),
  updateCategory: (label, value, subCategories) =>
    dispatch(updateCategory(label, value, subCategories)),
});

export default connect(
  mapStateToProps,
  mapProps,
)(SignUpImageUpload);
