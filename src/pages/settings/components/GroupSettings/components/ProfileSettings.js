import React from 'react';
import validator from 'validator';
import PlacesAutoComplete from '../../../../../components/PlacesAutoComplete';
import SettingsStyled from '../../../styled';

export default class ProfileSettings extends React.Component {
  state = {
    bio: '',
    website: '',
    firstName: '',
    lastName: '',
    groupType: '',
    phNo1: '',
    phNo2: '',
    phNo3: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
    },
    errors: {
      bio: false,
      searchTags: false,
      groupType: false,
      name: false,
      addressField: false,
      phNo: false,
    },
  };

  componentDidMount() {
    this.setInitialData(this.props);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { groupType } = prevState;
    const { grouptype: currentGroupType } = nextProps.userDetails.group_details;
    if (groupType === '' && nextProps.groupTypes.length) {
      groupType = nextProps.groupTypes.filter(type => type.group_name === currentGroupType)[0].id;
    }
    return { groupType };
  }

  setInitialData = (props) => {
    let facebook = '';
    let twitter = '';
    let instagram = '';
    let youtube = '';
    props.userDetails.social_links.forEach((link) => {
      if (link.social_link_key === 'facebook_url') {
        facebook = link.social_link_value;
      } else if (link.social_link_key === 'twitter_url') {
        twitter = link.social_link_value;
      } else if (link.social_link_key === 'youtube_url') {
        youtube = link.social_link_value;
      } else if (link.social_link_key === 'instagram_url') {
        instagram = link.social_link_value;
      }
    });
    const { description,
      contact_first_name: firstName,
      contact_last_name: lastName,
      website,
      address,
      address_2: address2,
      city,
      state,
      zip,
      phone,
    } = props.userDetails.group_details;
    this.setState({
      socialMedia: { facebook, twitter, youtube, instagram },
      bio: description,
      website,
      firstName,
      lastName,
      phNo1: phone.split('-')[0],
      phNo2: phone.split('-')[1],
      phNo3: phone.split('-')[2],
      address,
      address2,
      city,
      state,
      zip: zip.toString(),
      errors: {
        bio: false,
        searchTags: false,
        groupType: false,
        name: false,
        addressField: false,
        phNo: false,
      },
    });
    props.checkStripe();
  }

  setAddress = (address) => {
    const zip = address.zip ? address.zip : '';
    const state = address.state ? address.state : '';
    const city = address.city ? address.city : '';
    this.setState({ zip, state, city });
  }

  getStripe() {
    this.props.fetchUrl()
      .then((response) => {
        window.location = response.data.data.stripe_url;
      });
  }

  getDashboard() {
    if (this.props.stripeRegistration.dashboardURL) {
      window.open(this.props.stripeRegistration.dashboardURL, '_blank');
    }
  }

  handleFieldChange = (fieldType, fieldValue) => {
    if (fieldType === 'searchTags') {
      this.setState({ searchTags: fieldValue });
    } else {
      this.setState({
        [fieldType]: fieldValue,
        errors: { ...this.state.errors, [fieldType]: false },
      });
      if (fieldType === 'phNo1' && fieldValue.length === 3) {
        this.phNo2.focus();
      } else if (fieldType === 'phNo2' && fieldValue.length === 3) {
        this.phNo3.focus();
      }
    }
  };

  validateFields = () => {
    let { groupType, phone, addressField, name, bio } = this.state.errors;
    if (this.state.groupType === '') {
      groupType = true;
    }
    if (this.state.bio === '') {
      bio = true;
    }
    if (!validator.isNumeric(this.state.phNo1, { no_symbols: true })
      || !validator.isNumeric(this.state.phNo2, { no_symbols: true })
      || !validator.isNumeric(this.state.phNo3, { no_symbols: true })
      || this.state.phNo1.length + this.state.phNo2.length + this.state.phNo3.length !== 10) {
      phone = true;
    } else {
      phone = false;
    }
    if (validator.isEmpty(this.state.address, { ignore_whitespace: true })) {
      addressField = 'Please enter an Address';
    } else if (validator.isEmpty(this.state.city, { ignore_whitespace: true })) {
      addressField = 'Please enter a city';
    } else if (validator.isEmpty(this.state.state, { ignore_whitespace: true })) {
      addressField = 'Please enter a state';
    } else if (!validator.isLength(this.state.zip, { min: 5, max: 5 })
    || !validator.isNumeric(this.state.zip, { no_symbols: true })) {
      addressField = 'Please enter a zip code';
    } else {
      addressField = false;
    }
    if (validator.isEmpty(this.state.firstName, { ignore_whitespace: true })) {
      name = 'Please Enter a first name';
    } else if (validator.isEmpty(this.state.lastName, { ignore_whitespace: true })) {
      name = 'Please Enter a last name';
    } else {
      name = false;
    }
    this.setState({ errors: { ...this.state.errors, phone, groupType, addressField, name, bio } });
    return !phone && !groupType && !addressField && !name && !bio;
  }

  submitGroupAccountDetails = () => {
    if (this.validateFields()) {
      const accountDetails = {
        contact_first_name: this.state.firstName,
        contact_last_name: this.state.lastName,
        description: this.state.bio,
        website: this.state.website,
        phone: `${this.state.phNo1}-${this.state.phNo2}-${this.state.phNo3}`,
        address: this.state.address,
        address_2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        group_type: this.state.groupType,
      };
      const socialLinks = {
        facebook_url: validator.matches(this.state.socialMedia.facebook, /(?:https?:\/\/)(?:www\.)facebook\.com\/[^\/]+/) ? this.state.socialMedia.facebook : '',
        twitter_url: validator.matches(this.state.socialMedia.twitter, /(?:https?:\/\/)(?:www\.)twitter\.com\/[^\/]+/) ? this.state.socialMedia.twitter : '',
        youtube_url: validator.matches(this.state.socialMedia.youtube, /(?:https?:\/\/)(?:www\.)youtube\.com\/[^\/]+/) ? this.state.socialMedia.youtube : '',
        instagram_url: validator.matches(this.state.socialMedia.instagram, /(?:https?:\/\/)(?:www\.)instagram\.com\/[^\/]+/) ? this.state.socialMedia.instagram : '',
      };
      this.props.submitProfileDetails(accountDetails, socialLinks);
    }
  };

  cancelDetails = () => {
    this.setInitialData(this.props);
  }

  render() {
    return (
      <React.Fragment>
        <SettingsStyled.HeadingWrapper>
          <SettingsStyled.SubHeading>
            Public information
          </SettingsStyled.SubHeading>
          <SettingsStyled.SubHeadingDescription>
            This information will be shared on your profile
          </SettingsStyled.SubHeadingDescription>
        </SettingsStyled.HeadingWrapper>
        <SettingsStyled.InputwrapperDiv>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Your bio</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  value={this.state.bio}
                  onChange={(event) => {
                    this.handleFieldChange('bio', event.target.value);
                  }}
                />
                {
                  !this.state.bio ?
                    <SettingsStyled.CustomPlaceholder>
                      Enter information about your group.<br />
                      Note: Help Fans and Stars find you in search by including terms associated with your group.
                    </SettingsStyled.CustomPlaceholder>
                  : null
                }
              </SettingsStyled.CustomInput>
              <SettingsStyled.ErrorMsg isError={this.state.errors.bio}>
                {this.state.errors.bio
                  ? 'Please enter a group bio'
                  : null}
              </SettingsStyled.ErrorMsg>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Group type</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.Select
                value={this.state.groupType}
                onChange={event =>
                  this.handleFieldChange(
                    'groupType',
                    event.target.value
                  )
                }
              >
                <option value="" key="0">
                  Choose One
                </option>
                {this.props.groupTypes.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </SettingsStyled.Select>
              <SettingsStyled.ErrorMsg isError={this.state.errors.groupType}>
                {
                  this.state.errors.groupType ? 'Please choose your group type' :
                    null
                }
              </SettingsStyled.ErrorMsg>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Website</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.InputArea
                small
                placeholder="www.yoursite.org"
                value={this.state.website}
                onChange={(event) => {
                  this.handleFieldChange('website', event.target.value);
                }}
              />
              <SettingsStyled.ErrorMsg isError={this.state.errors.website}>
                {this.state.errors.website
                  ? 'Please enter a valid event title'
                  : null}
              </SettingsStyled.ErrorMsg>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Social links</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  value={this.state.socialMedia.facebook}
                  innerRef={(node) => { this.facebookRef = node; }}
                  onChange={(event) => {
                    this.handleFieldChange(
                      'socialMedia',
                      { ...this.state.socialMedia, facebook: event.target.value }
                    );
                  }}
                />
                {
                  this.state.socialMedia.facebook === '' ?
                    <SettingsStyled.CustomPlaceholder
                      activePlaceHolder
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, facebook: 'https://www.facebook.com/' });
                        this.facebookRef.focus();
                      }}
                    >
                      www.facebook.com/
                      <SettingsStyled.HighlightText>
                        add facebook
                      </SettingsStyled.HighlightText>
                    </SettingsStyled.CustomPlaceholder>
                  : null
                }
              </SettingsStyled.CustomInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  innerRef={(node) => { this.twitterRef = node; }}
                  value={this.state.socialMedia.twitter}
                  onChange={(event) => {
                    this.handleFieldChange(
                      'socialMedia',
                      { ...this.state.socialMedia, twitter: event.target.value }
                    );
                  }}
                />
                {
                  this.state.socialMedia.twitter === '' ?
                    <SettingsStyled.CustomPlaceholder
                      activePlaceHolder
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, twitter: 'https://www.twitter.com/' });
                        this.twitterRef.focus();
                      }}
                    >
                      www.twitter.com/
                      <SettingsStyled.HighlightText>
                        add twitter
                      </SettingsStyled.HighlightText>
                    </SettingsStyled.CustomPlaceholder>
                  : null
                }
              </SettingsStyled.CustomInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  innerRef={(node) => { this.instagramRef = node; }}
                  value={this.state.socialMedia.instagram}
                  onChange={(event) => {
                    this.handleFieldChange(
                      'socialMedia',
                      { ...this.state.socialMedia, instagram: event.target.value }
                    );
                  }}
                />
                {
                  this.state.socialMedia.instagram === '' ?
                    <SettingsStyled.CustomPlaceholder
                      activePlaceHolder
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, instagram: 'https://www.instagram.com/' });
                        this.instagramRef.focus();
                      }}
                    >
                      www.instagram.com/
                      <SettingsStyled.HighlightText>
                        add instagram
                      </SettingsStyled.HighlightText>
                    </SettingsStyled.CustomPlaceholder>
                  : null
                }
              </SettingsStyled.CustomInput>
              <SettingsStyled.CustomInput>
                <SettingsStyled.InputArea
                  small
                  innerRef={(node) => { this.youtubeRef = node; }}
                  value={this.state.socialMedia.youtube}
                  onChange={(event) => {
                    this.handleFieldChange(
                      'socialMedia',
                      { ...this.state.socialMedia, youtube: event.target.value }
                    );
                  }}
                />
                {
                  this.state.socialMedia.youtube === '' ?
                    <SettingsStyled.CustomPlaceholder
                      activePlaceHolder
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, youtube: 'https://www.youtube.com/' });
                        this.youtubeRef.focus();
                      }}
                    >
                      www.youtube.com/
                      <SettingsStyled.HighlightText>
                        add youtube
                      </SettingsStyled.HighlightText>
                    </SettingsStyled.CustomPlaceholder>
                  : null
                }
              </SettingsStyled.CustomInput>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
        </SettingsStyled.InputwrapperDiv>
        <SettingsStyled.HeadingWrapper>
          <SettingsStyled.SubHeading>
            Private information
          </SettingsStyled.SubHeading>
          <SettingsStyled.SubHeadingDescription>
            This information is private to you and will not be shared
            publicly
          </SettingsStyled.SubHeadingDescription>
        </SettingsStyled.HeadingWrapper>
        <SettingsStyled.InputWrapper>
          <SettingsStyled.Label>Contact name</SettingsStyled.Label>
          <SettingsStyled.WrapsInput>
            <SettingsStyled.InputArea
              small
              placeholder="First name"
              value={this.state.firstName}
              onChange={(event) => {
                this.handleFieldChange('firstName', event.target.value);
              }}
            />
            <SettingsStyled.InputArea
              small
              placeholder="Last name"
              value={this.state.lastName}
              onChange={(event) => {
                this.handleFieldChange('lastName', event.target.value);
              }}
            />
            <SettingsStyled.ErrorMsg isError={this.state.errors.name}>
              {
                this.state.errors.name ? this.state.errors.name :
                  null
              }
            </SettingsStyled.ErrorMsg>
          </SettingsStyled.WrapsInput>
        </SettingsStyled.InputWrapper>
        <SettingsStyled.InputWrapper>
          <SettingsStyled.Label>Phone number</SettingsStyled.Label>
          <SettingsStyled.WrapsInput>
            <SettingsStyled.PhoneNo
              small
              type="tel"
              innerRef={(node) => { this.phNo1 = node; }}
              maxLength="3"
              placeholder="###"
              value={this.state.phNo1}
              onChange={(event) => {
                this.handleFieldChange('phNo1', event.target.value);
              }}
            />
            <SettingsStyled.PhoneNo
              small
              type="tel"
              maxLength="3"
              placeholder="###"
              innerRef={(node) => { this.phNo2 = node; }}
              value={this.state.phNo2}
              onChange={(event) => {
                this.handleFieldChange('phNo2', event.target.value);
              }}
            />
            <SettingsStyled.PhoneNo
              small
              lastDigit
              type="tel"
              maxLength="4"
              innerRef={(node) => { this.phNo3 = node; }}
              placeholder="####"
              value={this.state.phNo3}
              onChange={(event) => {
                this.handleFieldChange('phNo3', event.target.value);
              }}
            />
            <SettingsStyled.ErrorMsg isError={this.state.errors.phone}>
              {
                this.state.errors.phone ? 'Please enter a valid phone number' :
                  null
              }
            </SettingsStyled.ErrorMsg>
          </SettingsStyled.WrapsInput>
        </SettingsStyled.InputWrapper>
        <SettingsStyled.InputWrapper>
          <SettingsStyled.Label>Group address</SettingsStyled.Label>
          <SettingsStyled.WrapsInput>
            <SettingsStyled.InputArea
              small
              placeholder="Address 1"
              value={this.state.address}
              onChange={(event) => {
                this.handleFieldChange('address', event.target.value);
              }}
            />
            <SettingsStyled.InputArea
              small
              placeholder="Address 2"
              value={this.state.address2}
              onChange={(event) => {
                this.handleFieldChange('address2', event.target.value);
              }}
            />
            <SettingsStyled.CityInfo>
              <PlacesAutoComplete
                placeholder="City"
                value={this.state.city}
                getAddress={this.setAddress}
                onChange={(value) => {
                  this.handleFieldChange('city', value);
                }}
              />
            </SettingsStyled.CityInfo>
            <SettingsStyled.AddressDetails>
              <PlacesAutoComplete
                placeholder="State"
                value={this.state.state}
                getAddress={this.setAddress}
                onChange={(value) => {
                  this.handleFieldChange('state', value);
                }}
              />
            </SettingsStyled.AddressDetails>
            <SettingsStyled.ZipCode>
              <PlacesAutoComplete
                placeholder="Zip"
                type="tel"
                maxLength="5"
                value={this.state.zip}
                getAddress={this.setAddress}
                onChange={(value) => {
                  this.handleFieldChange('zip', value);
                }}
              />
            </SettingsStyled.ZipCode>
            <SettingsStyled.ErrorMsg isError={this.state.errors.addressField}>
              {
                this.state.errors.addressField ? this.state.errors.addressField :
                  null
              }
            </SettingsStyled.ErrorMsg>
          </SettingsStyled.WrapsInput>
        </SettingsStyled.InputWrapper>
        <SettingsStyled.InputWrapper>
          <SettingsStyled.Label>Payments</SettingsStyled.Label>
          <SettingsStyled.WrapsInput>
            <SettingsStyled.CustomInput>
              {this.props.stripeRegistration.cardDetails ?
                <SettingsStyled.ActionText onClick={() => this.getDashboard()}>{this.props.stripeRegistration.cardDetails}</SettingsStyled.ActionText>
                :
                <SettingsStyled.HollowButton onClick={() => this.getStripe()}>Set up your Stripe account</SettingsStyled.HollowButton>
              }
            </SettingsStyled.CustomInput>
            <SettingsStyled.ErrorMsg>
              Payouts for your earnings will be distributed on
              the first of every month
            </SettingsStyled.ErrorMsg>
          </SettingsStyled.WrapsInput>
        </SettingsStyled.InputWrapper>
        <SettingsStyled.ControlWrapper multiple>
          <SettingsStyled.CancelButton
            onClick={this.cancelDetails}
          >
            Cancel
          </SettingsStyled.CancelButton>
          <SettingsStyled.ControlButton
            onClick={() => this.submitGroupAccountDetails()}
          >
            Save
          </SettingsStyled.ControlButton>
        </SettingsStyled.ControlWrapper>
      </React.Fragment>
    );
  }
}
