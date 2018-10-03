import React from 'react';
import SelectTags from '../../SelectTag';
import validator from 'validator';
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

  handleFieldChange = (fieldType, fieldValue) => {
    if (fieldType === 'searchTags') {
      this.setState({ searchTags: fieldValue });
    } else {
      this.setState({
        [fieldType]: fieldValue,
        errors: { ...this.state.errors, [fieldType]: false },
      });
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
    if (!validator.isLength(this.state.zip, { min: 6, max: 6 })
      || !validator.isNumeric(this.state.zip, { no_symbols: true })
      || validator.isEmpty(this.state.address, { ignore_whitespace: true })
      || validator.isEmpty(this.state.address2, { ignore_whitespace: true })
      || validator.isEmpty(this.state.city, { ignore_whitespace: true })
      || validator.isEmpty(this.state.state, { ignore_whitespace: true })) {
      addressField = true;
    } else {
      addressField = false;
    }
    if (validator.isEmpty(this.state.firstName, { ignore_whitespace: true }) || validator.isEmpty(this.state.lastName, { ignore_whitespace: true })) {
      name = true;
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
      <React.Fragment>
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
              <GroupStyled.InputArea
                placeholder="Enter information about your group.
                Note: Help Fans and Stars find you in search by including terms associated with your group."
                value={this.state.bio}
                onChange={(event) => {
                  this.handleFieldChange('bio', event.target.value);
                }}
              />
              <GroupStyled.ErrorMsg isError={this.state.errors.bio}>
                {this.state.errors.bio
                  ? 'Please enter a valid group bio'
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
            <GroupStyled.Label>Group Website</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.InputArea
                placeholder="www.yoursite.org"
                value={this.state.website}
                onChange={(event) => {
                  this.handleFieldChange("website", event.target.value);
                }}
              />
              <GroupStyled.ErrorMsg isError={this.state.errors.website}>
                {this.state.errors.website
                  ? "Please enter a valid event title"
                  : null}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
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
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Social Links</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.InputArea
                small
                placeholder="www.facebook.com"
                value={this.state.socialMedia.facebook}
                onChange={(event) => {
                  this.handleFieldChange(
                    'socialMedia',
                    { facebook: event.target.value }
                  );
                }}
              />
              <GroupStyled.InputArea
                small
                placeholder="www.twitter.com"
                value={this.state.socialMedia.twitter}
                onChange={(event) => {
                  this.handleFieldChange(
                    'socialMedia',
                    { twitter: event.target.value }
                  );
                }}
              />
              <GroupStyled.InputArea
                small
                placeholder="www.instagram.com"
                value={this.state.socialMedia.instagram}
                onChange={(event) => {
                  this.handleFieldChange(
                    'socialMedia',
                    { instagram: event.target.value }
                  );
                }}
              />
              <GroupStyled.InputArea
                small
                placeholder="www.youtube.com"
                value={this.state.socialMedia.youtube}
                onChange={(event) => {
                  this.handleFieldChange(
                    'socialMedia',
                    { youtube: event.target.value }
                  );
                }}
              />
              {/* <GroupStyled.ErrorMsg isError={this.state.errors.bio}>
                {
                  this.state.errors.bio ? 'Please enter a valid event title' :
                    null
                }
              </GroupStyled.ErrorMsg> */}
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
                this.handleFieldChange("firstName", event.target.value);
              }}
            />
            <GroupStyled.InputArea
              small
              placeholder="Last name"
              value={this.state.lastName}
              onChange={(event) => {
                this.handleFieldChange("lastName", event.target.value);
              }}
            />
            <GroupStyled.ErrorMsg isError={this.state.errors.name}>
              {
                this.state.errors.name ? 'Please enter a first name and last name' :
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
              maxLength="3"
              placeholder="***"
              value={this.state.phNo1}
              onChange={(event) => {
                this.handleFieldChange("phNo1", event.target.value);
              }}
            />
            <GroupStyled.PhoneNo
              small
              type="tel"
              maxLength="3"
              placeholder="***"
              value={this.state.phNo2}
              onChange={(event) => {
                this.handleFieldChange("phNo2", event.target.value);
              }}
            />
            <GroupStyled.PhoneNo
              small
              lastDigit
              type="tel"
              maxLength="4"
              placeholder="****"
              value={this.state.phNo3}
              onChange={(event) => {
                this.handleFieldChange("phNo3", event.target.value);
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
              placeholder="123 Main stl"
              value={this.state.address}
              onChange={(event) => {
                this.handleFieldChange("address", event.target.value);
              }}
            />
            <GroupStyled.InputArea
              small
              placeholder="Address 2"
              value={this.state.address2}
              onChange={(event) => {
                this.handleFieldChange("address2", event.target.value);
              }}
            />
            <GroupStyled.CityInfo
              small
              placeholder="City"
              value={this.state.city}
              onChange={(event) => {
                this.handleFieldChange("city", event.target.value);
              }}
            />
            <GroupStyled.AddressDetails
              small
              placeholder="State"
              value={this.state.state}
              onChange={(event) => {
                this.handleFieldChange("state", event.target.value);
              }}
            />
            <GroupStyled.ZipCode
              small
              placeholder="Zip"
              type="tel"
              maxLength="6"
              value={this.state.zip}
              onChange={(event) => {
                this.handleFieldChange("zip", event.target.value);
              }}
            />
            <GroupStyled.ErrorMsg isError={this.state.errors.addressField}>
              {
                this.state.errors.addressField ? 'Please enter a valid address' :
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
                  userConfirmation: !this.state.userConfirmation
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
      </React.Fragment>
    );
  }
}
