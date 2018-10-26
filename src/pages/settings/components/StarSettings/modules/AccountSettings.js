import React from 'react';
import validator from 'validator';
import ManagePayments from '../../../../../components/ManagePayments';
import Popup from '../../../../../components/Popup';
import ChangePassword from '../../../../../components/MyAccount/ChangePassword';
import { imageSizes } from '../../../../../constants/imageSizes';
import ImageUpload from '../../ImageUpload';
import SettingsStyled from '../../../styled';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      managePayment: false,
      changePassword: false,
      featuredImage: {
        image: props.userDetails.featured_photo ? props.userDetails.featured_photo.image_url : null,
        file: props.userDetails.featured_photo ? props.userDetails.featured_photo.photo : null,
      },
      profileImage: {
        image: props.userDetails.avatar_photo ? props.userDetails.avatar_photo.image_url : null,
        file: props.userDetails.avatar_photo ? props.userDetails.avatar_photo.photo : null,
      },
      secondaryImages: [],
      firstName: props.userDetails.first_name ? props.userDetails.first_name : '',
      lastName: props.userDetails.last_name ? props.userDetails.last_name : '',
      email: props.userDetails.email ? props.userDetails.email : '',
      celebrityStarsonaMessage: props.userDetails.notification_settings ? props.userDetails.notification_settings.celebrity_starsona_message : false,
      celebrityAccountUpdates: props.userDetails.notification_settings ? props.userDetails.notification_settings.celebrity_account_updates : false,
      fanStarsonaVideos: props.userDetails.notification_settings ? props.userDetails.notification_settings.fan_starsona_videos : false,
      errors: {
        firstName: false,
        lastName: false,
      },
      cancelDetails: false,
    };
    this.state = {
      ...this.initialState,
    };
  }

  componentWillMount() {
    this.setInitialData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.changePasswordData.submitStatus) {
      nextProps.resetChangePassword();
      this.setState({ changePassword: false });
    }
    if (this.state.cancelDetails) {
      this.setState({
        ...this.initialState,
      }, () => {
        this.setInitialData();
      });
    }
  }

  setInitialData = () => {
    if (this.props.userDetails && this.props.userDetails.images) {
      const secondaryImages = this.props.userDetails.images.map((image) => {
        return {
          fileName: image.photo,
          image: image.image_url,
        };
      });
      this.setState({ secondaryImages });
    }
  }

  getProfilePhotos = (type, file, image) => {
    if (type.indexOf('secondaryImage') > -1) {
      const { secondaryImages } = this.state;
      const index = type.split('-')[1];
      if (!secondaryImages.length) {
        secondaryImages.push({
          fileName: file,
          image,
        });
      } else {
        secondaryImages[index] = {
          fileName: file,
          image,
        };
      }
      this.setState({ secondaryImages });
    } else {
      this.setState({
        [type]: {
          image,
          file,
        },
      });
    }
  }

  handleFieldChange = (fieldType, fieldValue) => {
    this.setState({
      [fieldType]: fieldValue,
      errors: { ...this.state.errors, [fieldType]: false },
    });
  };

  validateFields = () => {
    let { firstName, lastName } = this.state.errors;
    firstName = validator.isEmpty(this.state.firstName);
    lastName = validator.isEmpty(this.state.lastName);
    this.setState({ errors: { ...this.state.errors, firstName, lastName } });
    return !firstName && !lastName;
  }

  removeSecondaryImage = (itemIndex) => {
    const { secondaryImages } = this.state;
    secondaryImages.splice(itemIndex, 1);
    this.setState({ secondaryImages });
  }

  submitAccountDetails = () => {
    if (this.validateFields()) {
      const userDetails = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      };
      const secondaryFileNames = this.state.secondaryImages.map((item) => {
        if (item.image) {
          return item.fileName;
        }
      });
      const profileImages = {
        avatar_photo: this.state.profileImage.file,
        images: [this.state.profileImage.file, ...secondaryFileNames],
      };
      if (this.state.featuredImage.file) {
        profileImages['featured_image'] = this.state.featuredImage.file;
        profileImages.images = [...profileImages.images, this.state.featuredImage.file]
      }
      this.props.submitAccountDetails(userDetails, profileImages);
    }
  }

  cancelDetails = () => {
    this.setState({ cancelDetails: true });
    this.props.fetchUserDetails();
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.managePayment ?
            <ManagePayments
              onClosePayments={() => this.setState({ managePayment: false })}
            />
          : null
        }
        {
          this.state.changePassword ?
            <Popup
              closePopUp={() => this.setState({ changePassword: false })}
              smallPopup
            >
              <ChangePassword
                changePassword={this.props.changePassword}
                changePasswordData={this.props.changePasswordData}
                resetChangePassord={this.props.resetChangePassword}
              />
            </Popup>
          : null
        }
        <ImageUpload
          profileImage={this.state.profileImage.image}
          featuredImage={this.state.featuredImage.image}
          secondaryImages={this.state.secondaryImages}
          removeSecondaryImage={this.removeSecondaryImage}
          featuredRatio={imageSizes.featured}
          secondaryRatio={imageSizes.first}
          onComplete={this.getProfilePhotos}
        />
        <SettingsStyled.InputwrapperDiv>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>First name</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  value={this.state.firstName}
                  placeholder="First name"
                  onChange={(event) => {
                    this.handleFieldChange('firstName', event.target.value);
                  }}
                />
                <SettingsStyled.ErrorMsg isError={this.state.errors.firstName}>
                  {this.state.errors.firstName
                    ? 'Please enter a first name'
                    : null}
                </SettingsStyled.ErrorMsg>
              </SettingsStyled.CustomInput>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Last name</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  value={this.state.lastName}
                  placeholder="Last name"
                  onChange={(event) => {
                    this.handleFieldChange('lastName', event.target.value);
                  }}
                />
                <SettingsStyled.ErrorMsg isError={this.state.errors.lastName}>
                  {this.state.errors.lastName
                    ? 'Please enter a last name'
                    : null}
                </SettingsStyled.ErrorMsg>
              </SettingsStyled.CustomInput>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
        </SettingsStyled.InputwrapperDiv>
        <SettingsStyled.HeadingWrapper>
          <SettingsStyled.SubHeading>
            Private information
          </SettingsStyled.SubHeading>
          <SettingsStyled.SubHeadingDescription>
            This information is private and will not be shared
            publicly
          </SettingsStyled.SubHeadingDescription>
        </SettingsStyled.HeadingWrapper>
        <SettingsStyled.InputwrapperDiv>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Email</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.ReadOnlySection>
                  {this.state.email}
                </SettingsStyled.ReadOnlySection>
              </SettingsStyled.CustomInput>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Password</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.ActionText onClick={() => this.setState({ changePassword: true })}>
                Manage your password
              </SettingsStyled.ActionText>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Payment method</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.ActionText onClick={() => this.setState({ managePayment: true })}>
                Manage your payments methods
              </SettingsStyled.ActionText>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Notifications</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CheckBoxesWrapper>
                <SettingsStyled.CheckBoxWrapper id="checkbox_container">
                  <span>Messages from Starsona</span>
                  <input
                    id="celebrityStarsonaRequest"
                    type="checkbox"
                    checked={this.state.celebrityStarsonaMessage}
                    onChange={() => this.setState({ celebrityStarsonaMessage: !this.state.celebrityStarsonaMessage })}
                  />
                  <span htmlFor="celebrityStarsonaRequest" id="checkmark" />
                </SettingsStyled.CheckBoxWrapper>
                <SettingsStyled.CheckBoxWrapper id="checkbox_container">
                  <span>Account updates</span>
                  <input
                    id="celebrityStarsonaRequest"
                    type="checkbox"
                    checked={this.state.celebrityAccountUpdates}
                    onChange={() => this.setState({ celebrityAccountUpdates: !this.state.celebrityAccountUpdates })}
                  />
                  <span htmlFor="celebrityStarsonaRequest" id="checkmark" />
                </SettingsStyled.CheckBoxWrapper>
                <SettingsStyled.CheckBoxWrapper id="checkbox_container">
                  <span>My Starsona updates</span>
                  <input
                    id="celebrityStarsonaRequest"
                    type="checkbox"
                    checked={this.state.fanStarsonaVideos}
                    onChange={() => this.setState({ fanStarsonaVideos: !this.state.fanStarsonaVideos })}
                  />
                  <span htmlFor="celebrityStarsonaRequest" id="checkmark" />
                </SettingsStyled.CheckBoxWrapper>
              </SettingsStyled.CheckBoxesWrapper>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
        </SettingsStyled.InputwrapperDiv>
        <SettingsStyled.ControlWrapper multiple>
          <SettingsStyled.CancelButton
            onClick={this.cancelDetails}
          >
            Cancel
          </SettingsStyled.CancelButton>
          <SettingsStyled.ControlButton
            onClick={() => this.submitAccountDetails()}
          >
            Save
          </SettingsStyled.ControlButton>
        </SettingsStyled.ControlWrapper>
      </React.Fragment>
    );
  }
}
