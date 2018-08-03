import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderStyled from './styled';
import StarRating from '../StarRating';
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
export default class SubmitPopup extends React.Component {
  static propTypes = {
    onSubmit: func.isRequired,
    heading: string.isRequired,
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
    };
  }

  setReason = (reason) => {
    this.setState({ declineReason: reason, otherReason: false });
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.submitStatus) {
      if (props.heading === 'Rate video') props.onRatingSuccess();
      props.clearPopupError();
      props.closePopup();
    }
    return null;
  }

  sendReason = () => {
    if (this.props.heading !== 'Rate video' || this.state.rating) {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    return (
      <OrderStyled.PopupWrapper>
        <OrderStyled.PopupHeader>{this.props.heading}</OrderStyled.PopupHeader>
        <OrderStyled.RatingTextArea
          placeholder={this.props.heading === 'Rate video' ? 'Comment' : ''}
          onChange={event => this.setState({ comment: event.target.value })}
        />
        {this.props.heading === 'Rate video' && <StarRating onClick={rating => this.setState({ rating })} />}
        <OrderStyled.ErrorWrapper>
          {this.props.error && <OrderStyled.ErrorMsg>{this.props.error}</OrderStyled.ErrorMsg>}
        </OrderStyled.ErrorWrapper>
        <OrderStyled.ConfirmButtonWrapper>
          <OrderStyled.ConfirmButton
            onClick={this.sendReason}
            disabled={!this.state.rating && this.props.heading === 'Rate video' || this.props.heading !== 'Rate video' && !this.state.comment}
          >
            Submit
          </OrderStyled.ConfirmButton>
        </OrderStyled.ConfirmButtonWrapper>
      </OrderStyled.PopupWrapper>
    );
  }
}
