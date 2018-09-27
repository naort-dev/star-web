import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { updateGroupAccount } from '../../services/groupRegistration';
import SelectTags from '../SelectTag';
import GroupStyled from './styled';
import { fetchGroupTypes } from '../../store/shared/actions/getGroupTypes';

class GroupRegistration extends React.Component {
  state = {
    bio: '',
    website: '',
    firstName: '',
    lastName: '',
    phNo: '',
    searchTags: [],
    groupType: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    errors: {
      bio: false,
      website: false,
      searchTags: false,
      groupTypes: false,
    },
    userConfirmation: false,
  }

  componentWillMount() {
    this.props.fetchGroupTypes();
  }

  handleFieldChange = (fieldType, fieldValue) => {
    if (fieldType === 'searchTags') {
      this.setState({ searchTags: fieldValue });
    } else if (fieldType === 'phNo1' || fieldType === 'phNo2' || fieldType === 'phNo3') {
      this.setState({ [fieldType]: fieldValue }, () => {
        const phNo = `${this.state.phNo1}-${this.state.phNo2}=${this.state.phNo3}`;
        this.setState({})
      });
    } else {
      this.setState({ [fieldType]: fieldValue, errors: { ...this.state.errors, [fieldType]: false } });
    }
  }

  submitGroupAccountDetails = () => {
    const data = {
      'contact_first_name': this.state.firstName,
      'contact_last_name': this.state.lastName,
      'description': this.state.bio,
      'tags': ' #search',
      'website': this.state.website,
      'phone': '968-5895-888',
      'address': this.state.address,
      'address_2': this.state.address2,
      'city': this.state.city,
      'state': this.state.street,
      'zip': this.state.zip,
      'group_type': this.state.groupType,
    };
    updateGroupAccount(data)
      .then((success) => {
        if (success) {
          this.props.changeStep(this.props.currentStep + 1);
        }
      });
  }

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
  }

  render() {
    return (
      <GroupStyled>
        <Scrollbars>
          <GroupStyled.ContentWrapper>
            <GroupStyled.HeadingWrapper>
              <GroupStyled.SubHeading>Public information</GroupStyled.SubHeading>
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
                    onChange={event => { this.handleFieldChange('bio', event.target.value) }}
                  />
                  <GroupStyled.ErrorMsg isError={this.state.errors.bio}>
                    {
                      this.state.errors.bio ? 'Please enter a valid group bio' :
                        null
                    }
                  </GroupStyled.ErrorMsg>
                </GroupStyled.WrapsInput>
              </GroupStyled.InputWrapper>
              <GroupStyled.InputWrapper>
                <GroupStyled.Label>Group Type</GroupStyled.Label>
                <GroupStyled.WrapsInput>
                  <GroupStyled.Select
                    value={this.state.groupType}
                    onChange={event => this.handleFieldChange('groupType', event.target.value)}
                  >
                    <option value="0" key="0">Choose One</option>
                    {
                      this.props.groupTypes.map((item, index) => (
                        <option value={item.value} key={index}>{item.label}</option>
                      ))
                    }
                  </GroupStyled.Select>
                  {/* <GroupStyled.ErrorMsg isError={this.state.errors.profession}>
                    {
                      this.state.errors.profession ? 'Please choose your Group Type' :
                        'You can choose a maximum of 3 categories'
                    }
                  </GroupStyled.ErrorMsg> */}
                </GroupStyled.WrapsInput>
              </GroupStyled.InputWrapper>
              <GroupStyled.InputWrapper>
                <GroupStyled.Label>Group Website</GroupStyled.Label>
                <GroupStyled.WrapsInput>
                  <GroupStyled.InputArea
                    placeholder="www.yoursite.org"
                    value={this.state.website}
                    onChange={event => { this.handleFieldChange('website', event.target.value) }}
                  />
                  <GroupStyled.ErrorMsg isError={this.state.errors.website}>
                    {
                      this.state.errors.website ? 'Please enter a valid event title' :
                        null
                    }
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
                      valueComponent: (selectProps) => this.renderMultiValueItems(selectProps),
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
                    value={this.state.firstName}
                    onChange={event => { this.handleFieldChange('firstName', event.target.value) }}
                  />
                  <GroupStyled.InputArea
                    small
                    placeholder="www.twitter.com"
                    value={this.state.lastName}
                    onChange={event => { this.handleFieldChange('lastName', event.target.value) }}
                  />
                  <GroupStyled.InputArea
                    small
                    placeholder="www.instagram.com"
                    value={this.state.lastName}
                    onChange={event => { this.handleFieldChange('lastName', event.target.value) }}
                  />
                  <GroupStyled.InputArea
                    small
                    placeholder="www.youtube.com"
                    value={this.state.lastName}
                    onChange={event => { this.handleFieldChange('lastName', event.target.value) }}
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
              <GroupStyled.SubHeading>Private information</GroupStyled.SubHeading>
              <GroupStyled.SubHeadingDescription>
                This information is private to you and will not be shared publicly.
              </GroupStyled.SubHeadingDescription>
            </GroupStyled.HeadingWrapper>
            <GroupStyled.InputWrapper>
              <GroupStyled.Label>Contact Name</GroupStyled.Label>
              <GroupStyled.WrapsInput>
                <GroupStyled.InputArea
                  small
                  placeholder="First name"
                  value={this.state.firstName}
                  onChange={event => { this.handleFieldChange('firstName', event.target.value) }}
                />
                <GroupStyled.InputArea
                  small
                  placeholder="Last name"
                  value={this.state.lastName}
                  onChange={event => { this.handleFieldChange('lastName', event.target.value) }}
                />
                {/* <GroupStyled.ErrorMsg isError={this.state.errors.bio}>
                  {
                    this.state.errors.bio ? 'Please enter a valid event title' :
                      null
                  }
                </GroupStyled.ErrorMsg> */}
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
                  onChange={event => { this.handleFieldChange('phNo1', event.target.value) }}
                />
                <GroupStyled.PhoneNo
                  small
                  type="tel"
                  maxLength="3"
                  placeholder="***"
                  value={this.state.phNo2}
                  onChange={event => { this.handleFieldChange('phNo2', event.target.value) }}
                />
                <GroupStyled.PhoneNo
                  small
                  lastDigit
                  maxLength="4"
                  placeholder="****"
                  value={this.state.phNo3}
                  onChange={event => { this.handleFieldChange('phNo3', event.target.value) }}
                />
                {/* <GroupStyled.ErrorMsg isError={this.state.errors.bio}>
                  {
                    this.state.errors.bio ? 'Please enter a valid event title' :
                      null
                  }
                </GroupStyled.ErrorMsg> */}
              </GroupStyled.WrapsInput>
            </GroupStyled.InputWrapper>
            <GroupStyled.InputWrapper>
              <GroupStyled.Label>Group Address</GroupStyled.Label>
              <GroupStyled.WrapsInput>
                <GroupStyled.InputArea
                  small
                  placeholder="123 Main stl"
                  value={this.state.address}
                  onChange={event => { this.handleFieldChange('address', event.target.value) }}
                />
                <GroupStyled.InputArea
                  small
                  placeholder="Address 2"
                  value={this.state.address2}
                  onChange={event => { this.handleFieldChange('address2', event.target.value) }}
                />
                <GroupStyled.CityInfo
                  small
                  placeholder="City"
                  value={this.state.city}
                  onChange={event => { this.handleFieldChange('city', event.target.value) }}
                />
                <GroupStyled.AddressDetails
                  small
                  placeholder="State"
                  value={this.state.state}
                  onChange={event => { this.handleFieldChange('state', event.target.value) }}
                />
                <GroupStyled.AddressDetails
                  small
                  placeholder="Zip"
                  type="tel"
                  value={this.state.zip}
                  onChange={event => { this.handleFieldChange('zip', event.target.value) }}
                />
                {/* <GroupStyled.ErrorMsg isError={this.state.errors.bio}>
                  {
                    this.state.errors.bio ? 'Please enter a valid event title' :
                      null
                  }
                </GroupStyled.ErrorMsg> */}
              </GroupStyled.WrapsInput>
            </GroupStyled.InputWrapper>
            <GroupStyled.OptionWrapper>
              <GroupStyled.CheckBoxWrapper>
                <GroupStyled.CheckBoxLabel id="checkbox_container" onClick={() => this.setState({ userConfirmation: !this.state.userConfirmation })}>
                  <span>
                    I am officially affiliated with this group and have the right to create a group account on it's behalf.
                  </span>
                  <GroupStyled.CheckBox
                    id="group-info-validation"
                    type="checkbox"
                    checked={this.state.userConfirmation}
                    onChange={() => {}}
                  />
                  <GroupStyled.Span htmlFor="private_video" id="checkmark" />
                </GroupStyled.CheckBoxLabel>
              </GroupStyled.CheckBoxWrapper>
            </GroupStyled.OptionWrapper>
          </GroupStyled.ContentWrapper>
        </Scrollbars>
        <GroupStyled.ControlWrapper>
          <GroupStyled.ControlButton
            disabled={!this.state.userConfirmation}
            onClick={() => this.submitGroupAccountDetails()}
          >
            Continue
          </GroupStyled.ControlButton>
        </GroupStyled.ControlWrapper>
      </GroupStyled>
    );
  }
}

const mapStateToProps = state => ({
  groupTypes: state.groupTypes.data,
});

const mapDispatchToProps = dispatch => ({
  fetchGroupTypes: () => dispatch(fetchGroupTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupRegistration);
