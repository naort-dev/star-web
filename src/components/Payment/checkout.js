import React from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';
import {
  CardElement,
  CardIcon,
  Error,
  Wrapper,
  CardElementSmall,
  FlexBox,
} from './Checkout.styles';

class checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumberError: '',
      cardExpiryError: '',
      cvvError: '',
      cardTypeImage: null,
    };
    this.styles = {
      base: {
        fontSize: '18px',
        color: '#aaaaaa',
        textAlign: 'center',
        fontFamily: '"Gilroy-Regular"',
        '::placeholder': {
          color: '#aaaaaa',
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
      return <Error>{this.state[element]}</Error>;
    }
    return null;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleBooking();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement>
          <Wrapper>
            <CardIcon cardImage={this.state.cardTypeImage} />
            <CardNumberElement
              onChange={(event) => this.setErrorMsg(event, 'cardNumberError')}
              style={this.styles}
              placeholder="1234 1234 1234 1234"
            />
          </Wrapper>
          {this.returnErrorMsg('cardNumberError')}
        </CardElement>

        <FlexBox>
          <CardElementSmall>
            <CardExpiryElement
              onChange={(event) => this.setErrorMsg(event, 'cardExpiryError')}
              style={this.styles}
              placeholder="MM/YY"
            />
            {this.returnErrorMsg('cardExpiryError')}
          </CardElementSmall>
          <CardElementSmall>
            <CardCVCElement
              onChange={(event) => this.setErrorMsg(event, 'cvvError')}
              style={this.styles}
              placeholder="CCV Code"
            />
            {this.returnErrorMsg('cvvError')}
          </CardElementSmall>
        </FlexBox>
      </form>
    );
  }
}

export default injectStripe(checkout);
