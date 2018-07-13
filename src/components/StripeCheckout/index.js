import React from 'react';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import Checkout from './checkout';
import fetchEphemeralKey from '../../services/generateEphemeralKey';
import { createCharge } from '../../store/shared/actions/processPayments';
import { PaymentFooterController } from '../PaymentFooterController';
import PaymentStyled from './styled';
import fetchEphemeralKey from '../../services/generateEmphemeralKey';

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ephemeralKey: '',
    };
  }
  componentWillMount() {
    this.getEphemeralKey();
  }
  getEphemeralKey = () => {
    fetchEphemeralKey(this.props.authToken)
      .then((resp) => {
        this.setState({ ephemeralKey: resp.ephemeralKey });
      });
  }
  chargeCreator = (tokenId) => {
    this.props.createCharge(this.props.requestDetails.id, this.props.rate, tokenId);
  }
  render() {
    const type = this.state.ephemeralKey.associated_objects && this.state.ephemeralKey.associated_objects[0] ? this.state.ephemeralKey.associated_objects[0].type : null;
    const id = this.state.ephemeralKey.associated_objects && this.state.ephemeralKey.associated_objects[0] ? this.state.ephemeralKey.associated_objects[0].id : null;
    return (
      <PaymentStyled.wrapper>
        <PaymentStyled.Heading>Review your Purchase</PaymentStyled.Heading>
        <Elements>
          <Checkout
            type={type}
            id={id}
            chargeCreator={this.chargeCreator}
          />
        </Elements>
        <PaymentStyled.PaymentController>
          <PaymentFooterController
            // rate={rate}
            // remainingBookings={remainingBookings}
            buttonName="Pay"
            handleBooking={this.handleBooking}
          />
        </PaymentStyled.PaymentController>
      </PaymentStyled.wrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.paymentDetails.loading,
  requestDetails: state.paymentDetails.requestDetails,
});

const mapDispatchToProps = dispatch => ({
  createCharge: (starsonaId, amount, tokenId) => dispatch((createCharge(starsonaId, amount, tokenId))),
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckout);
