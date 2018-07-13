import React from 'react';
import { Elements } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Checkout from './checkout';
import Popup from '../Popup';
import Loader from '../Loader';
import { createCharge, resetPaymentDetails } from '../../store/shared/actions/processPayments';
import { PaymentFooterController } from '../PaymentFooterController';
import PaymentStyled from './styled';
import fetchEphemeralKey from '../../services/generateEmphemeralKey';

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ephemeralKey: '',
      stripe: null,
    };
  }
  componentWillMount() {
    this.getEphemeralKey();
  }
  componentDidUpdate(prevProps) {
    if (this.props.paymentStatus) {
      this.props.resetPaymentDetails();
    }
  }
  componentWillUnmount() {
    this.props.resetPaymentDetails();
  }
  getEphemeralKey = () => {
    fetchEphemeralKey(this.props.authToken)
      .then((resp) => {
        this.setState({ ephemeralKey: resp.ephemeralKey });
      });
  }
  setStripe = (stripe) => {
    this.setState({ stripe });
  }
  handleBooking = () => {
    console.log(this.state.stripe)
    if (this.state.stripe) {
      this.state.stripe
        .createSource({
          type: 'card',
        })
        .then(payload => this.chargeCreator(payload.source.id));
    }
  }
  chargeCreator = (tokenId) => {
    this.props.createCharge(this.props.requestDetails.id, this.props.rate, tokenId);
  }

  orderConfirmation = () => {
    if (this.props.paymentStatus) {
      return <Popup>asdasd</Popup>;
    }
  }
  render() {
    const type = this.state.ephemeralKey.associated_objects && this.state.ephemeralKey.associated_objects[0] ? this.state.ephemeralKey.associated_objects[0].type : null;
    const id = this.state.ephemeralKey.associated_objects && this.state.ephemeralKey.associated_objects[0] ? this.state.ephemeralKey.associated_objects[0].id : null;
    return (
      <PaymentStyled.wrapper>
        {
          this.props.loading ?
            <PaymentStyled.loaderWrapper>
              <Loader />
            </PaymentStyled.loaderWrapper>
          : null
        }
        <PaymentStyled.Heading>Review your Purchase</PaymentStyled.Heading>
        <PaymentStyled.StarDetailsWrapper>
          <PaymentStyled.StarNameWrapper>
            <PaymentStyled.SubTitle>
              Starsona booking for
            </PaymentStyled.SubTitle>
            {this.props.fullName}
          </PaymentStyled.StarNameWrapper>
          <PaymentStyled.StarPhoto src={this.props.profilePhoto} />
        </PaymentStyled.StarDetailsWrapper>
        <Elements>
          <Checkout
            type={type}
            id={id}
            handleBooking={this.handleBooking}
            chargeCreator={this.chargeCreator}
            setStripe={this.setStripe}
          />
        </Elements>
        <PaymentStyled.PaymentController>
          <PaymentFooterController
            rate={this.props.rate}
            remainingBookings={this.props.remainingBookings}
            buttonName="Pay"
            handleBooking={this.handleBooking}
          />
        </PaymentStyled.PaymentController>
        {
          this.orderConfirmation()
        }
      </PaymentStyled.wrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.paymentDetails.loading,
  requestDetails: state.paymentDetails.requestDetails,
  paymentStatus: state.paymentDetails.paymentStatus,
});

const mapDispatchToProps = dispatch => ({
  createCharge: (starsonaId, amount, tokenId) => dispatch((createCharge(starsonaId, amount, tokenId))),
  resetPaymentDetails: () => dispatch(resetPaymentDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckout);
