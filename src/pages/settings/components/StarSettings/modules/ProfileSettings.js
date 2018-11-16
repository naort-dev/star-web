import React from 'react';
import validator from 'validator';
import Popup from '../../../../../components/Popup';
import RequestFlowPopup from './../../../../../components/RequestFlowPopup';
import { IndustrySelection } from './../../../../../components/IndustrySelection';
import { numberToDollarFormatter, numberToCommaFormatter, commaToNumberFormatter } from '../../../../../utils/dataformatter';
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

  componentWillReceiveProps(nextProps) {
    if (this.state.cancelDetails) {
      this.setInitialData(nextProps);
    }
  }

  setInitialData = (props) => {
    let facebook;
    let twitter;
    let instagram;
    let youtube;
    props.userDetails.social_links.forEach((link) => {
      if (link.social_link_key === 'facebook_url') {
        facebook = link.social_link_value;
      } else if (link.social_link_key === 'twitter_url') {
        twitter = link.social_link_value;
      } else if (link.social_link_key === 'youtube_url') {
        youtube = link.social_link_value;
      } else if (link.social_link_key === 'instagram_url') {
        instagram = link.social_link_value;
      }
    });
    this.setState({
      industries: props.celebDetails.profession_details ? props.celebDetails.profession_details : [],
      industrySelection: false,
      socialMedia: { facebook, twitter, youtube, instagram },
      bio: props.celebDetails.description ? props.celebDetails.description : '',
      stageName: props.userDetails.nick_name ? props.userDetails.nick_name : '',
      bookingPrice: props.celebDetails.rate ? numberToCommaFormatter(props.celebDetails.rate) : '',
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

  getStripe() {
    this.props.fetchUrl()
      .then((response) => {
        window.location = response.data.data.stripe_url;
      });
  }

  getDashboard() {
    if (this.props.stripeRegistration.dashboardURL) {
      window.open(this.props.stripeRegistration.dashboardURL, '_blank');
    }
  }

  getIndustrySelection = (industries) => {
    this.setState({ industries, industrySelection: false, errors: { ...this.state.errors, industries: false } });
  }

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

  submitProfileDetails = () => {
    if (this.validateFields()) {
      const professions = this.state.industries.map(profession => profession.id.toString());
      const celebrityDetails = {
        description: this.state.bio,
        profession: professions,
        rate: parseInt(this.state.bookingPrice),
        weekly_limits: parseInt(this.state.bookingLimit),
        availability: true,
      };
      const userDetails = {
        nick_name: this.state.stageName,
      };
      const socialLinks = {
        facebook_url: this.state.socialMedia.facebook && validator.matches(this.state.socialMedia.facebook, /(?:https?:\/\/)(?:www\.)facebook\.com\/[^\/]+/) ? this.state.socialMedia.facebook : '',
        twitter_url: this.state.socialMedia.twitter && validator.matches(this.state.socialMedia.twitter, /(?:https?:\/\/)(?:www\.)twitter\.com\/[^\/]+/) ? this.state.socialMedia.twitter : '',
        youtube_url: this.state.socialMedia.youtube && validator.matches(this.state.socialMedia.youtube, /(?:https?:\/\/)(?:www\.)youtube\.com\/[^\/]+/) ? this.state.socialMedia.youtube : '',
        instagram_url: this.state.socialMedia.instagram && validator.matches(this.state.socialMedia.instagram, /(?:https?:\/\/)(?:www\.)instagram\.com\/[^\/]+/) ? this.state.socialMedia.instagram : '',
      };
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
    this.setState({ cancelDetails: true });
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
              <SettingsStyled.IndustryInput
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
                type="text"
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
                type="text"
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
                  !this.state.socialMedia.facebook || this.state.socialMedia.facebook === '' ?
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
                  !this.state.socialMedia.twitter || this.state.socialMedia.twitter === '' ?
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
                  !this.state.socialMedia.instagram || this.state.socialMedia.instagram === '' ?
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
                  !this.state.socialMedia.youtube || this.state.socialMedia.youtube === '' ?
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
                  <SettingsStyled.ActionText onClick={() => this.getDashboard()}>{this.props.stripeRegistration.cardDetails}</SettingsStyled.ActionText>
                  :
                  <SettingsStyled.HollowButton onClick={() => this.getStripe()}>Set up your Stripe account</SettingsStyled.HollowButton>
                }
              </SettingsStyled.CustomInput>
              <SettingsStyled.ErrorMsg>
                Payouts for your earnings will be distributed on
                the first of every month
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