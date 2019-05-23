import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { updateLoginStatus } from '../../../../store/shared/actions/login';
import { UploadContainer, ImageUpload, ErrorMessage } from './styled';
import { fetchUserDetails } from '../../../../store/shared/actions/getUserDetails';
import { updateCategory } from '../../../../pages/landing/actions/updateFilters';
import ProfileUpload from './components/profileUpload';
import TakePhoto from './components/takePhoto';
import { fetchSuggestionList } from '../../../../store/shared/actions/getSuggestionsList';
import { imageSizes } from '../../../../constants/imageSizes';
import DotsContainer from '../../../../components/Dots';
import PrimaryButton from '../../../../components/PrimaryButton';
import ImageCropper from '../../../ImageCropper';
import MultiSelect from '../../../MultiSelect';
import NestedSelect from '../../../NestedSelect';
import { awsImageUpload } from '../../../../services/awsImageUpload'
import { BackArrow, CloseButton } from '../../../../styles/CommonStyled';

class SignUpImageUpload extends React.Component {
  state = {
    currentExif: null,
    verificationDisable: false,
    cropper: false,
    finalImage: this.props.profilePic? this.props.profilePic : null,
    finalFile: null,
    cropImage: null,
    extension: null,
    takePicture: false,
    selectedCategory: [],
    selectedProfessions: [],
    subCategoriesArray: [],
    isContinue: false,
  };

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
      extension,
    });
    // this.goToStep('next');
  };

  getCroppedImage = (file, image) => {
    this.setState({ finalImage: image, finalFile: file });
    awsImageUpload(file, this.state.extension)
    .then((resp) => {
      const fileName = {
        "images": [resp],
        "avatar_photo": resp,
        "featured_image": "",
      }
      this.props.updateProfilePhoto(fileName);
      const fileURL = URL.createObjectURL(file);
      this.props.setProfilePicToState(fileURL);
    })
    .catch(() => {
    });
  };

  setTakePicture = () => {
    this.setState({ takePicture: true, cropper: false });
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

  continueClickhandler = () => {
    this.setState({isContinue: true});
    this.props.continueClickCallback(this.state.selectedProfessions, this.state.finalImage, this.state.cropImage);
  }
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
  handleFocusSelect = () => {};
  renderContent = () => {
    const { cropper, takePicture, selectedProfessions } = this.state;
    const { subcategories } = this.props.professionsList;
    subcategories.map(function(obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
    let nestedProfessions = this.props.professionsList.allProfessions;
    nestedProfessions = nestedProfessions.map((item) => {
      const newOption = {};
      newOption.label = item.title;
      newOption.value = item.id;
      if (item.child) {
        newOption.options = item.child.map((childItem) => {
          const childOption = {};
          childOption.label = childItem.title;
          childOption.value = childItem.id;
          return childOption;
        })
      }
      return newOption;
    })
    if (cropper) {
      return (
        <UploadContainer.CropperContainer>
          <BackArrow className='action-buttons' onClick={this.onBack} />
          <CloseButton className='action-buttons' onClick={this.onBack} />
          <ImageUpload.Heading>Crop your photo</ImageUpload.Heading>
          <ImageUpload.CropWrapper className='cropper-Wrapper'>
            <ImageCropper
              onTakePicture={this.setTakePicture}
              onUploadComplete={this.setProfileImage}
              exifData={this.state.currentExif}
              aspectRatio={imageSizes.profile}
              afterCrop={this.getCroppedImage}
              closeCropper={this.closeCropper}
              cropImage={this.state.cropImage}
            />
          </ImageUpload.CropWrapper>
        </UploadContainer.CropperContainer>
      );
    } else if (takePicture) {
      return (
        <UploadContainer.CropperContainer>
          <ImageUpload.CropWrapper>
            <BackArrow className='action-buttons' onClick={this.onBack} />
            <CloseButton className='action-buttons' onClick={this.onBack} />
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
            <BackArrow onClick={this.onBack} />
            <CloseButton onClick={this.onBack} />
            <UploadContainer.DesktopView>
              <UploadContainer.Heading>Browse categories</UploadContainer.Heading>
              <UploadContainer.BrowseCategoryContainer>
                {this.browserCategoryList()}
                {this.showSubCategoryList()}
              </UploadContainer.BrowseCategoryContainer>
            </UploadContainer.DesktopView>
            <UploadContainer.MobileView>
              <UploadContainer.Heading>
              {this.state.finalImage
                ? <span>You look great.<br />
                Now select a category.</span>
                : 'Browse categories'}
              </UploadContainer.Heading>
              <DotsContainer dotsCount={3} selectedDot={2} />
              <UploadContainer.BrowseCategoryContainer>
                <NestedSelect
                  value={this.state.selectedProfessions}
                  options={nestedProfessions}
                  placeholder=""
                  onChange={this.handleMultiSelect}
                  onFocus={this.handleFocusSelect}
                  label={<span>Categorize yourself. <br/>
                    This helps fans find you. (up to 3)</span>}
                />
              </UploadContainer.BrowseCategoryContainer>
            </UploadContainer.MobileView>
          </UploadContainer.BrowseCategoryWrapper>
        )}
        {!this.state.showBrowseCategory && (
          <React.Fragment>
            <UploadContainer.Heading className={this.state.finalImage ? 'select-category' : 'fans-want'}>
              {this.state.finalImage
                ? `You look great.
                  Now select a category.`
                : 'Give your fans what they want'}
            </UploadContainer.Heading>
            <DotsContainer dotsCount={3} selectedDot={2} />
            <ProfileUpload
              starMode
              onTakePicture={this.setTakePicture}
              onComplete={this.setProfileImage}
              image={this.state.finalImage}
              updateProfilePhoto={this.props.updateProfilePhoto}
            />
            {!(this.state.selectedProfessions.length > 0 && (this.state.finalImage || this.state.cropImage)) && this.state.isContinue &&(
              <ErrorMessage>Please add a profile image and choose at least one category</ErrorMessage>
            )}
            <UploadContainer.CategoriesWrapper>
              <MultiSelect
                value={this.state.selectedProfessions}
                options={subcategories}
                placeholder=""
                onChange={this.handleMultiSelect}
                onFocus={this.handleFocusSelect}
                label={<span>Categorize yourself. <br/>
                This helps fans find you. (up to 3)</span>}
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
              <PrimaryButton type="submit" onClick={this.continueClickhandler}>
                Continue
              </PrimaryButton>
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
