import React from 'react';
import { Elements } from 'react-stripe-elements';
import Checkout from './checkout';
import fetchEphemeralKey from '../../services/generateEmphemeralKey';
import { PaymentFooterController } from '../PaymentFooterController';
import PaymentStyled from './styled';


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

export default StripeCheckout;
