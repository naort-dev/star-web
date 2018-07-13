import React from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from 'react-stripe-elements';
<<<<<<< HEAD
=======
import { PaymentFooterController } from '../PaymentFooterController';
>>>>>>> 802a7698d2d2c0f407b996485619be3013faf21a
import PaymentStyled from './styled';

class checkout extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      base: {
        fontSize: '12px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    if (this.props.stripe) {
      this.props.stripe
        .createSource({
          type: 'card',
        })
        .then(payload => this.props.chargeCreator(payload.source.id));
=======
    if (this.props.stripe && this.props.ephemeralKey.id) {
      this.props.stripe
        .createSource({
          type: 'customer',
          customer: this.props.ephemeralKey.id,
          owner: {
            name: 'hi',
          },
        })
        .then((payload) => console.log('[token]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
>>>>>>> 802a7698d2d2c0f407b996485619be3013faf21a
    }
  }

  render() {
    return (
      <PaymentStyled onSubmit={this.handleSubmit}>
        <PaymentStyled.CardElementWrapper>
          <PaymentStyled.title>Card Number</PaymentStyled.title>
          <CardNumberElement
            style={this.styles}
          />
        </PaymentStyled.CardElementWrapper>
        <PaymentStyled.OtherDetailsWrapper>
          <PaymentStyled.CardElementWrapper>
            <PaymentStyled.title>Valid till</PaymentStyled.title>
            <CardExpiryElement
              style={this.styles}
            />
          </PaymentStyled.CardElementWrapper>
          <PaymentStyled.CardElementWrapper>
            <PaymentStyled.title>CVV</PaymentStyled.title>
            <CardCVCElement
              style={this.styles}
            />
          </PaymentStyled.CardElementWrapper>
          <PaymentStyled.CardElementWrapper>
            <PaymentStyled.title>Zip code</PaymentStyled.title>
            <PostalCodeElement
              style={this.styles}
            />
          </PaymentStyled.CardElementWrapper>
        </PaymentStyled.OtherDetailsWrapper>
<<<<<<< HEAD
=======
        <PaymentStyled.PaymentController>
          <PaymentFooterController
            // rate={rate}
            // remainingBookings={remainingBookings}
            buttonName="Pay"
            handleBooking={this.handleBooking}
          />
        </PaymentStyled.PaymentController>
>>>>>>> 802a7698d2d2c0f407b996485619be3013faf21a
      </PaymentStyled>
    );
  }
}

export default injectStripe(checkout);
