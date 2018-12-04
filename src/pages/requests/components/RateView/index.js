import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubmitStyled from './styled';
import StarRating from '../../../../components/StarRating';
import Popup from '../../../../components/Popup';
import AlertView from '../../../../components/AlertView';
import { clearPopupError } from '../../../../store/shared/actions/popupActions';

const { func, bool, string } = PropTypes;

@connect(
  state => ({
    error: state.popupData.error,
    submitStatus: state.popupData.submitStatus,
  }),
  {
    clearPopupError,
  },
)
export default class RateView extends React.Component {
  static propTypes = {
    onSubmit: func.isRequired,
    successMessage: string.isRequired,
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
    this.state = {
      rating: 0,
      comment: '',
      reason: '',
      alertText: '',
    };
    this.reasonsList = [
      'Poor quality',
      'Mispronounced names',
      'Abusive behavior',
      'Too short of a video',
      'Language',
      'Other',
    ];
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

  closePopup = () => {
    this.props.closePopup();
  }

  sendReason = () => {
    this.props.onSubmit(this.state);
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
    const { orderDetails } = this.props;
    const { booking_title: bookingTitle, celebrity } = orderDetails;
    return (
      <SubmitStyled>
        {
          this.state.alertText !== '' ?
            <Popup
              smallPopup
              closePopUp={this.closePopup}
            >
              <AlertView
                message={this.state.alertText}
                closePopup={this.closePopup}
              />
            </Popup>
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
              </SubmitStyled.RatingWrapper>
              {
                this.state.rating !== 0 && this.state.rating <= 2 &&
                  <SubmitStyled.ReasonsWrapper>
                    <SubmitStyled.SubHeading>What went wrong?</SubmitStyled.SubHeading>
                    <SubmitStyled.ReasonsList>
                      {
                        this.reasonsList.map(reason => (
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
                this.state.rating !== 0 && this.state.rating > 2 &&
                  <SubmitStyled.ReasonsWrapper>
                    <SubmitStyled.SubHeading>Want to give an additional tip?</SubmitStyled.SubHeading>
                    <SubmitStyled.ReasonsList>
                      <SubmitStyled.ReasonItem tip>5$</SubmitStyled.ReasonItem>
                      <SubmitStyled.ReasonItem tip>5$</SubmitStyled.ReasonItem>
                      <SubmitStyled.ReasonItem tip>5$</SubmitStyled.ReasonItem>
                    </SubmitStyled.ReasonsList>
                  </SubmitStyled.ReasonsWrapper>
              }
              <SubmitStyled.RatingTextArea
                placeholder={this.state.rating > 2 ? `Add a thank you note to ${celebrity}` : 'Add a comment'}
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
