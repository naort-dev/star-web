import React from 'react';
import validator from 'validator';
import ManagePayments from '../../../../components/ManagePayments';
import Popup from '../../../../components/Popup';
import ChangePassword from '../../../../components/MyAccount/ChangePassword';
import { imageSizes } from '../../../../constants/imageSizes';
import ImageUpload from '../ImageUpload';
import SettingsStyled from '../../styled';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    this.setInitialData(this.props);
  }

  setInitialData = (props) => {
    let secondaryImages = [];
    if (props.userDetails && props.userDetails.images) {
      secondaryImages = props.userDetails.images.map((image) => {
        return {
          fileName: image.photo,
          image: image.image_url,
        };
      });
    }
    let notifications = {};
    if (props.type === 'star') {
      notifications = {
        starsonaMessage: props.userDetails.notification_settings ? props.userDetails.notification_settings.celebrity_starsona_message : false,
        accountUpdates: props.userDetails.notification_settings ? props.userDetails.notification_settings.celebrity_account_updates : false,
        starsonaVideos: props.userDetails.notification_settings ? props.userDetails.notification_settings.celebrity_starsona_request : false,
      };
    } else {
      notifications = {
        starsonaMessage: props.userDetails.notification_settings ? props.userDetails.notification_settings.fan_starsona_messages : false,
        accountUpdates: props.userDetails.notification_settings ? props.userDetails.notification_settings.fan_account_updates : false,
        starsonaVideos: props.userDetails.notification_settings ? props.userDetails.notification_settings.fan_starsona_videos : false,
      };
    }
    this.setState({
      managePayment: false,
      changePassword: false,
      featuredImage: {
        image: props.userDetails.featured_photo ? props.userDetails.featured_photo.image_url : null,
        file: props.userDetails.featured_photo ? props.userDetails.featured_photo.photo : null,
      },
      profileImage: {
        image: props.userDetails.avatarPhoto,
        file: props.userDetails.avatar_photo ? props.userDetails.avatar_photo.photo : null,
      },
      secondaryImages,
      firstName: props.userDetails.first_name ? props.userDetails.first_name : '',
      lastName: props.userDetails.last_name ? props.userDetails.last_name : '',
      email: props.userDetails.email ? props.userDetails.email : '',
      ...notifications,
      errors: {
        firstName: false,
        lastName: false,
      },
      cancelDetails: false,
    });
  }

  getProfilePhotos = (type, file, image) => {
    this.props.recordChange(true);
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

  getStripe = () => {
    this.props.fetchUrl()
      .then((response) => {
        window.location = response.data.data.stripe_url;
      });
  }

  getDashboard = () => {
    if (this.props.stripeRegistration.dashboardURL) {
      window.open(this.props.stripeRegistration.dashboardURL, '_blank');
    }
  }

  toggleChangePassword = state => () => {
    this.setState({ changePassword: state });
  }

  handleFieldChange = (fieldType, fieldValue) => {
    this.props.recordChange(true);
    this.setState({
      [fieldType]: fieldValue,
      errors: { ...this.state.errors, [fieldType]: false },
    });
  };

  toggleNotifications = key => () => {
    this.props.recordChange(true);
    const value = this.state[key];
    this.setState({ [key]: !value });
  }

  validateFields = () => {
    let { firstName, lastName } = this.state.errors;
    firstName = validator.isEmpty(this.state.firstName);
    lastName = this.props.type === 'group' ? false : validator.isEmpty(this.state.lastName);
    this.setState({ errors: { ...this.state.errors, firstName, lastName } });
    return !firstName && !lastName;
  }

  validateOnBlur = (key, value) => {
    const { errors } = this.state;
    if (key === 'firstName' || key === 'lastName') {
      errors[key] = validator.isEmpty(value);
    }
    this.setState({ errors });
  }


  removeSecondaryImage = (itemIndex) => {
    const { secondaryImages } = this.state;
    secondaryImages.splice(itemIndex, 1);
    this.setState({ secondaryImages });
  }

  submitAccountDetails = () => {
    if (this.validateFields()) {
      let userDetails = {
        first_name: this.state.firstName.trim(),
      };
      if (this.props.type !== 'group') {
        userDetails = {
          ...userDetails,
          last_name: this.state.lastName.trim(),
        };
      }
      const secondaryFileNames = this.state.secondaryImages.map((item) => {
        if (item.image) {
          return item.fileName;
        }
      });
      let notifications = {};
      if (this.props.type === 'star') {
        notifications = {
          celebrity_starsona_message: this.state.starsonaMessage,
          celebrity_account_updates: this.state.accountUpdates,
          celebrity_starsona_request: this.state.starsonaVideos,
        };
      } else {
        notifications = {
          fan_starsona_messages: this.state.starsonaMessage,
          fan_account_updates: this.state.accountUpdates,
          fan_starsona_videos: this.state.starsonaVideos,
        };
      }
      const profileImages = {
        avatar_photo: this.state.profileImage.file,
        images: [this.state.profileImage.file, ...secondaryFileNames],
      };
      if (this.state.featuredImage.file) {
        profileImages['featured_image'] = this.state.featuredImage.file;
        profileImages.images = [...profileImages.images, this.state.featuredImage.file]
      }
      this.props.recordChange(false);
      this.props.submitAccountDetails(userDetails, profileImages, notifications);
    }
  }

  cancelDetails = () => {
    this.setInitialData(this.props);
    this.props.recordChange(false);
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
          this.state.changePassword?
            <Popup
              closePopUp={this.toggleChangePassword(false)}
              smallPopup
            >
              <ChangePassword
                onPasswordChange={this.toggleChangePassword(false)}
              />
            </Popup>
          : null
        }
        <ImageUpload
          type={this.props.type}
          profileImage={this.state.profileImage.image}
          featuredImage={this.state.featuredImage.image}
          secondaryImages={this.state.secondaryImages}
          removeSecondaryImage={this.removeSecondaryImage}
          featuredRatio={this.props.type === 'group' ? imageSizes.groupCover : imageSizes.featured}
          secondaryRatio={this.props.type === 'group' ? imageSizes.groupCover : imageSizes.first}
          onComplete={this.getProfilePhotos}
        />
        <SettingsStyled.InputwrapperDiv>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>{ this.props.type === 'group' ? 'Group' : 'First' } name</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  value={this.state.firstName}
                  placeholder={this.props.type === 'group' ? 'Group name' : 'First name'}
                  onBlur={event => this.validateOnBlur('firstName', event.target.value)}
                  onChange={(event) => {
                    this.handleFieldChange('firstName', event.target.value);
                  }}
                />
                <SettingsStyled.ErrorMsg isError={this.state.errors.firstName}>
                  {this.state.errors.firstName
                    ? `Please enter a ${this.props.type === 'group' ? 'group' : 'first'} name`
                    : null}
                </SettingsStyled.ErrorMsg>
              </SettingsStyled.CustomInput>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          {
            this.props.type !== 'group' &&
              <SettingsStyled.InputWrapper>
                <SettingsStyled.Label>Last name</SettingsStyled.Label>
                <SettingsStyled.WrapsInput>
                  <SettingsStyled.CustomInput>
                    <SettingsStyled.InputArea
                      small
                      value={this.state.lastName}
                      placeholder="Last name"
                      onBlur={event => this.validateOnBlur('lastName', event.target.value)}
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
          }
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
              <SettingsStyled.ActionText onClick={this.toggleChangePassword(true)}>
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
                <SettingsStyled.CheckBoxWrapper className="checkbox_container">
                  <span>Messages from Starsona</span>
                  <input
                    id="celebrityStarsonaRequest"
                    type="checkbox"
                    checked={this.state.starsonaMessage}
                    onChange={this.toggleNotifications('starsonaMessage')}
                  />
                  <span htmlFor="celebrityStarsonaRequest" className="checkmark" />
                </SettingsStyled.CheckBoxWrapper>
                <SettingsStyled.CheckBoxWrapper className="checkbox_container">
                  <span>Account updates</span>
                  <input
                    id="celebrityStarsonaRequest"
                    type="checkbox"
                    checked={this.state.accountUpdates}
                    onChange={this.toggleNotifications('accountUpdates')}
                  />
                  <span htmlFor="celebrityStarsonaRequest" className="checkmark" />
                </SettingsStyled.CheckBoxWrapper>
                <SettingsStyled.CheckBoxWrapper className="checkbox_container">
                  <span>My Starsona updates</span>
                  <input
                    id="celebrityStarsonaRequest"
                    type="checkbox"
                    checked={this.state.starsonaVideos}
                    onChange={this.toggleNotifications('starsonaVideos')}
                  />
                  <span htmlFor="celebrityStarsonaRequest" className="checkmark" />
                </SettingsStyled.CheckBoxWrapper>
              </SettingsStyled.CheckBoxesWrapper>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          {
            this.props.type === 'fan' &&
              <SettingsStyled.InputWrapper>
                <SettingsStyled.Label>Payments</SettingsStyled.Label>
                <SettingsStyled.WrapsInput>
                  <SettingsStyled.CustomInput>
                    {this.props.stripeRegistration.cardDetails ?
                      <SettingsStyled.ActionText onClick={this.getDashboard}>{this.props.stripeRegistration.cardDetails}</SettingsStyled.ActionText>
                      :
                      <SettingsStyled.HollowButton onClick={this.getStripe}>Set up your Stripe account</SettingsStyled.HollowButton>
                    }
                  </SettingsStyled.CustomInput>
                  <SettingsStyled.ErrorMsg>
                    Payouts for your earnings will be distributed the first week of every month.
                  </SettingsStyled.ErrorMsg>
                </SettingsStyled.WrapsInput>
              </SettingsStyled.InputWrapper>
          }
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
        {
          this.props.type === 'fan' &&
            <React.Fragment>
              <SettingsStyled.HeadingWrapper>
                <SettingsStyled.SubHeading>
                  Are you a Star and want to engage with Fans?
                </SettingsStyled.SubHeading>
                <SettingsStyled.SubHeadingDescription>
                  
                </SettingsStyled.SubHeadingDescription>
              </SettingsStyled.HeadingWrapper>
              <SettingsStyled.HollowButton
                onClick={() => this.props.enableStarSignup()}
              >
                Create Star account
              </SettingsStyled.HollowButton>
            </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
