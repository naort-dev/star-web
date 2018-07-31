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
      cardTypeImage: null,
    };
    this.styles = {
      base: {
        fontSize: '13px',
        color: '#333333',
        fontFamily: '"Ubuntu-Regular"',
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
    const cardTypeImage = event.brand && event.brand !== 'unknown' ? `assets/images/card-icons/${event.brand}.png` : null;
    const errorMsg = event.error ? event.error.message : '';
    this.setState({ [element]: errorMsg, cardTypeImage });
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
          <PaymentStyled.CardInputWrapper>
            <PaymentStyled.CardTypeIcon cardImage={this.state.cardTypeImage} />
            <CardNumberElement
              onChange={event => this.setErrorMsg(event, 'cardNumberError')}
              style={this.styles}
            />
          </PaymentStyled.CardInputWrapper>
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
            <PaymentStyled.title>CVC</PaymentStyled.title>
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
