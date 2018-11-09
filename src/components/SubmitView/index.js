import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubmitStyled from './styled';
import StarRating from '../StarRating';
import Popup from '../Popup';
import AlertView from '../AlertView';
import { clearPopupError } from '../../store/shared/actions/popupActions';

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
export default class SubmitView extends React.Component {
  static propTypes = {
    onSubmit: func.isRequired,
    heading: string.isRequired,
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
      alertText: '',
    };
  }

  setReason = (reason) => {
    this.setState({ declineReason: reason, otherReason: false });
  }

  static getDerivedStateFromProps = (props, state) => {
    let { alertText } = state;
    if (props.submitStatus) {
      props.clearPopupError();
      alertText = props.successMessage;
    }
    return { alertText };
  }

  closePopup = () => {
    this.props.closePopup();
  }

  sendReason = () => {
    if (this.props.heading !== 'Rate video' || this.state.rating) {
      this.props.onSubmit(this.state);
    }
  }

  render() {
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
            <div>
              <SubmitStyled.Header>{this.props.heading}</SubmitStyled.Header>
              <SubmitStyled.RatingTextArea
                placeholder={this.props.heading === 'Rate video' ? 'Comment' : ''}
                onChange={event => this.setState({ comment: event.target.value })}
              />
              {this.props.heading === 'Rate video' && <StarRating onClick={rating => this.setState({ rating })} center />}
              <SubmitStyled.ErrorWrapper>
                {this.props.error && <SubmitStyled.ErrorMsg>{this.props.error}</SubmitStyled.ErrorMsg>}
              </SubmitStyled.ErrorWrapper>
              <SubmitStyled.ConfirmButtonWrapper>
                <SubmitStyled.ConfirmButton
                  onClick={this.sendReason}
                  disabled={(!this.state.rating && this.props.heading === 'Rate video') || (this.props.heading !== 'Rate video' && !this.state.comment)}
                >
                  Submit
                </SubmitStyled.ConfirmButton>
              </SubmitStyled.ConfirmButtonWrapper>
            </div>
        }
      </SubmitStyled>
    );
  }
}
