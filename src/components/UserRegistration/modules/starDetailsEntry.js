import React from 'react';
import validator from 'validator';
import MultiSelect from '../../MultiSelect';
import { fetch } from '../../../services/fetch';
import GroupStyled from '../styled';

export default class StarDetailsEntry extends React.Component {
  state = {
    bio: '',
    industryList: [],
    industries: [],
    stageName: '',
    bookingPrice: '',
    bookingLimit: '',
    errors: {
      bio: false,
      industries: false,
      bookingPrice: false,
      bookingLimit: false,
    },
  };

  componentWillMount() {
    fetch('user/professions/').then((response) => {
      let dropDownList = [];
      response.data.data.professions.map((profObj) => {
        dropDownList.push({ value: profObj.id, label: profObj.title });
        profObj.child.map((childObj) => {
          dropDownList.push({ value: childObj.id, label: childObj.title });
        });
      });
      return dropDownList;
    })
      .then(industryItem => this.setState({ industryList: industryItem }))
  }

  handleFieldChange = (fieldType, fieldValue) => {
    if (fieldType === 'industries') {
      const industriesArray = fieldValue.split(',');
      if (industriesArray.length <= 3) {
        this.setState({ industries: industriesArray, errors: { ...this.state.errors, industries: false } });
      }
    } else {
      this.setState({
        [fieldType]: fieldValue,
        errors: { ...this.state.errors, [fieldType]: false },
      });
    }
  };

  validateFields = () => {
    let { bio, industries, bookingLimit, bookingPrice } = this.state.errors;
    if (this.state.bio === '') {
      bio = true;
    }
    if (this.state.industries.length < 3) {
      industries = true;
    } else {
      industries = false;
    }
    if (!validator.isNumeric(this.state.bookingLimit, { no_symbols: true })) {
      bookingLimit = true;
    } else {
      bookingLimit = false;
    }
    if (!validator.isNumeric(this.state.bookingPrice, { no_symbols: true })) {
      bookingPrice = true;
    } else {
      bookingPrice = false;
    }
    this.setState({ errors: { ...this.state.errors, industries, bookingLimit, bookingPrice, bio } });
    return !industries && !bookingLimit && !bookingLimit && !bio;
  }

  submitGroupAccountDetails = () => {
    if (this.validateFields()) {
      const celebrityDetails = {
        description: this.state.bio,
        profession: this.state.industries,
        rate: parseInt(this.state.bookingPrice),
        weekly_limits: parseInt(this.state.bookingLimit),
        availabilty: true,
        check_payments: false,
      };
      this.props.submitAccountDetails(celebrityDetails);
    }
  };

  renderMultiValueItems = (selectProps) => {
    return (
      <GroupStyled.mutiSelectItemWrapper>
        {selectProps.value.label}
        <GroupStyled.OptionCloseButton
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
            <GroupStyled.Label>Your bio</GroupStyled.Label>
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
                      Have fun with it... no need to be serious.
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
            <GroupStyled.Label>Stage Name</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.InputArea
                small
                placeholder="Optional"
                value={this.state.stageName}
                onChange={(event) => {
                  this.handleFieldChange('stageName', event.target.value);
                }}
              />
              <GroupStyled.ErrorMsg isError={this.state.errors.stageName}>
                {this.state.errors.stageName
                  ? 'Please enter a valid event title'
                  : null}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Your industry</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <MultiSelect
                otherOptions={{
                  clearable: false,
                  arrowRenderer: null,
                  valueComponent: selectProps => this.renderMultiValueItems(selectProps),
                }}
                dataValues={this.state.industryList}
                value={this.state.industries.join(',')}
                handleFieldChange={value => this.handleFieldChange('industries', value)}
              />
              <GroupStyled.ErrorMsg isError={this.state.errors.industries}>
                {this.state.errors.industries
                  ? 'Please enter a valid event title'
                  : 'You can choose a maximum of 3 industries.'}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Booking Price</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.InputArea
                small
                type="number"
                placeholder="$0"
                value={this.state.bookingPrice}
                onChange={(event) => {
                  this.handleFieldChange('bookingPrice', event.target.value);
                }}
              />
              <GroupStyled.ErrorMsg isError={this.state.errors.bookingPrice}>
                {this.state.errors.bookingPrice
                  ? 'Please enter a valid booking price'
                  : 'Our pricing engines will automatically maximize your earnings based on demand.'}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Booking Limit</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.InputArea
                small
                type="number"
                placeholder="0"
                value={this.state.bookingLimit}
                onChange={(event) => {
                  this.handleFieldChange('bookingLimit', event.target.value);
                }}
              />
              <GroupStyled.ErrorMsg isError={this.state.errors.bookingLimit}>
                {this.state.errors.bookingLimit
                  ? 'Please enter a valid booking limit'
                  : 'What is the maximum number of open bookings you want to offer at any given time?'}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
        </GroupStyled.InputwrapperDiv>
        <GroupStyled.ControlWrapper>
          <GroupStyled.ControlButton
            onClick={() => this.submitGroupAccountDetails()}
          >
            Continue
          </GroupStyled.ControlButton>
        </GroupStyled.ControlWrapper>
      </GroupStyled.DetailsWrapper>
    );
  }
}
