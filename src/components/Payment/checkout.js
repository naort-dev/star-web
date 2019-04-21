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
import { FlexCenter } from '../../styles/CommonStyled';
import Button from '../PrimaryButton';

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
        fontFamily: 'Gilroy',
        '::placeholder': {
          color: '#aaaaaa',
        },
      },
      invalid: {
        color: 'red',
      },
    };
  }

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
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((res) => {
          this.props.handleBooking(res);
        })
        .catch();
    }
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
        <FlexCenter>
          <Button className="button">Pay $50.00</Button>
        </FlexCenter>
      </form>
    );
  }
}

export default injectStripe(checkout);
