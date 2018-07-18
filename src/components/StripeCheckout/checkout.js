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
    this.state = {
      cardNumberError: '',
      cardExpiryError: '',
      cvvError: '',
      zipCodeError: '',
    };
    this.styles = {
      base: {
        fontSize: '13px',
        color: '#333333',
        fontFamily: 'Ubuntu-Regular',
        '::placeholder': {
          color: '#333333',
        },
      },
      invalid: {
        color: 'red',
      },
    };
  }
  componentWillMount() {
    this.props.setStripe(this.props.stripe);
  }
  setErrorMsg = (event, element) => {
    const errorMsg = event.error ? event.error.message : '';
    this.setState({ [element]: errorMsg });
  }
  returnErrorMsg = (element) => {
    if (this.state[element] !== '') {
      return <PaymentStyled.ErrorElement>{this.state[element]}</PaymentStyled.ErrorElement>;
    }
    return null;
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleBooking();
  }

  render() {
    return (
      <PaymentStyled onSubmit={this.handleSubmit}>
        <PaymentStyled.CardElementWrapper>
          <PaymentStyled.title>Card Number</PaymentStyled.title>
          <CardNumberElement
            onChange={event => this.setErrorMsg(event, 'cardNumberError')}
            style={this.styles}
          />
          { this.returnErrorMsg('cardNumberError') }
        </PaymentStyled.CardElementWrapper>
        <PaymentStyled.OtherDetailsWrapper>
          <PaymentStyled.CardElementWrapper>
            <PaymentStyled.title>Valid till</PaymentStyled.title>
            <CardExpiryElement
              onChange={event => this.setErrorMsg(event, 'cardExpiryError')}
              style={this.styles}
            />
            { this.returnErrorMsg('cardExpiryError') }
          </PaymentStyled.CardElementWrapper>
          <PaymentStyled.CardElementWrapper>
            <PaymentStyled.title>CVV</PaymentStyled.title>
            <CardCVCElement
              onChange={event => this.setErrorMsg(event, 'cvvError')}
              style={this.styles}
            />
            { this.returnErrorMsg('cvvError') }
          </PaymentStyled.CardElementWrapper>
          <PaymentStyled.CardElementWrapper>
            <PaymentStyled.title>Zip code</PaymentStyled.title>
            <PostalCodeElement
              onChange={event => this.setErrorMsg(event, 'zipCodeError')}
              style={this.styles}
            />
            { this.returnErrorMsg('zipCodeError') }
          </PaymentStyled.CardElementWrapper>
        </PaymentStyled.OtherDetailsWrapper>
      </PaymentStyled>
    );
  }
}

export default injectStripe(checkout);
