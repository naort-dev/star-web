import React from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';
import PaymentStyled from './styled';

class checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumberError: '',
      cardExpiryError: '',
      cvvError: '',
      // zipCodeError: '',
      cardTypeImage: null,
    };
    this.styles = {
      base: {
        fontSize: '13px',
        color: '#333333',
        fontFamily: '"Avenir-Regular"',
        '::placeholder': {
          color: '#333333',
        },
      },
      invalid: {
        color: 'red',
      },
    };
  }
  // componentWillMount() {
  //   this.props.setStripe(this.props.stripe);
  // }
  setErrorMsg = (event, element) => {
    let { cardTypeImage } = this.state;
    if (event.elementType === 'cardNumber') {
      cardTypeImage =
        event.brand && event.brand !== 'unknown'
          ? `assets/images/card-icons/${event.brand}.png`
          : null;
    }
    const errorMsg = event.error ? event.error.message : '';
    this.setState({ [element]: errorMsg, cardTypeImage });
  };
  returnErrorMsg = (element) => {
    if (this.state[element] !== '') {
      return (
        <PaymentStyled.ErrorElement>
          {this.state[element]}
        </PaymentStyled.ErrorElement>
      );
    }
    return null;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleBooking();
  };

  render() {
    return (
      <PaymentStyled onSubmit={this.handleSubmit}>
        <PaymentStyled.CardElementWrapper>
          <PaymentStyled.CardInputWrapper>
            <PaymentStyled.CardTypeIcon cardImage={this.state.cardTypeImage} />
            <CardNumberElement
              onChange={(event) => this.setErrorMsg(event, 'cardNumberError')}
              style={this.styles}
              placeholder="1234 1234 1234 1234"
            />
          </PaymentStyled.CardInputWrapper>
          {this.returnErrorMsg('cardNumberError')}
        </PaymentStyled.CardElementWrapper>
        <PaymentStyled.OtherDetailsWrapper>
          <PaymentStyled.CardElementWrapper>
            <CardExpiryElement
              onChange={(event) => this.setErrorMsg(event, 'cardExpiryError')}
              style={this.styles}
              placeholder="MM/YY"
            />
            {this.returnErrorMsg('cardExpiryError')}
          </PaymentStyled.CardElementWrapper>
          <PaymentStyled.CardElementWrapper>
            <CardCVCElement
              onChange={(event) => this.setErrorMsg(event, 'cvvError')}
              style={this.styles}
              placeholder="CCV Code"
            />
            {this.returnErrorMsg('cvvError')}
          </PaymentStyled.CardElementWrapper>
        </PaymentStyled.OtherDetailsWrapper>
      </PaymentStyled>
    );
  }
}

export default injectStripe(checkout);
