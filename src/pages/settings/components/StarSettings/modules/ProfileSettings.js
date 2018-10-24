import React from 'react';
import validator from 'validator';
import Popup from '../../../../../components/Popup';
import MultiSelect from './../../../../../components/MultiSelect';
import SettingsStyled from '../../../styled';

export default class ProfileSettings extends React.Component {
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
    } else {
      this.setState({
        [fieldType]: fieldValue,
        errors: { ...this.state.errors, [fieldType]: false },
      }, () => {
        if (fieldType === 'bookingPrice' && this.state.priceCheck) {
          this.setState({ priceCheck: false });
        } else if (fieldType === 'bookingLimit' && this.state.limitCheck) {
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
        charity: this.state.charity,
        weekly_limits: parseInt(this.state.bookingLimit),
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
        <SettingsStyled.PopupButtonWrapper>
          <SettingsStyled.ActionButton onClick={() => this.setState({ popUpMessage: null, [this.state.selectedCheck]: true, selectedCheck: null })}>Yes</SettingsStyled.ActionButton>
          <SettingsStyled.ActionButton onClick={() => this.setState({ popUpMessage: null, [this.state.selectedCheck]: false, selectedCheck: null })}>No</SettingsStyled.ActionButton>
        </SettingsStyled.PopupButtonWrapper>
      </React.Fragment>
    );
  }

  renderMultiValueItems = (selectProps) => {
    return (
      <SettingsStyled.mutiSelectItemWrapper>
        {selectProps.value.label}
        <SettingsStyled.OptionCloseButton
          type="button"
          onClick={() => selectProps.onRemove(selectProps.value)}
        />
      </SettingsStyled.mutiSelectItemWrapper>
    );
  };

  render() {
    return (
      <React.Fragment>
        {/* {
          this.state.popUpMessage &&
            <Popup
              smallPopup
              closePopUp={() => this.setState({ popUpMessage: null, [this.state.selectedCheck]: true, selectedCheck: null })}
            >
              {
                this.renderPopup()
              }
            </Popup>
        } */}
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
                      Have fun with it... no need to be serious.
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
            <SettingsStyled.Label>Stage name</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.InputArea
                small
                placeholder="Optional"
                value={this.state.stageName}
                onChange={(event) => {
                  this.handleFieldChange('stageName', event.target.value);
                }}
              />
              <SettingsStyled.ErrorMsg isError={this.state.errors.stageName}>
                {this.state.errors.stageName
                  ? 'Please enter a valid event title'
                  : null}
              </SettingsStyled.ErrorMsg>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Your industry</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
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
              <SettingsStyled.ErrorMsg isError={this.state.errors.industries}>
                {this.state.errors.industries
                  ? 'Please enter a valid industry'
                  : 'You can choose a maximum of 3 industries.'}
              </SettingsStyled.ErrorMsg>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Booking price</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomPlaceholder>
                $
              </SettingsStyled.CustomPlaceholder>
              <SettingsStyled.PriceInput
                small
                innerRef={(node) => {this.bookingPrice = node;}}
                type="number"
                placeholder="0"
                value={this.state.bookingPrice}
                onBlur={event => this.handleFieldBlur('bookingPrice', event.target.value)}
                onChange={(event) => {
                  this.handleFieldChange('bookingPrice', event.target.value);
                }}
              />
              <SettingsStyled.ErrorMsg isError={this.state.errors.bookingPrice}>
                {this.state.errors.bookingPrice
                  ? 'Please enter a valid booking price'
                  : 'Our pricing engines will automatically maximize your earnings based on demand.'}
              </SettingsStyled.ErrorMsg>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Booking limit</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.NumberInput
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
              <SettingsStyled.ErrorMsg isError={this.state.errors.bookingLimit}>
                {this.state.errors.bookingLimit
                  ? 'Please enter a valid booking limit'
                  : 'What is the maximum number of open bookings you want to offer at any given time?'}
              </SettingsStyled.ErrorMsg>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Charity / Group</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.InputArea
                small
                placeholder="Optional"
                value={this.state.charity}
                onChange={(event) => {
                  this.handleFieldChange('charity', event.target.value);
                }}
              />
              <SettingsStyled.ErrorMsg isError={this.state.errors.charity}>
                {this.state.errors.charity
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
      </React.Fragment>
    );
  }
}
