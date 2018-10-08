import React from 'react';
import validator from 'validator';
import PlacesAutoComplete from '../../PlacesAutoComplete';
import SelectTags from '../../SelectTag';
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
    userConfirmation: false,
  };

  setAddress = (address) => {
    const zip = address.zip ? address.zip : '';
    const state = address.state ? address.state : '';
    const city = address.city ? address.city : '';
    this.setState({ zip, state, city });
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
    const searchTags = this.state.searchTags.map(item => (
      item.value
    )).join(',');
    if (this.validateFields()) {
      const data = {
        contact_first_name: this.state.firstName,
        contact_last_name: this.state.lastName,
        description: this.state.bio,
        tags: searchTags,
        website: this.state.website,
        phone: `${this.state.phNo1}-${this.state.phNo2}-${this.state.phNo3}`,
        address: this.state.address,
        address_2: this.state.address2,
        city: this.state.city,
        state: this.state.street,
        zip: this.state.zip,
        group_type: this.state.groupType,
      };
      this.props.submitGroupDetails(data);
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
            This information will be shared on your profile.
          </GroupStyled.SubHeadingDescription>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.InputwrapperDiv>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Group bio</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
                  value={this.state.bio}
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
            <GroupStyled.Label>Group Type</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.Select
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
          {/* <GroupStyled.InputWrapper>
            <GroupStyled.Label>Search tags</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <SelectTags
                otherOptions={{
                  clearable: false,
                  arrowRenderer: null,
                  valueComponent: selectProps =>
                    this.renderMultiValueItems(selectProps)
                }}
                placeholder=""
                searchTags={this.state.searchTags}
                value={this.state.searchTags}
                handleFieldChange={this.handleFieldChange}
              />
              <GroupStyled.ErrorMsg isError={false}>
                Add hashtags to help Fans find you quicker
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper> */}
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Social Links</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
                  small
                  value={this.state.socialMedia.facebook}
                  onChange={(event) => {
                    this.handleFieldChange(
                      'socialMedia',
                      { facebook: event.target.value }
                    );
                  }}
                />
                {
                  !this.state.socialMedia.facebook ?
                    <GroupStyled.CustomPlaceholder>www.facebook.com/<GroupStyled.HighlightText>add facebook</GroupStyled.HighlightText></GroupStyled.CustomPlaceholder>
                  : null
                }
              </GroupStyled.CustomInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
                  small
                  value={this.state.socialMedia.twitter}
                  onChange={(event) => {
                    this.handleFieldChange(
                      'socialMedia',
                      { twitter: event.target.value }
                    );
                  }}
                />
                {
                  !this.state.socialMedia.twitter ?
                    <GroupStyled.CustomPlaceholder>www.twitter.com/<GroupStyled.HighlightText>add twitter</GroupStyled.HighlightText></GroupStyled.CustomPlaceholder>
                  : null
                }
              </GroupStyled.CustomInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
                  small
                  value={this.state.socialMedia.instagram}
                  onChange={(event) => {
                    this.handleFieldChange(
                      'socialMedia',
                      { instagram: event.target.value }
                    );
                  }}
                />
                {
                  !this.state.socialMedia.instagram ?
                    <GroupStyled.CustomPlaceholder>www.instagram.com/<GroupStyled.HighlightText>add instagram</GroupStyled.HighlightText></GroupStyled.CustomPlaceholder>
                  : null
                }
              </GroupStyled.CustomInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
                  small
                  value={this.state.socialMedia.youtube}
                  onChange={(event) => {
                    this.handleFieldChange(
                      'socialMedia',
                      { youtube: event.target.value }
                    );
                  }}
                />
                {
                  !this.state.socialMedia.youtube ?
                    <GroupStyled.CustomPlaceholder>www.youtube.com/<GroupStyled.HighlightText>add youtube</GroupStyled.HighlightText></GroupStyled.CustomPlaceholder>
                  : null
                }
              </GroupStyled.CustomInput>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
        </GroupStyled.InputwrapperDiv>
        <GroupStyled.HeadingWrapper>
          <GroupStyled.SubHeading>
            Private information
          </GroupStyled.SubHeading>
          <GroupStyled.SubHeadingDescription>
            This information is private to you and will not be shared
            publicly.
          </GroupStyled.SubHeadingDescription>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.InputWrapper>
          <GroupStyled.Label>Contact Name</GroupStyled.Label>
          <GroupStyled.WrapsInput>
            <GroupStyled.InputArea
              small
              placeholder="First name"
              value={this.state.firstName}
              onChange={(event) => {
                this.handleFieldChange('firstName', event.target.value);
              }}
            />
            <GroupStyled.InputArea
              small
              placeholder="Last name"
              value={this.state.lastName}
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
          <GroupStyled.Label>Phone Number</GroupStyled.Label>
          <GroupStyled.WrapsInput>
            <GroupStyled.PhoneNo
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
            <GroupStyled.PhoneNo
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
            <GroupStyled.PhoneNo
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
            <GroupStyled.ErrorMsg isError={this.state.errors.phone}>
              {
                this.state.errors.phone ? 'Please enter a valid phone number' :
                  null
              }
            </GroupStyled.ErrorMsg>
          </GroupStyled.WrapsInput>
        </GroupStyled.InputWrapper>
        <GroupStyled.InputWrapper>
          <GroupStyled.Label>Group Address</GroupStyled.Label>
          <GroupStyled.WrapsInput>
            <GroupStyled.InputArea
              small
              placeholder="Address 1"
              value={this.state.address}
              onChange={(event) => {
                this.handleFieldChange('address', event.target.value);
              }}
            />
            <GroupStyled.InputArea
              small
              placeholder="Address 2"
              value={this.state.address2}
              onChange={(event) => {
                this.handleFieldChange('address2', event.target.value);
              }}
            />
            <GroupStyled.CityInfo>
              <PlacesAutoComplete
                placeholder="City"
                value={this.state.city}
                getAddress={this.setAddress}
                onChange={(value) => {
                  this.handleFieldChange('city', value);
                }}
              />
            </GroupStyled.CityInfo>
            {/* <GroupStyled.CityInfo
              small
              placeholder="City"
              value={this.state.city}
              onChange={(event) => {
                this.handleFieldChange('city', event.target.value);
              }}
            /> */}
            <GroupStyled.AddressDetails>
              <PlacesAutoComplete
                placeholder="State"
                value={this.state.state}
                getAddress={this.setAddress}
                onChange={(value) => {
                  this.handleFieldChange('state', value);
                }}
              />
            </GroupStyled.AddressDetails>
            {/* <GroupStyled.AddressDetails
              small
              placeholder="State"
              value={this.state.state}
              onChange={(event) => {
                this.handleFieldChange('state', event.target.value);
              }}
            /> */}
            <GroupStyled.ZipCode>
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
            </GroupStyled.ZipCode>
            {/* <GroupStyled.ZipCode
              small
              placeholder="Zip"
              type="tel"
              maxLength="5"
              value={this.state.zip}
              onChange={(event) => {
                this.handleFieldChange('zip', event.target.value);
              }}
            /> */}
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
              id="checkbox_container"
              onClick={() =>
                this.setState({
                  userConfirmation: !this.state.userConfirmation,
                })
              }
            >
              <span>
                I am officially affiliated with this group and have the
                right to create a group account on it's behalf.
              </span>
              <GroupStyled.CheckBox
                id="group-info-validation"
                type="checkbox"
                checked={this.state.userConfirmation}
                onChange={() => {}}
              />
              <GroupStyled.Span
                htmlFor="private_video"
                id="checkmark"
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
