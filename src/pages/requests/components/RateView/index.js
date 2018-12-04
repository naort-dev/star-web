import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubmitStyled from './styled';
import StarRating from '../../../../components/StarRating';
import Popup from '../../../../components/Popup';
import AlertView from '../../../../components/AlertView';
import Loader from '../../../../components/Loader';
import { requestFeedback } from '../../../../services/requestFeedback';
import { clearPopupError } from '../../../../store/shared/actions/popupActions';

const { func, bool, string } = PropTypes;

@connect(
  state => ({
    error: state.popupData.error,
    submitStatus: state.popupData.submitStatus,
    requestFeedback: state.config.data.requestFeedback,
    tipAmounts: state.config.data.tipAmounts,
    tipType: state.config.data.tip_fixed_or_percentage,
  }),
  {
    clearPopupError,
  },
)
export default class RateView extends React.Component {
  static propTypes = {
    onSuccess: func.isRequired,
    error: string,
    submitStatus: bool,
  };

  static defaultProps = {
    error: '',
    submitStatus: false,
  }

  constructor(props) {
    super(props);
    this.props.clearPopupError();
    let tipsList = props.tipAmounts;
    const { orderDetails } = props;
    const { amount } = orderDetails.order_details;
    if (this.props.tipType !== 'fixed') {
      tipsList = tipsList.map((tip) => {
        const newTip = Math.round((tip * amount) / 100) !== 0 ? Math.round((tip * amount) / 100) : 1;
        return newTip;
      });
    }
    this.state = {
      rating: 0,
      comment: '',
      reason: '',
      alertText: '',
      tip: 0,
      loading: false,
      enableCustomTip: false,
      tipsList,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    let { alertText } = state;
    if (props.submitStatus) {
      props.clearPopupError();
      alertText = props.successMessage;
    }
    return { alertText };
  }

  setReason = (newReason) => {
    const reason = newReason === this.state.reason ? '' : newReason;
    this.setState({ reason });
  }

  setTip = (newTip) => {
    const tip = newTip === this.state.tip ? '' : newTip;
    this.setState({ tip, enableCustomTip: false });
  }

  toggleCustomTip = () => {
    this.setState({ enableCustomTip: !this.state.enableCustomTip });
  }

  updateTipsList = (event) => {
    const { tipsList } = this.state;
    if (event.keyCode === 13 && tipsList.indexOf(event.target.value) < 0) {
      this.setState({
        tipsList: [
          ...tipsList,
          event.target.value,
        ],
        tip: event.target.value,
        enableCustomTip: false,
      });
    }
  }

  closePopup = () => {
    this.props.closePopup();
  }

  sendReason = () => {
    const { orderDetails } = this.props;
    const { tip, rating, comment, reason } = this.state;
    this.setState({ loading: true });
    requestFeedback([], orderDetails.id, comment, reason, rating)
      .then((success) => {
        this.setState({ alertText: 'Your rating has been recorded!', loading: false });
        this.props.onSuccess();
      });
  }

  renderRatingText = () => {
    switch (this.state.rating) {
      case 1: return 'Bad';
      case 2: return 'Disappointing';
      case 3: return 'Good';
      case 4: return 'Pretty amazing!';
      case 5: return 'Mind blowing!!!';
      default: return 'Your rating';
    }
  }

  render() {
    const { orderDetails, requestFeedback } = this.props;
    const { booking_title: bookingTitle, celebrity } = orderDetails;
    return (
      <SubmitStyled>
        {
          this.state.alertText !== '' &&
            <Popup
              smallPopup
              closePopUp={this.closePopup}
            >
              <AlertView
                message={this.state.alertText}
                closePopup={this.closePopup}
              />
            </Popup>
        }
        {
          this.state.loading ?
            <Loader />
          :
            <React.Fragment>
              <SubmitStyled.Header>Rate your video</SubmitStyled.Header>
              <SubmitStyled.ProfileImage
                imageUrl={orderDetails.avatar_photo && orderDetails.avatar_photo.thumbnail_url}
              />
              <SubmitStyled.ProfileName>{ celebrity }</SubmitStyled.ProfileName>
              <SubmitStyled.ProfileDetail>{ bookingTitle }</SubmitStyled.ProfileDetail>
              <SubmitStyled.RatingWrapper>
                <SubmitStyled.RatingHeading>{this.renderRatingText()}</SubmitStyled.RatingHeading>
                <StarRating big onClick={rating => this.setState({ rating })} center />
                {
                  this.state.rating > 2 &&
                    <SubmitStyled.SubText>Add a reaction video or photo</SubmitStyled.SubText>
                }
              </SubmitStyled.RatingWrapper>
              {
                this.state.rating !== 0 && this.state.rating <= 2 &&
                  <SubmitStyled.ReasonsWrapper>
                    <SubmitStyled.SubHeading>What went wrong?</SubmitStyled.SubHeading>
                    <SubmitStyled.ReasonsList>
                      {
                        requestFeedback.map(reason => (
                          <SubmitStyled.ReasonItem
                            selected={this.state.reason === reason}
                            onClick={() => this.setReason(reason)}
                            key={reason}
                          >
                            {reason}
                          </SubmitStyled.ReasonItem>
                        ))
                      }
                    </SubmitStyled.ReasonsList>
                  </SubmitStyled.ReasonsWrapper>
              }
              {
                this.state.rating > 2 &&
                  <SubmitStyled.ReasonsWrapper>
                    <SubmitStyled.SubHeading>Want to give an additional tip?</SubmitStyled.SubHeading>
                    <SubmitStyled.TipsList>
                      {
                        this.state.tipsList.map(tip => (
                          <SubmitStyled.TipItem
                            key={tip}
                            selected={this.state.tip === tip}
                            onClick={() => this.setTip(tip)}
                          >
                            {tip}$
                          </SubmitStyled.TipItem>
                        ))
                      }
                    </SubmitStyled.TipsList>
                    {
                      this.state.enableCustomTip ?
                        <SubmitStyled.CustomInput
                          type="number"
                          autoFocus
                          onKeyDown={this.updateTipsList}
                        />
                      : <SubmitStyled.ColorText onClick={this.toggleCustomTip}>Enter custom amount</SubmitStyled.ColorText>
                    }
                  </SubmitStyled.ReasonsWrapper>
              }
              <SubmitStyled.RatingTextArea
                placeholder={this.state.rating > 2 ? `Add a thank you note to ${celebrity}` : 'Add a comment'}
                value={this.state.comment}
                onChange={event => this.setState({ comment: event.target.value })}
              />
              <SubmitStyled.ErrorWrapper>
                {this.props.error && <SubmitStyled.ErrorMsg>{this.props.error}</SubmitStyled.ErrorMsg>}
              </SubmitStyled.ErrorWrapper>
              <SubmitStyled.ConfirmButtonWrapper>
                <SubmitStyled.ConfirmButton
                  onClick={this.sendReason}
                  disabled={(!this.state.rating && this.props.heading === 'Rate video')}
                >
                  Submit
                </SubmitStyled.ConfirmButton>
              </SubmitStyled.ConfirmButtonWrapper>
            </React.Fragment>
        }
      </SubmitStyled>
    );
  }
}
