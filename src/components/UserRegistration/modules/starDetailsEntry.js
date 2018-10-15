import React from 'react';
import validator from 'validator';
import Popup from '../../Popup';
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
    popUpMessage: null,
    priceCheck: false,
    limitCheck: false,
    selectedCheck: null,
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
      }, () => {
        if (fieldType === "bookingLimit" && this.state.priceCheck) {
          this.setState({ priceCheck: false });
        } else if (fieldType === "bookingLimit" && this.state.limitCheck) {
          this.setState({ limitCheck: false });
        }
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
        availability: true,
      };
      this.props.submitAccountDetails(celebrityDetails);
    }
  };

  handleFieldBlur = (fieldType, fieldValue) => {
    if (fieldType === 'bookingLimit' && !this.state.limitCheck && fieldValue > 20) {
      this.bookingLimit.blur();
      this.setState({ popUpMessage: `Are you sure you can complete ${fieldValue} Starsona videos?`, selectedCheck: 'limitCheck' });
    } else if (fieldType === 'bookingPrice' && !this.state.priceCheck && fieldValue > 499) {
      this.bookingPrice.blur();
      this.setState({ popUpMessage: `Set your booking rate at ${fieldValue}?`, selectedCheck: 'priceCheck' });
    }
  }

  renderPopup = () => {
    return (
      <React.Fragment>
        {this.state.popUpMessage}
        <GroupStyled.PopupButtonWrapper>
          <GroupStyled.ActionButton onClick={() => this.setState({ popUpMessage: null, [this.state.selectedCheck]: true, selectedCheck: null })}>Yes</GroupStyled.ActionButton>
          <GroupStyled.ActionButton onClick={() => this.setState({ popUpMessage: null, [this.state.selectedCheck]: false, selectedCheck: null })}>No</GroupStyled.ActionButton>
        </GroupStyled.PopupButtonWrapper>
      </React.Fragment>
    );
  }

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
        {
          this.state.popUpMessage &&
            <Popup
              smallPopup
              closePopUp={() => this.setState({ popUpMessage: null, [this.state.selectedCheck]: true, selectedCheck: null })}
            >
              {
                this.renderPopup()
              }
            </Popup>
        }
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
            <GroupStyled.Label>Stage name</GroupStyled.Label>
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
                  ? 'Please enter a valid industry'
                  : 'You can choose a maximum of 3 industries.'}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Booking price</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.NumberInput
                small
                innerRef={(node) => {this.bookingPrice = node;}}
                type="number"
                placeholder="$0"
                value={this.state.bookingPrice}
                onBlur={event => this.handleFieldBlur('bookingPrice', event.target.value)}
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
            <GroupStyled.Label>Booking limit</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.NumberInput
                small
                innerRef={(node) => {this.bookingLimit = node;}}
                type="number"
                placeholder="0"
                value={this.state.bookingLimit}
                onBlur={event => this.handleFieldBlur('bookingLimit', event.target.value)}
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
