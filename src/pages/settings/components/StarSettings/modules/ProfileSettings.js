import React from 'react';
import validator from 'validator';
import Popup from '../../../../../components/Popup';
import RequestFlowPopup from './../../../../../components/RequestFlowPopup';
import { IndustrySelection } from './../../../../../components/IndustrySelection';
import { numberToDollarFormatter, numberToCommaFormatter, commaToNumberFormatter, iosPriceFinder } from '../../../../../utils/dataformatter';
import SettingsStyled from '../../../styled';

export default class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentWillMount() {
    this.setInitialData(this.props);
  }

  setInitialData = (props) => {
    let facebook;
    let twitter;
    let instagram;
    let youtube;
    props.userDetails.social_links.forEach((link) => {
      let handle;
      if (link.social_link_key === 'facebook_url') {
        handle = link.social_link_value === '' ? undefined : link.social_link_value.split('https://www.facebook.com/')[1];
        facebook = handle;
      } else if (link.social_link_key === 'twitter_url') {
        handle = link.social_link_value === '' ? undefined : link.social_link_value.split('https://www.twitter.com/')[1];
        twitter = handle;
      } else if (link.social_link_key === 'youtube_url') {
        handle = link.social_link_value === '' ? undefined : link.social_link_value.split('https://www.youtube.com/')[1];
        youtube = handle;
      } else if (link.social_link_key === 'instagram_url') {
        handle = link.social_link_value === '' ? undefined : link.social_link_value.split('https://www.instagram.com/')[1];
        instagram = handle;
      }
    });
    this.setState({
      industries: props.celebDetails.profession_details ? props.celebDetails.profession_details : [],
      industrySelection: false,
      socialMedia: { facebook, twitter, youtube, instagram },
      bio: props.celebDetails.description ? props.celebDetails.description : '',
      stageName: props.userDetails.nick_name ? props.userDetails.nick_name : '',
      bookingPrice: props.celebDetails.rate ? numberToCommaFormatter(props.celebDetails.rate) : '',
      iosPrice: props.celebDetails.in_app_price ? props.celebDetails.in_app_price : null,
      bookingLimit: props.celebDetails.weekly_limits ? numberToCommaFormatter(props.celebDetails.weekly_limits) : '',
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
      cancelDetails: false,
    });
    props.checkStripe();
  }

  getStripe = () => {
    this.props.fetchUrl()
      .then((response) => {
        window.location = response.data.data.stripe_url;
      });
  }

  getDashboard = () => {
    if (this.props.stripeRegistration.dashboardURL) {
      window.open(this.props.stripeRegistration.dashboardURL, '_blank');
    }
  }

  getIndustrySelection = (industries) => {
    if (industries.length !== this.state.industries.length) {
      this.props.recordChange(true);
    } else {
      const industryLength = industries.length > this.state.industries.length ? industries.length : this.state.industries.length;
      for (let key = 0; key < industryLength; key++) {
        if (this.state.industries[key].id !== industries[key].id) {
          this.props.recordChange(true);
          break;
        }
      }
    }
    this.setState({ industries, industrySelection: false, errors: { ...this.state.errors, industries: false } });
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
    this.props.recordChange(true);
    if (fieldType === 'industries') {
      const industriesArray = fieldValue.split(',');
      if (industriesArray.length <= 3) {
        this.setState({ industries: industriesArray, errors: { ...this.state.errors, industries: false } });
      }
    } else if (fieldType === 'bookingPrice' || fieldType === 'bookingLimit') {
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
    bio = this.state.bio === '';
    industries = this.state.industries.length === 0 || this.state.industries[0] === '' ;
    bookingLimit = !validator.isCurrency(this.state.bookingLimit, { require_symbol: false });
    bookingPrice = !validator.isCurrency(this.state.bookingPrice, { require_symbol: false });
    const priceValid = !this.state.priceCheck && parseFloat(this.state.bookingPrice.replace(/,/g, '')) > 499;
    const limitValid = !this.state.limitCheck && parseFloat(this.state.bookingLimit.replace(/,/g, '')) > 20;
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

  submitProfileDetails = () => {
    if (this.validateFields()) {
      const professions = this.state.industries.map(profession => profession.id.toString());
      const celebrityDetails = {
        description: this.state.bio,
        profession: professions,
        rate: parseInt(commaToNumberFormatter(this.state.bookingPrice)),
        in_app_price: this.state.iosPrice,
        weekly_limits: parseInt(commaToNumberFormatter(this.state.bookingLimit)),
        availability: true,
      };
      const userDetails = {
        nick_name: this.state.stageName && this.state.stageName.trim(''),
        show_nick_name: this.state.stageName && this.state.stageName.trim('') ? true : false,
      };
      const socialLinks = {
        facebook_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)facebook\.com\/[^\/]+/, this.state.socialMedia.facebook, 'https://www.facebook.com/'),
        twitter_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)twitter\.com\/[^\/]+/, this.state.socialMedia.twitter, 'https://www.twitter.com/'),
        youtube_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)youtube\.com\/[^\/]+/, this.state.socialMedia.youtube, 'https://www.youtube.com/'),
        instagram_url: this.getSocialUrl(/(?:https?:\/\/)(?:www\.)instagram\.com\/[^\/]+/, this.state.socialMedia.instagram, 'https://www.instagram.com/'),
      };
      this.props.recordChange(false);
      this.props.submitProfileDetails(celebrityDetails, userDetails, socialLinks);
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

  cancelDetails = () => {
    this.setInitialData(this.props);
    this.props.recordChange(false);
    this.props.fetchUserDetails();
  }

  closeIndustrySelection = () => {
    this.setState({ industrySelection: false });
  }

  removeSelectedIndustry = (id, event) => {
    event.stopPropagation();
    let { industries } = this.state;
    industries = industries.filter(profession => profession.id !== id);
    this.setState({ industries });
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

  renderIndustries = () => {
    const { industries } = this.state;
    return industries.map(profession => (
      <SettingsStyled.mutiSelectItemWrapper key={profession.id}>
        {profession.title}
        <SettingsStyled.OptionCloseButton
          onClick={event => this.removeSelectedIndustry(profession.id, event)}
        />
      </SettingsStyled.mutiSelectItemWrapper>
    ));
  };

  render() {
    return (
      <React.Fragment>
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
        {
          this.state.industrySelection &&
            <RequestFlowPopup
              dotsCount={0}
              closePopUp={this.closeIndustrySelection}
              modalView
              smallPopup
            >
              <SettingsStyled.IndustrySelectionWrapper>
                <IndustrySelection
                  onClose={() => this.setState({ industrySelection: false })}
                  selectedProfessions={this.state.industries}
                  onSelectionComplete={this.getIndustrySelection}
                  limit={3}
                />
              </SettingsStyled.IndustrySelectionWrapper>
            </RequestFlowPopup>
        }
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
                  onBlur={event => this.validateOnBlur('bio', event.target.value)}
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
                  ? 'Please enter a bio'
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
              <SettingsStyled.IndustryInput
                tabIndex="0"
                onBlur={() => this.validateOnBlur('industries')}
                onClick={() => this.setState({ industrySelection: true })}
              >
                {
                  !this.state.industries.length ?
                    <SettingsStyled.CustomPlaceholder>
                      Select ...
                    </SettingsStyled.CustomPlaceholder>
                  :
                    <SettingsStyled.IndustryEditButton>
                      Edit
                    </SettingsStyled.IndustryEditButton>
                }
                {
                  this.renderIndustries()
                }
              </SettingsStyled.IndustryInput>
              <SettingsStyled.ErrorMsg isError={this.state.errors.industries}>
                {this.state.errors.industries
                  ? 'Please choose a maximum of 3 industries.'
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
                  <SettingsStyled.ErrorMsg isError={this.state.errors.bookingPrice}>
                    Please enter a valid booking price
                  </SettingsStyled.ErrorMsg>
              }
              {
                !this.state.errors.bookingPrice &&
                  <React.Fragment>
                    {
                      this.state.iosPrice === null ?
                        <SettingsStyled.ErrorMsg>
                          Please tell your fans that they will not be able to book you using the iOS app because Apple does not support purchases over $999.99.
                          They will still be able to book you using their browser (mobile or desktop) or the Android app.
                        </SettingsStyled.ErrorMsg>
                      :
                        <SettingsStyled.ErrorMsg>
                          {
                            this.state.iosPrice !== 0 &&
                              <React.Fragment>
                                Converted Apple price: <strong>{this.state.iosPrice !== null && '$'}{this.state.iosPrice === null ? 'N/A' : this.state.iosPrice}</strong>.&nbsp;
                              </React.Fragment>
                          }
                          In the iOS app, we will convert your price to the nearest supported Apple price (for example, $25 will be $24.99 in the iOS app).
                        </SettingsStyled.ErrorMsg>
                    }
                  </React.Fragment>
              }
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Booking limit</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.NumberInput
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
              <SettingsStyled.ErrorMsg isError={this.state.errors.bookingLimit}>
                {this.state.errors.bookingLimit
                  ? 'Please enter a valid booking limit'
                  : 'What is the maximum number of open bookings you want to offer at any given time?'}
              </SettingsStyled.ErrorMsg>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Social links</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.SocialCustomInput tabIndex="0" >
                <SettingsStyled.CustomPlaceholder>www.facebook.com/</SettingsStyled.CustomPlaceholder>
                {
                  this.state.socialMedia.facebook === undefined ?
                    <SettingsStyled.HighlightText
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, facebook: '' });
                      }}
                    >
                      add facebook
                    </SettingsStyled.HighlightText>
                  :
                    <SettingsStyled.InputArea
                      autoFocus
                      small
                      value={this.state.socialMedia.facebook}
                      innerRef={(node) => { this.facebookRef = node; }}
                      onBlur={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, facebook: event.target.value === '' ? undefined : event.target.value },
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
              </SettingsStyled.SocialCustomInput>
              <SettingsStyled.SocialCustomInput tabIndex="0" >
                <SettingsStyled.CustomPlaceholder>www.twitter.com/</SettingsStyled.CustomPlaceholder>
                {
                  this.state.socialMedia.twitter === undefined ?
                    <SettingsStyled.HighlightText
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, twitter: '' });
                      }}
                    >
                      add twitter
                    </SettingsStyled.HighlightText>
                  :
                    <SettingsStyled.InputArea
                      autoFocus
                      small
                      value={this.state.socialMedia.twitter}
                      innerRef={(node) => { this.twitterRef = node; }}
                      onBlur={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, twitter: event.target.value === '' ? undefined : event.target.value },
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
              </SettingsStyled.SocialCustomInput>
              <SettingsStyled.SocialCustomInput tabIndex="0" >
                <SettingsStyled.CustomPlaceholder>www.instagram.com/</SettingsStyled.CustomPlaceholder>
                {
                  this.state.socialMedia.instagram === undefined ?
                    <SettingsStyled.HighlightText
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, instagram: '' });
                      }}
                    >
                      add instagram
                    </SettingsStyled.HighlightText>
                  :
                    <SettingsStyled.InputArea
                      autoFocus
                      small
                      value={this.state.socialMedia.instagram}
                      innerRef={(node) => { this.instagramRef = node; }}
                      onBlur={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, instagram: event.target.value === '' ? undefined : event.target.value },
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
              </SettingsStyled.SocialCustomInput>
              <SettingsStyled.SocialCustomInput tabIndex="0" >
                <SettingsStyled.CustomPlaceholder>www.youtube.com/</SettingsStyled.CustomPlaceholder>
                {
                  this.state.socialMedia.youtube === undefined ?
                    <SettingsStyled.HighlightText
                      onClick={() => {
                        this.handleFieldChange('socialMedia', { ...this.state.socialMedia, youtube: '' });
                      }}
                    >
                      add youtube
                    </SettingsStyled.HighlightText>
                  :
                    <SettingsStyled.InputArea
                      autoFocus
                      small
                      value={this.state.socialMedia.youtube}
                      innerRef={(node) => { this.youtubeRef = node; }}
                      onBlur={(event) => {
                        this.handleFieldChange(
                          'socialMedia',
                          { ...this.state.socialMedia, youtube: event.target.value === '' ? undefined : event.target.value },
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
              </SettingsStyled.SocialCustomInput>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
        </SettingsStyled.InputwrapperDiv>
        <SettingsStyled.HeadingWrapper>
          <SettingsStyled.SubHeading>
            Private information
          </SettingsStyled.SubHeading>
          <SettingsStyled.SubHeadingDescription>
            This information is private and will not be shared
            publicly
          </SettingsStyled.SubHeadingDescription>
        </SettingsStyled.HeadingWrapper>
        <SettingsStyled.InputwrapperDiv>
          <SettingsStyled.InputWrapper>
            <SettingsStyled.Label>Payments</SettingsStyled.Label>
            <SettingsStyled.WrapsInput>
              <SettingsStyled.CustomInput>
                {this.props.stripeRegistration.cardDetails ?
                  <SettingsStyled.ActionText onClick={this.getDashboard}>{this.props.stripeRegistration.cardDetails}</SettingsStyled.ActionText>
                  :
                  <SettingsStyled.HollowButton onClick={this.getStripe}>Set up your Stripe account</SettingsStyled.HollowButton>
                }
              </SettingsStyled.CustomInput>
              <SettingsStyled.ErrorMsg>
                Payouts for your earnings will be distributed the first week of every month.
              </SettingsStyled.ErrorMsg>
            </SettingsStyled.WrapsInput>
          </SettingsStyled.InputWrapper>
        </SettingsStyled.InputwrapperDiv>
        <SettingsStyled.ControlWrapper multiple>
          <SettingsStyled.CancelButton
            onClick={this.cancelDetails}
          >
            Cancel
          </SettingsStyled.CancelButton>
          <SettingsStyled.ControlButton
            onClick={() => this.submitProfileDetails()}
          >
            Save
          </SettingsStyled.ControlButton>
        </SettingsStyled.ControlWrapper>
      </React.Fragment>
    );
  }
}
