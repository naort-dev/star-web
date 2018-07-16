import React from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from 'react-stripe-elements';
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
  componentWillMount() {
    this.props.setStripe(this.props.stripe);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    this.props.handleBooking();
  }

  render() {
    return (
      <PaymentStyled onSubmit={this.handleSubmit}>
        <PaymentStyled.CardElementWrapper>
          <PaymentStyled.title>Card Number</PaymentStyled.title>
          <CardNumberElement
            onChange={(event) =>  console.log(event)}
            style={this.styles}
          />
        </PaymentStyled.CardElementWrapper>
        <PaymentStyled.OtherDetailsWrapper>
          <PaymentStyled.CardElementWrapper>
            <PaymentStyled.title>Valid till</PaymentStyled.title>
            <CardExpiryElement
              onChange={(event) =>  console.log(event)}
              style={this.styles}
            />
          </PaymentStyled.CardElementWrapper>
          <PaymentStyled.CardElementWrapper>
            <PaymentStyled.title>CVV</PaymentStyled.title>
            <CardCVCElement
              onChange={(event) =>  console.log(event)}
              style={this.styles}
            />
          </PaymentStyled.CardElementWrapper>
          <PaymentStyled.CardElementWrapper>
            <PaymentStyled.title>Zip code</PaymentStyled.title>
            <PostalCodeElement
              onChange={(event) =>  console.log(event)}
              style={this.styles}
            />
          </PaymentStyled.CardElementWrapper>
        </PaymentStyled.OtherDetailsWrapper>
      </PaymentStyled>
    );
  }
}

export default injectStripe(checkout);
