import React from 'react';
import validator from 'validator';
import PlacesAutoComplete from '../../PlacesAutoComplete';
import GroupStyled from '../styled';

export default class DetailsEntry extends React.Component {
  state = {
    bio: '',
    website: '',
    firstName: '',
    lastName: '',
    searchTags: [],
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
      facebook: undefined,
      twitter: undefined,
      instagram: undefined,
      youtube: undefined,
    },
    errors: {
      bio: false,
      searchTags: false,
      groupType: false,
      name: false,
      addressField: false,
      phNo: false,
    },
    userConfirmation: false,
  };

  setAddress = (address) => {
    const zip = address.zip ? address.zip : '';
    const state = address.state ? address.state : '';
    const city = address.city ? address.city : '';
    this.setState({ zip, state, city });
  }

  getSocialUrl = (regex, value, baseUrl) => {
    if (value !== undefined && value !== '') {
      if (validator.matches(value, regex)) {
        return value;
      } else if (value.indexOf('/') <= -1) {
        return `${baseUrl}${value}`;
      }
    }
    return '';
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

  validateOnBlur = (key, value) => {
    const { errors } = this.state;
    if (key === 'groupType' || key === 'bio') {
      errors[key] = value === '';
    } else if (key === 'phNo1' || key === 'phNo2' || key === 'phNo3') {
      errors.phone = !validator.isNumeric(this.state.phNo1, { no_symbols: true })
                    || !validator.isNumeric(this.state.phNo2, { no_symbols: true })
                    || !validator.isNumeric(this.state.phNo3, { no_symbols: true })
                    || this.state.phNo1.length + this.state.phNo2.length + this.state.phNo3.length !== 10;
    } else if (key === 'addressField') {
      if (validator.isEmpty(this.state.address, { ignore_whitespace: true })) {
        errors.addressField = 'Please enter an Address';
      } else if (validator.isEmpty(this.state.city, { ignore_whitespace: true })) {
        errors.addressField = 'Please enter a city';
      } else if (validator.isEmpty(this.state.state, { ignore_whitespace: true })) {
        errors.addressField = 'Please enter a state';
      } else if (!validator.isLength(this.state.zip, { min: 5, max: 5 })
      || !validator.isNumeric(this.state.zip, { no_symbols: true })) {
        errors.addressField = 'Please enter a zip code';
      } else {
        errors.addressField = false;
      }
    } else if (key === 'name') {
      if (validator.isEmpty(this.state.firstName, { ignore_whitespace: true })) {
        errors.name = 'Please Enter a first name';
      } else if (validator.isEmpty(this.state.lastName, { ignore_whitespace: true })) {
        errors.name = 'Please Enter a last name';
      } else {
        errors.name = false;
      }
    }
    this.setState({ errors });
  }

  submitGroupAccountDetails = () => {
    const searchTags = this.state.searchTags.map(item => (
      item.value
    )).join(',');
    if (this.validateFields()) {
      const accountDetails = {
        contact_first_name: this.state.firstName,
        contact_last_name: this.state.lastName,
        description: this.state.bio,
        tags: searchTags,
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
        facebook_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)facebook\.com\/[^\/]+/, this.state.socialMedia.facebook, 'https://www.facebook.com/'),
        twitter_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)twitter\.com\/[^\/]+/, this.state.socialMedia.twitter, 'https://www.twitter.com/'),
        youtube_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)youtube\.com\/[^\/]+/, this.state.socialMedia.youtube, 'https://www.youtube.com/'),
        instagram_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)instagram\.com\/[^\/]+/, this.state.socialMedia.instagram, 'https://www.instagram.com/'),
      };
      this.props.submitGroupDetails(accountDetails, socialLinks);
    }
  };

  renderMultiValueItems = (selectProps) => {
    return (
      <GroupStyled.mutiSelectItemWrapper>
        {selectProps.value.label}
        <GroupStyled.CloseButton
          type="button"
          onClick={() => selectProps.onRemove(selectProps.value)}
        />
      </GroupStyled.mutiSelectItemWrapper>
    );
  };

  render() {
    return (
      <GroupStyled.DetailsWrapper>
        <GroupStyled.HeadingWrapper>
          <GroupStyled.InnerHeading>
            Create your profile
          </GroupStyled.InnerHeading>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.HeadingWrapper>
          <GroupStyled.SubHeading>
            Public information
          </GroupStyled.SubHeading>
          <GroupStyled.SubHeadingDescription>
            This information will be shared on your profile
          </GroupStyled.SubHeadingDescription>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.InputwrapperDiv>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Your bio</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
                  value={this.state.bio}
                  onBlur={event => this.validateOnBlur('bio', event.target.value)}
                  onChange={(event) => {
                    this.handleFieldChange('bio', event.target.value);
                  }}
                />
                {
                  !this.state.bio ?
                    <GroupStyled.CustomPlaceholder>
                      Enter information about your group.<br />
                      Note: Help Fans and Stars find you in search by including terms associated with your group.
                    </GroupStyled.CustomPlaceholder>
                  : null
                }
              </GroupStyled.CustomInput>
              <GroupStyled.ErrorMsg isError={this.state.errors.bio}>
                {this.state.errors.bio
                  ? 'Please enter a group bio'
                  : null}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Group type</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.Select
                value={this.state.groupType}
                onBlur={event => this.validateOnBlur('groupType', event.target.value)}
                onChange={event =>
                  this.handleFieldChange(
                    'groupType',
                    event.target.value,
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
              </GroupStyled.Select>
              <GroupStyled.ErrorMsg isError={this.state.errors.groupType}>
                {
                  this.state.errors.groupType ? 'Please choose your group type' :
                    null
                }
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Website</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.InputArea
                small
                placeholder="www.yoursite.org"
                value={this.state.website}
                onChange={(event) => {
                  this.handleFieldChange('website', event.target.value);
                }}
              />
              <GroupStyled.ErrorMsg isError={this.state.errors.website}>
                {this.state.errors.website
                  ? 'Please enter a valid event title'
                  : null}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Social links</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.SocialCustomInput>
                <GroupStyled.CustomPlaceholder>www.facebook.com/</GroupStyled.CustomPlaceholder>
                {
                  this.state.socialMedia.facebook === undefined ?
                    <GroupStyled.HighlightText
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, facebook: '' });
                      }}
                    >
                      add facebook
                    </GroupStyled.HighlightText>
                  :
                    <GroupStyled.InputArea
                      autoFocus
                      small
                      value={this.state.socialMedia.facebook}
                      innerRef={(node) => { this.facebookRef = node; }}
                      onBlur={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, facebook: event.target.value === '' ? undefined : event.target.value  },
                        );
                      }}
                      onChange={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, facebook: event.target.value },
                        );
                      }}
                    />
                }
              </GroupStyled.SocialCustomInput>
              <GroupStyled.SocialCustomInput>
                <GroupStyled.CustomPlaceholder>www.twitter.com/</GroupStyled.CustomPlaceholder>
                {
                  this.state.socialMedia.twitter === undefined ?
                    <GroupStyled.HighlightText
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, twitter: '' });
                      }}
                    >
                      add twitter
                    </GroupStyled.HighlightText>
                  :
                    <GroupStyled.InputArea
                      autoFocus
                      small
                      value={this.state.socialMedia.twitter}
                      innerRef={(node) => { this.twitterRef = node; }}
                      onBlur={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, twitter: event.target.value === '' ? undefined : event.target.value  },
                        );
                      }}
                      onChange={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, twitter: event.target.value },
                        );
                      }}
                    />
                }
              </GroupStyled.SocialCustomInput>
              <GroupStyled.SocialCustomInput>
                <GroupStyled.CustomPlaceholder>www.instagram.com/</GroupStyled.CustomPlaceholder>
                {
                  this.state.socialMedia.instagram === undefined ?
                    <GroupStyled.HighlightText
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, instagram: '' });
                      }}
                    >
                      add instagram
                    </GroupStyled.HighlightText>
                  :
                    <GroupStyled.InputArea
                      autoFocus
                      small
                      value={this.state.socialMedia.instagram}
                      innerRef={(node) => { this.instagramRef = node; }}
                      onBlur={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, instagram: event.target.value === '' ? undefined : event.target.value  },
                        );
                      }}
                      onChange={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, instagram: event.target.value },
                        );
                      }}
                    />
                }
              </GroupStyled.SocialCustomInput>
              <GroupStyled.SocialCustomInput>
                <GroupStyled.CustomPlaceholder>www.youtube.com/</GroupStyled.CustomPlaceholder>
                {
                  this.state.socialMedia.youtube === undefined ?
                    <GroupStyled.HighlightText
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, youtube: '' });
                      }}
                    >
                      add youtube
                    </GroupStyled.HighlightText>
                  :
                    <GroupStyled.InputArea
                      autoFocus
                      small
                      value={this.state.socialMedia.youtube}
                      innerRef={(node) => { this.youtubeRef = node; }}
                      onBlur={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, youtube: event.target.value === '' ? undefined : event.target.value  },
                        );
                      }}
                      onChange={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, youtube: event.target.value },
                        );
                      }}
                    />
                }
              </GroupStyled.SocialCustomInput>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
        </GroupStyled.InputwrapperDiv>
        <GroupStyled.HeadingWrapper>
          <GroupStyled.SubHeading>
            Private information
          </GroupStyled.SubHeading>
          <GroupStyled.SubHeadingDescription>
            This information is private to you and will not be shared
            publicly
          </GroupStyled.SubHeadingDescription>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.InputWrapper>
          <GroupStyled.Label>Contact name</GroupStyled.Label>
          <GroupStyled.WrapsInput>
            <GroupStyled.InputArea
              small
              placeholder="First name"
              value={this.state.firstName}
              onBlur={event => this.validateOnBlur('name', event.target.value)}
              onChange={(event) => {
                this.handleFieldChange('firstName', event.target.value);
              }}
            />
            <GroupStyled.InputArea
              small
              placeholder="Last name"
              value={this.state.lastName}
              onBlur={event => this.validateOnBlur('name', event.target.value)}
              onChange={(event) => {
                this.handleFieldChange('lastName', event.target.value);
              }}
            />
            <GroupStyled.ErrorMsg isError={this.state.errors.name}>
              {
                this.state.errors.name ? this.state.errors.name :
                  null
              }
            </GroupStyled.ErrorMsg>
          </GroupStyled.WrapsInput>
        </GroupStyled.InputWrapper>
        <GroupStyled.InputWrapper>
          <GroupStyled.Label>Phone number</GroupStyled.Label>
          <GroupStyled.WrapsInput>
            <GroupStyled.PhoneNo
              small
              type="tel"
              innerRef={(node) => { this.phNo1 = node; }}
              maxLength="3"
              placeholder="###"
              value={this.state.phNo1}
              onBlur={event => this.validateOnBlur('phNo1', event.target.value)}
              onChange={(event) => {
                this.handleFieldChange('phNo1', event.target.value);
              }}
            />
            <GroupStyled.PhoneNo
              small
              type="tel"
              maxLength="3"
              placeholder="###"
              innerRef={(node) => { this.phNo2 = node; }}
              value={this.state.phNo2}
              onBlur={event => this.validateOnBlur('phNo2', event.target.value)}
              onChange={(event) => {
                this.handleFieldChange('phNo2', event.target.value);
              }}
            />
            <GroupStyled.PhoneNo
              small
              lastDigit
              type="tel"
              maxLength="4"
              innerRef={(node) => { this.phNo3 = node; }}
              placeholder="####"
              value={this.state.phNo3}
              onBlur={event => this.validateOnBlur('phNo3', event.target.value)}
              onChange={(event) => {
                this.handleFieldChange('phNo3', event.target.value);
              }}
            />
            <GroupStyled.ErrorMsg isError={this.state.errors.phone}>
              {
                this.state.errors.phone ? 'Please enter a valid phone number' :
                  null
              }
            </GroupStyled.ErrorMsg>
          </GroupStyled.WrapsInput>
        </GroupStyled.InputWrapper>
        <GroupStyled.InputWrapper>
          <GroupStyled.Label>Group address</GroupStyled.Label>
          <GroupStyled.WrapsInput>
            <GroupStyled.InputArea
              small
              placeholder="Address 1"
              value={this.state.address}
              onBlur={event => this.validateOnBlur('addressField', event.target.value)}
              onChange={(event) => {
                this.handleFieldChange('address', event.target.value);
              }}
            />
            <GroupStyled.InputArea
              small
              placeholder="Address 2"
              value={this.state.address2}
              onBlur={event => this.validateOnBlur('addressField', event.target.value)}
              onChange={(event) => {
                this.handleFieldChange('address2', event.target.value);
              }}
            />
            <GroupStyled.CityInfo>
              <PlacesAutoComplete
                placeholder="City"
                value={this.state.city}
                getAddress={this.setAddress}
                onBlur={event => this.validateOnBlur('addressField', event.target.value)}
                onChange={(value) => {
                  this.handleFieldChange('city', value);
                }}
              />
            </GroupStyled.CityInfo>
            <GroupStyled.AddressDetails>
              <PlacesAutoComplete
                placeholder="State"
                value={this.state.state}
                getAddress={this.setAddress}
                onBlur={event => this.validateOnBlur('addressField', event.target.value)}
                onChange={(value) => {
                  this.handleFieldChange('state', value);
                }}
              />
            </GroupStyled.AddressDetails>
            <GroupStyled.ZipCode>
              <PlacesAutoComplete
                placeholder="Zip"
                type="tel"
                maxLength="5"
                value={this.state.zip}
                getAddress={this.setAddress}
                onBlur={event => this.validateOnBlur('addressField', event.target.value)}
                onChange={(value) => {
                  this.handleFieldChange('zip', value);
                }}
              />
            </GroupStyled.ZipCode>
            <GroupStyled.ErrorMsg isError={this.state.errors.addressField}>
              {
                this.state.errors.addressField ? this.state.errors.addressField :
                  null
              }
            </GroupStyled.ErrorMsg>
          </GroupStyled.WrapsInput>
        </GroupStyled.InputWrapper>
        <GroupStyled.OptionWrapper>
          <GroupStyled.CheckBoxWrapper>
            <GroupStyled.CheckBoxLabel
              className="checkbox_container"
              onClick={() =>
                this.setState({
                  userConfirmation: !this.state.userConfirmation,
                })
              }
            >
              <span>
                I am officially affiliated with this group and have the
                right to create a group account on its behalf.
              </span>
              <GroupStyled.CheckBox
                id="group-info-validation"
                type="checkbox"
                checked={this.state.userConfirmation}
                onChange={() => {}}
              />
              <GroupStyled.Span
                htmlFor="private_video"
                className="checkmark"
              />
            </GroupStyled.CheckBoxLabel>
          </GroupStyled.CheckBoxWrapper>
        </GroupStyled.OptionWrapper>
        <GroupStyled.ControlWrapper>
          <GroupStyled.ControlButton
            disabled={!this.state.userConfirmation}
            onClick={() => this.submitGroupAccountDetails()}
          >
            Continue
          </GroupStyled.ControlButton>
        </GroupStyled.ControlWrapper>
      </GroupStyled.DetailsWrapper>
    );
  }
}
