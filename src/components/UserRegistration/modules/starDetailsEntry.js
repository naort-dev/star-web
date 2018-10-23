import React from 'react';
import validator from 'validator';
import Popup from '../../Popup';
import MultiSelect from '../../MultiSelect';
import { numberToDollarFormatter, numberToCommaFormatter, commaToNumberFormatter } from '../../../utils/dataformatter';
import GroupStyled from '../styled';

export default class StarDetailsEntry extends React.Component {
  state = {
    bio: '',
    charity: '',
    industries: [],
    stageName: '',
    bookingPrice: '',
    bookingLimit: '',
    popUpMessage: null,
    priceCheck: false,
    limitCheck: false,
    selectedCheck: null,
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
    },
    errors: {
      bio: false,
      industries: false,
      bookingPrice: false,
      bookingLimit: false,
    },
  };

  handleFieldChange = (fieldType, fieldValue) => {
    if (fieldType === 'industries') {
      const industriesArray = fieldValue.split(',');
      if (industriesArray.length <= 3) {
        this.setState({ industries: industriesArray, errors: { ...this.state.errors, industries: false } });
      }
    } else if (fieldType === 'bookingPrice' || fieldType === 'bookingLimit') {
      const newFieldValue = fieldValue === '' ? fieldValue : numberToCommaFormatter(commaToNumberFormatter(fieldValue));
      if (validator.matches(numberToCommaFormatter(fieldValue), /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/) || newFieldValue === '') {
        this.setState({
          [fieldType]: newFieldValue,
          errors: { ...this.state.errors, [fieldType]: false },
        }, () => {
          if (fieldType === 'bookingPrice' && this.state.priceCheck) {
            this.setState({ priceCheck: false });
          } else if (fieldType === 'bookingLimit' && this.state.limitCheck) {
            this.setState({ limitCheck: false });
          }
        });
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
    bio = this.state.bio === '';
    industries = this.state.industries.length === 0;
    bookingLimit = !validator.isCurrency(this.state.bookingLimit, { require_symbol: false });
    bookingPrice = !validator.isCurrency(this.state.bookingPrice, { require_symbol: false });
    const priceValid = !this.state.priceCheck && this.state.bookingPrice > 499;
    const limitValid = !this.state.limitCheck && this.state.bookingLimit > 20;
    if (priceValid) {
      this.handleFieldBlur('bookingPrice', this.state.bookingPrice);
    } else if (limitValid) {
      this.handleFieldBlur('bookingLimit', this.state.bookingLimit);
    }
    this.setState({ errors: { ...this.state.errors, industries, bookingLimit, bookingPrice, bio } });
    return !industries && !bookingLimit && !bookingLimit && !bio && !priceValid && !limitValid;
  }

  submitGroupAccountDetails = () => {
    if (this.validateFields()) {
      const celebrityDetails = {
        description: this.state.bio,
        profession: this.state.industries,
        rate: parseInt(commaToNumberFormatter(this.state.bookingPrice)),
        charity: this.state.charity,
        weekly_limits: parseInt(commaToNumberFormatter(this.state.bookingLimit)),
        availability: true,
      };
      const socialLinks = {
        facebook_url: validator.matches(this.state.socialMedia.facebook, /(?:https?:\/\/)(?:www\.)facebook\.com\/[^\/]+/) ? this.state.socialMedia.facebook : '',
        twitter_url: validator.matches(this.state.socialMedia.twitter, /(?:https?:\/\/)(?:www\.)twitter\.com\/[^\/]+/) ? this.state.socialMedia.twitter : '',
        youtube_url: validator.matches(this.state.socialMedia.youtube, /(?:https?:\/\/)(?:www\.)youtube\.com\/[^\/]+/) ? this.state.socialMedia.youtube : '',
        instagram_url: validator.matches(this.state.socialMedia.instagram, /(?:https?:\/\/)(?:www\.)instagram\.com\/[^\/]+/) ? this.state.socialMedia.instagram : '',
      };
      this.props.submitAccountDetails(celebrityDetails, socialLinks);
    }
  };

  handleFieldBlur = (fieldType, fieldValue) => {
    const newFieldValue = commaToNumberFormatter(fieldValue)
    if (fieldType === 'bookingLimit' && !this.state.limitCheck && newFieldValue > 20) {
      this.bookingLimit.blur();
      this.setState({ popUpMessage: `Are you sure you can complete ${numberToCommaFormatter(newFieldValue)} Starsona videos?`, selectedCheck: 'limitCheck' });
    } else if (fieldType === 'bookingPrice' && !this.state.priceCheck && newFieldValue > 499) {
      this.bookingPrice.blur();
      this.setState({ popUpMessage: `Set your booking rate at ${numberToDollarFormatter(newFieldValue)}?`, selectedCheck: 'priceCheck' });
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
              modalView
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
                dataValues={this.props.industryList}
                value={this.state.industries.join(',')}
                handleFieldChange={value => this.handleFieldChange('industries', value)}
              />
              <GroupStyled.ErrorMsg isError={this.state.errors.industries}>
                {this.state.errors.industries
                  ? 'Please choose a maximum of 3 industries.'
                  : 'You can choose a maximum of 3 industries.'}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Booking price</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.CustomPlaceholder>
                $
              </GroupStyled.CustomPlaceholder>
              <GroupStyled.PriceInput
                small
                innerRef={(node) => {this.bookingPrice = node;}}
                type="text"
                placeholder="0"
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
                type="text"
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
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Charity / Group</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.InputArea
                small
                placeholder="Optional"
                value={this.state.charity}
                onChange={(event) => {
                  this.handleFieldChange('charity', event.target.value);
                }}
              />
              <GroupStyled.ErrorMsg isError={this.state.errors.charity}>
                {this.state.errors.charity
                  ? 'Please enter a valid event title'
                  : null}
              </GroupStyled.ErrorMsg>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Social links</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
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
                    <GroupStyled.CustomPlaceholder
                      activePlaceHolder
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, facebook: 'https://www.facebook.com/' });
                        this.facebookRef.focus();
                      }}
                    >
                      www.facebook.com/
                      <GroupStyled.HighlightText>
                        add facebook
                      </GroupStyled.HighlightText>
                    </GroupStyled.CustomPlaceholder>
                  : null
                }
              </GroupStyled.CustomInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
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
                    <GroupStyled.CustomPlaceholder
                      activePlaceHolder
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, twitter: 'https://www.twitter.com/' });
                        this.twitterRef.focus();
                      }}
                    >
                      www.twitter.com/
                      <GroupStyled.HighlightText>
                        add twitter
                      </GroupStyled.HighlightText>
                    </GroupStyled.CustomPlaceholder>
                  : null
                }
              </GroupStyled.CustomInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
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
                    <GroupStyled.CustomPlaceholder
                      activePlaceHolder
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, instagram: 'https://www.instagram.com/' });
                        this.instagramRef.focus();
                      }}
                    >
                      www.instagram.com/
                      <GroupStyled.HighlightText>
                        add instagram
                      </GroupStyled.HighlightText>
                    </GroupStyled.CustomPlaceholder>
                  : null
                }
              </GroupStyled.CustomInput>
              <GroupStyled.CustomInput>
                <GroupStyled.InputArea
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
                    <GroupStyled.CustomPlaceholder
                      activePlaceHolder
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, youtube: 'https://www.youtube.com/' });
                        this.youtubeRef.focus();
                      }}
                    >
                      www.youtube.com/
                      <GroupStyled.HighlightText>
                        add youtube
                      </GroupStyled.HighlightText>
                    </GroupStyled.CustomPlaceholder>
                  : null
                }
              </GroupStyled.CustomInput>
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
