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
import fetchEphemeralKey from '../../services/generateEmphemeralKey';

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

  sourceUpdated = (source) => () => {
    this.props.handleBooking(source);
  };

  getEphemeralKey = (source) => {
    fetchEphemeralKey()
      .then((resp) => {
        if (resp.success) {
          const customerId =
            resp.data.ephemeralKey.associated_objects &&
            resp.data.ephemeralKey.associated_objects[0]
              ? resp.data.ephemeralKey.associated_objects[0].id
              : null;
          this.props.modifySourceList(
            source.source.id,
            customerId,
            true,
            this.sourceUpdated(source),
          );
        }
      })
      .catch((error) => {
        this.props.loaderAction(false);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.stripe) {
      this.props.loaderAction(true);
      this.props.stripe
        .createSource({
          type: 'card',
        })
        .then((res) => {
          this.getEphemeralKey(res);
        })
        .catch(() => {
          this.props.loaderAction(false);
        });
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
          <Button className="button">Pay ${this.props.rate}</Button>
        </FlexCenter>
      </form>
    );
  }
}

export default injectStripe(checkout);
