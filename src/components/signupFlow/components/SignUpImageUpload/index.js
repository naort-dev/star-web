import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { TextInput } from '../../../TextField';
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

function MultiValue(props) {
  return (
    <Chip
    tabIndex={-1}
    label={props.children}
    onDelete={props.removeProps.onClick}
    // deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}
const components = {
  MultiValue,
};

function deleteCategory(props) {
  console.log(props);

}
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
      categoriesValue: '',
      takePicture: false,
      showSuggestions: false,
      showBrowseCategory: false,
      subCategoriesArray: [],
      selectedProfessions: [],
    };
    this.cursorPos = -1;
    this.suggestionsFetchDelay = undefined;
  }
  componentWillMount() {
  }


  onBack = () => {
    this.setState({
      cropper: false,
      takePicture: false,
      showBrowseCategory: false,
    });
  }

  setProfileImage = (imageResult, exif, extension) => {    
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

  getCategories = (e) => {
    this.setState({
      categoriesValue: e.target.value,
    });
    if (e.target.value.trim('').length >= 3) {
      this.setState({ showSuggestions: true });
      if (this.suggestionsFetchDelay) {
        clearTimeout(this.suggestionsFetchDelay);
      }
      this.suggestionsFetchDelay = setTimeout(() => {
        this.props.fetchSuggestionList(this.state.categoriesValue.trim(''));
      }, 500);
    } else {
      this.setState({ showSuggestions: false });
      this.cursorPos = -1;
    }
  }

  setTakePicture = () => {
    this.setState({ takePicture: true });
  }

  getSubCategoryList = (id) => {
    let { professions } = this.props.professionsList;
    professions = professions.filter(profession => profession.id === id);
    professions[0].child.map(function (obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
    this.setState({
      subCategoriesArray: professions[0].child,
    });
  }

  getSelectedCategoryList = (profession) => {
    let { selectedProfessions } = this.state;
    if (selectedProfessions.find(cat => cat.id === profession.id)) {
      selectedProfessions = selectedProfessions.filter(cat => cat.id !== profession.id);
      this.setState({ selectedProfessions });
    } else if (selectedProfessions.length < 3) {
      selectedProfessions = [...selectedProfessions, profession];
      this.setState({ selectedProfessions });
    }
  }

  showSuggestions = () => {
    if (this.state.searchText.trim('').length >= 3) {
      this.setState({ showSuggestions: true });
    }
  }

  handleSearchSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.updateSearchParam(e.target.value.trim(''));
      if (this.props.history.location.pathname != '/') {
        this.props.history.push('/');
      }
      this.setState({ searchText: e.target.value.trim(''), searchActive: false, showSuggestions: false });
    }
    this.setListFocus(e);
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

  closeCropper = () => {
    this.setState({
      cropImage: null,
      cropper: false,
      takePicture: false,
      showBrowseCategory: false,
    });
  }

  browserCategory = () => {
    this.setState({ showBrowseCategory: true });
  }

  updateMainCategory = (title, value, subCategories) => () => {
    this.props.updateCategory(title, value, subCategories);
  }

  browserCategoryList = () => {
    const professionsList = this.props.professionsList.allProfessions;
    return (
      <UploadContainer.ItemWrapper>
        {
          professionsList.map((profession) => {
            return (
              <UploadContainer.Item
                key={profession.id}
                onClick={() => this.getSubCategoryList(profession.id)}
              >
                {profession.title}
              </UploadContainer.Item>
            );
          })
        }
      </UploadContainer.ItemWrapper>
    );
  }

  showSubCategoryList = () => {
    const { subCategoriesArray } = this.state;
    return (
      <UploadContainer.SubItemWrapper>
        <div className="subCategoryHeading">
          Choose the category that describes what you do best:
          <span>{`(${3 - this.state.selectedProfessions.length} remaining)`}</span>
        </div>
        {
          subCategoriesArray.map((profession) => {
            return (
              <UploadContainer.Item
                key={profession.id}
                onClick={() => this.getSelectedCategoryList(profession)}
                selected={this.state.selectedProfessions.find(cat => cat.id === profession.id)}
              >
                {profession.title}
              </UploadContainer.Item>
            );
          })
        }
      </UploadContainer.SubItemWrapper>
    );
  }

  renderSuggestionsList = () => {

  }

  handleMultiSelect = (list) => {
    this.setState({ selectedProfessions: list })
  }
  renderContent = () => {
    const { cropper, takePicture, selectedProfessions } = this.state;
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
        {
          this.state.showBrowseCategory &&
          <UploadContainer.BrowseCategoryWrapper>
            <ImageUpload.BackButton onClick={this.onBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ImageUpload.BackButton>
            <ImageUpload.CloseButton onClick={this.props.closeSignupFlow}>
              <FontAwesomeIcon icon={faTimes} />
            </ImageUpload.CloseButton>
            <UploadContainer.Heading>Browse categories</UploadContainer.Heading>
            <UploadContainer.BrowseCategoryContainer>
              {
                this.browserCategoryList()
              }
              {
                this.showSubCategoryList()
              }
            </UploadContainer.BrowseCategoryContainer>
          </UploadContainer.BrowseCategoryWrapper>
        }
        <UploadContainer.Heading>
          {this.state.finalImage ? 'You look great. Now select a category.' : 'Give your fans what they want'}
        </UploadContainer.Heading>
        <DotsContainer
          dotsCount={3}
          selectedDot={2}
        />
        <ProfileUpload
          starMode
          onTakePicture={this.setTakePicture}
          onComplete={this.setProfileImage}
          image={this.state.finalImage}
        />

        <UploadContainer.CategoriesWrapper>
          <MultiSelect
            value={this.state.selectedProfessions}
            options={selectedProfessions}
            placeholder=""
            components={components}
            onChange={this.handleMultiSelect}
            label='Categorize yourself. This helps fans find you. (up to 3)'
          />
          <UploadContainer.BrowseCategories>
            Not finding one? <UploadContainer.BrowseCategoriesLink onClick={this.browserCategory}>Browse categories</UploadContainer.BrowseCategoriesLink>
          </UploadContainer.BrowseCategories>
          {this.state.showSuggestions &&
            <UploadContainer.SuggestionListWrapper>
              <UploadContainer.AutoSuggest>
                {
                  this.renderSuggestionsList()
                }
              </UploadContainer.AutoSuggest>
            </UploadContainer.SuggestionListWrapper>
          }
        </UploadContainer.CategoriesWrapper>
        <UploadContainer.ButtonWrapper>
          <UploadContainer.ContinueButton
            type="submit"
          >
            Continue
          </UploadContainer.ContinueButton>
        </UploadContainer.ButtonWrapper>
      </UploadContainer.Wrapper>
    );
  }

  render() {
    return (
      <UploadContainer.Container>
        { this.renderContent() }

      </UploadContainer.Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.session.loading,
  professionsList: state.professionsList,
});

const mapProps = dispatch => ({
  updateLoginStatus: sessionDetails => dispatch(updateLoginStatus(sessionDetails)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  fetchSuggestionList: searchParam => dispatch(fetchSuggestionList(searchParam)),
  updateCategory: (label, value, subCategories) => dispatch(updateCategory(label, value, subCategories)),
});

export default connect(mapStateToProps, mapProps)(SignUpImageUpload);
