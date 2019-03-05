import React from 'react';
import validator from 'validator';
import Popup from '../../Popup';
import { GroupSelection, IndustrySelection } from '../../IndustrySelection';
import { numberToDollarFormatter, numberToCommaFormatter, commaToNumberFormatter, iosPriceFinder } from '../../../utils/dataformatter';
import GroupStyled from '../styled';

export default class StarDetailsEntry extends React.Component {
  state = {
    bio: '',
    charity: '',
    industries: [],
    groups: [],
    stageName: '',
    bookingPrice: '',
    iosPrice: 0,
    bookingLimit: '',
    popUpMessage: null,
    priceCheck: false,
    limitCheck: false,
    selectedCheck: null,
    industrySelection: false,
    groupSelection: false,
    socialMedia: {
      facebook: undefined,
      twitter: undefined,
      instagram: undefined,
      youtube: undefined,
    },
    errors: {
      bio: false,
      industries: false,
      bookingPrice: false,
      bookingLimit: false,
    },
  };

  getIndustrySelection = (industries) => {
    this.setState({ industries, industrySelection: false, errors: { ...this.state.errors, industries: false } });
  }

  getGroupSelection = (groups) => {
    this.setState({ groups, groupSelection: false }, () => {
      this.groupSelectionInput.focus();
    });
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
    if (fieldType === 'bookingPrice' || fieldType === 'bookingLimit') {
      const newFieldValue = fieldValue === '' ? fieldValue : numberToCommaFormatter(commaToNumberFormatter(fieldValue));
      if ((validator.matches(numberToCommaFormatter(fieldValue), /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/) || newFieldValue === '')
        && newFieldValue !== '0'
      ) {
        this.setState({
          [fieldType]: newFieldValue,
          errors: { ...this.state.errors, [fieldType]: false },
        }, () => {
          if (fieldType === 'bookingPrice') {
            const { bookingPrice } = this.state;
            const actualPrice = parseInt(commaToNumberFormatter(bookingPrice))
            if (actualPrice <= 1000) {
              this.setState({ iosPrice: iosPriceFinder(actualPrice, this.props.inAppPriceList) });
            } else if (!actualPrice) {
              this.setState({ iosPrice: 0 });
            } else {
              this.setState({ iosPrice: null });
            }
          }
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
    industries = this.state.industries.length === 0 || this.state.industries[0] === '' ;
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
    return !industries && !bookingLimit && !bookingPrice && !bio && !priceValid && !limitValid;
  }

  validateOnBlur = (key, value) => {
    const { errors, industries } = this.state;
    if (key === 'bio') {
      errors[key] = value === '';
    } else if (key === 'industries') {
      errors[key] = industries.length < 3 || industries[0] === '';
    } else if (key === 'bookingLimit') {
      errors[key] = !validator.isCurrency(value, { require_symbol: false });
      this.handleFieldBlur('bookingLimit', value);
    } else if (key === 'bookingPrice') {
      errors[key] = !validator.isCurrency(value, { require_symbol: false });
      this.handleFieldBlur('bookingPrice', value);
    }
    this.setState({ errors });
  }

  submitGroupAccountDetails = (event) => {
    event.preventDefault();
    if (this.validateFields()) {
      const celebrityDetails = {
        description: this.state.bio,
        profession: this.state.industries,
        rate: parseInt(commaToNumberFormatter(this.state.bookingPrice)),
        in_app_price: this.state.iosPrice,
        charity: this.state.charity,
        weekly_limits: parseInt(commaToNumberFormatter(this.state.bookingLimit)),
        availability: true,
      };
      const userDetails = {
        nick_name: this.state.stageName && this.state.stageName.trim(''),
        show_nick_name: this.state.stageName && this.state.stageName.trim('') ? true : false,
      };
      const groupIds = this.state.groups.map(group => group.group_id).join(',');
      const socialLinks = {
        facebook_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)facebook\.com\/[^\/]+/, this.state.socialMedia.facebook, 'https://www.facebook.com/'),
        twitter_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)twitter\.com\/[^\/]+/, this.state.socialMedia.twitter, 'https://www.twitter.com/'),
        youtube_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)youtube\.com\/[^\/]+/, this.state.socialMedia.youtube, 'https://www.youtube.com/'),
        instagram_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)instagram\.com\/[^\/]+/, this.state.socialMedia.instagram, 'https://www.instagram.com/'),
      };
      this.props.submitAccountDetails(celebrityDetails, userDetails, socialLinks, groupIds);
    }
  };

  removeSelectedIndustry = (id, event) => {
    event.stopPropagation();
    let { industries } = this.state;
    industries = industries.filter(profession => profession.id !== id);
    this.setState({ industries });
  }

  removeSelectedGroup = (id, event) => {
    event.stopPropagation();
    let { groups } = this.state;
    groups = groups.filter(group => group.group_id !== id);
    this.setState({ groups });
  }

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

  closePopup = () => {
    this.setState({ popUpMessage: null, [this.state.selectedCheck]: true, selectedCheck: null })
  }
  
  closeSelection = type => () => {
    if (type === 'industries') {
      this.setState({ industrySelection: false });
    } else if (type === 'groups') {
      this.setState({ groupSelection: false }, () => {
        this.groupSelectionInput.focus();
      });
    }
  }

  renderGroups = () => {
    const { groups } = this.state;
    return groups.map(group => (
      <GroupStyled.mutiSelectItemWrapper key={group.group_id}>
        {group.account_name}
        <GroupStyled.OptionCloseButton
          onClick={event => this.removeSelectedGroup(group.group_id, event)}
        />
      </GroupStyled.mutiSelectItemWrapper>
    ));
  }

  renderIndustries = () => {
    const { industries } = this.state;
    return industries.map(profession => (
      <GroupStyled.mutiSelectItemWrapper key={profession.id}>
        {profession.title}
        <GroupStyled.OptionCloseButton
          onClick={event => this.removeSelectedIndustry(profession.id, event)}
        />
      </GroupStyled.mutiSelectItemWrapper>
    ));
  };

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

  render() {
    if (this.state.industrySelection) {
      return (
        <IndustrySelection
          onClose={this.closeSelection('industries')}
          selectedProfessions={this.state.industries}
          onSelectionComplete={this.getIndustrySelection}
          limit={3}
        />
      );
    } else if (this.state.groupSelection) {
      return (
        <GroupSelection
          onClose={this.closeSelection('groups')}
          selectedProfessions={this.state.groups}
          onSelectionComplete={this.getGroupSelection}
        />
      );
    }
    return (
      <GroupStyled.DetailsWrapper>
        {
          this.state.popUpMessage &&
            <Popup
              modalView
              smallPopup
              closePopUp={this.closePopup}
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
                  onBlur={event => this.validateOnBlur('bio', event.target.value)}
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
                  ? 'Please enter a bio'
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
              <GroupStyled.IndustryInput
                tabIndex="0"
                onBlur={() => this.validateOnBlur('industries')}
                onClick={() => this.setState({ industrySelection: true })}
              >
                {
                  !this.state.industries.length ?
                    <GroupStyled.CustomPlaceholder>
                      Select ...
                    </GroupStyled.CustomPlaceholder>
                  :
                    <GroupStyled.IndustryEditButton>
                      Edit
                    </GroupStyled.IndustryEditButton>
                }
                {
                  this.renderIndustries()
                }
              </GroupStyled.IndustryInput>
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
                onBlur={event => this.validateOnBlur('bookingPrice', event.target.value)}
                onChange={(event) => {
                  this.handleFieldChange('bookingPrice', event.target.value);
                }}
              />
              {
                this.state.errors.bookingPrice &&
                  <GroupStyled.ErrorMsg isError={this.state.errors.bookingPrice}>
                    Please enter a valid booking price
                  </GroupStyled.ErrorMsg>
              }
              {
                !this.state.errors.bookingPrice &&
                  <React.Fragment>
                    {
                      this.state.iosPrice === null ?
                        <GroupStyled.ErrorMsg>
                          Please tell your fans that they will not be able to book you using the iOS app because Apple does not support purchases over $999.99.
                          They will still be able to book you using their browser (mobile or desktop) or the Android app.
                        </GroupStyled.ErrorMsg>
                      :
                        <GroupStyled.ErrorMsg>
                          {
                            this.state.iosPrice !== 0 &&
                              <React.Fragment>
                                Converted Apple price: <strong>{this.state.iosPrice !== null && '$'}{this.state.iosPrice === null ? 'N/A' : this.state.iosPrice}</strong>.&nbsp;
                              </React.Fragment>
                          }
                          In the iOS app, we will convert your price to the nearest supported Apple price (for example, $25 will be $24.99 in the iOS app).
                        </GroupStyled.ErrorMsg>
                    }
                  </React.Fragment>
              }
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
                onBlur={event => this.validateOnBlur('bookingLimit', event.target.value)}
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
              <GroupStyled.IndustryInput
                tabIndex="0"
                innerRef={(node) => { this.groupSelectionInput = node; }}
                onClick={() => this.setState({ groupSelection: true })}
              >
                {
                  !this.state.groups.length ?
                    <GroupStyled.CustomPlaceholder>
                      Optional ...
                    </GroupStyled.CustomPlaceholder>
                  :
                    <GroupStyled.IndustryEditButton>
                      Edit
                    </GroupStyled.IndustryEditButton>
                }
                {
                  this.renderGroups()
                }
              </GroupStyled.IndustryInput>
            </GroupStyled.WrapsInput>
          </GroupStyled.InputWrapper>
          <GroupStyled.InputWrapper>
            <GroupStyled.Label>Social links</GroupStyled.Label>
            <GroupStyled.WrapsInput>
              <GroupStyled.SocialCustomInput tabIndex="0" >
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
              <GroupStyled.SocialCustomInput tabIndex="0" >
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
              <GroupStyled.SocialCustomInput tabIndex="0" >
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
              <GroupStyled.SocialCustomInput tabIndex="0" >
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
        <GroupStyled.ControlWrapper multiple>
          <GroupStyled.CancelButton onClick={this.props.closeSignupFlow}>
            Cancel
          </GroupStyled.CancelButton>
          <GroupStyled.ControlButton
            onClick={this.submitGroupAccountDetails}
          >
            Continue
          </GroupStyled.ControlButton>
        </GroupStyled.ControlWrapper>
      </GroupStyled.DetailsWrapper>
    );
  }
}
